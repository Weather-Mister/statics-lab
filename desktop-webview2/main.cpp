#define NOMINMAX
#include <windows.h>
#include <shellapi.h>
#include <shlobj.h>
#include <wrl.h>
#include <WebView2.h>

#include <algorithm>
#include <filesystem>
#include <fstream>
#include <string>

#include "resource.h"

using Microsoft::WRL::Callback;
using Microsoft::WRL::ComPtr;

namespace {
constexpr wchar_t kWindowClass[] = L"StaticsCalculatorWebView2Window";
constexpr wchar_t kWindowTitle[] = L"Statics Calculator";
constexpr int kHotkeyId = 1;
constexpr UINT WM_APP_SHOW = WM_APP + 10;
constexpr UINT WM_APP_DRAG = WM_APP + 11;
constexpr UINT WM_APP_HIDE = WM_APP + 12;
constexpr UINT WM_TRAY = WM_APP + 20;
constexpr UINT IDM_OPEN = 1001;
constexpr UINT IDM_HIDE = 1002;
constexpr UINT IDM_QUIT = 1003;

HWND g_hwnd = nullptr;
HINSTANCE g_instance = nullptr;
HANDLE g_mutex = nullptr;
NOTIFYICONDATAW g_tray{};
ComPtr<ICoreWebView2Environment> g_environment;
ComPtr<ICoreWebView2Controller> g_controller;
ComPtr<ICoreWebView2> g_webview;
std::filesystem::path g_assetDir;
bool g_quitting = false;
int g_lastContentHeightDip = 0;

int DipToPx(int dip) {
    const UINT dpi = g_hwnd ? GetDpiForWindow(g_hwnd) : 96;
    return MulDiv(dip, static_cast<int>(dpi), 96);
}

int PxToDip(int px) {
    const UINT dpi = g_hwnd ? GetDpiForWindow(g_hwnd) : 96;
    return MulDiv(px, 96, static_cast<int>(dpi));
}

std::filesystem::path LocalAppRoot() {
    PWSTR raw = nullptr;
    if (FAILED(SHGetKnownFolderPath(FOLDERID_LocalAppData, KF_FLAG_CREATE, nullptr, &raw)) || !raw) {
        return std::filesystem::temp_directory_path() / L"StaticsCalculator";
    }
    std::filesystem::path root(raw);
    CoTaskMemFree(raw);
    return root / L"StaticsCalculator";
}

bool WriteResourceToFile(int resourceId, const std::filesystem::path& path) {
    HRSRC resource = FindResourceW(g_instance, MAKEINTRESOURCEW(resourceId), RT_RCDATA);
    if (!resource) return false;
    HGLOBAL loaded = LoadResource(g_instance, resource);
    if (!loaded) return false;
    const DWORD size = SizeofResource(g_instance, resource);
    const void* bytes = LockResource(loaded);
    if (!bytes || !size) return false;

    std::ofstream out(path, std::ios::binary | std::ios::trunc);
    if (!out) return false;
    out.write(static_cast<const char*>(bytes), size);
    return out.good();
}

bool PrepareAssets() {
    const auto root = LocalAppRoot();
    g_assetDir = root / L"web";
    std::error_code ec;
    std::filesystem::create_directories(g_assetDir, ec);
    if (ec) return false;

    return WriteResourceToFile(IDR_INDEX_HTML, g_assetDir / L"index.html") &&
           WriteResourceToFile(IDR_CALCULATOR_JS, g_assetDir / L"calculator.js") &&
           WriteResourceToFile(IDR_CALCULATOR_CSS, g_assetDir / L"calculator.css") &&
           WriteResourceToFile(IDR_STANDALONE_CSS, g_assetDir / L"standalone.css") &&
           WriteResourceToFile(IDR_STANDALONE_JS, g_assetDir / L"standalone.js");
}

void ResizeWebView() {
    if (!g_controller || !g_hwnd) return;
    RECT bounds{};
    GetClientRect(g_hwnd, &bounds);
    g_controller->put_Bounds(bounds);
}

void KeepWindowOnScreen() {
    if (!g_hwnd) return;
    RECT rect{};
    GetWindowRect(g_hwnd, &rect);
    HMONITOR monitor = MonitorFromRect(&rect, MONITOR_DEFAULTTONEAREST);
    MONITORINFO info{ sizeof(info) };
    if (!GetMonitorInfoW(monitor, &info)) return;

    const int width = rect.right - rect.left;
    const int height = rect.bottom - rect.top;
    const int x = std::clamp(rect.left, info.rcWork.left, std::max(info.rcWork.left, info.rcWork.right - width));
    const int y = std::clamp(rect.top, info.rcWork.top, std::max(info.rcWork.top, info.rcWork.bottom - height));
    SetWindowPos(g_hwnd, HWND_TOPMOST, x, y, 0, 0, SWP_NOSIZE | SWP_NOACTIVATE);
}

void FitWindowToContent(int contentHeightDip) {
    if (!g_hwnd || contentHeightDip <= 0) return;
    g_lastContentHeightDip = contentHeightDip;

    POINT cursor{};
    GetCursorPos(&cursor);
    HMONITOR monitor = MonitorFromPoint(cursor, MONITOR_DEFAULTTONEAREST);
    MONITORINFO info{ sizeof(info) };
    GetMonitorInfoW(monitor, &info);

    const int widthDip = 440;
    const int workHeightDip = PxToDip(info.rcWork.bottom - info.rcWork.top);
    const int targetHeightDip = std::clamp(contentHeightDip, 540, std::max(540, workHeightDip - 18));
    const int widthPx = DipToPx(widthDip);
    const int heightPx = DipToPx(targetHeightDip);

    RECT current{};
    GetWindowRect(g_hwnd, &current);
    if ((current.right - current.left) == widthPx && (current.bottom - current.top) == heightPx) return;

    SetWindowPos(g_hwnd, HWND_TOPMOST, 0, 0, widthPx, heightPx,
                 SWP_NOMOVE | SWP_NOACTIVATE);
    KeepWindowOnScreen();
}

void FocusExpression() {
    if (!g_webview) return;
    g_webview->ExecuteScript(
        L"(() => { const i=document.getElementById('calcExpression'); if(i){ i.focus({preventScroll:true}); const n=i.value.length; i.setSelectionRange(n,n); } })();",
        nullptr);
}

void PlaceNearCursor() {
    if (!g_hwnd) return;
    POINT cursor{};
    GetCursorPos(&cursor);

    RECT rect{};
    GetWindowRect(g_hwnd, &rect);
    const int width = rect.right - rect.left;
    const int height = rect.bottom - rect.top;

    HMONITOR monitor = MonitorFromPoint(cursor, MONITOR_DEFAULTTONEAREST);
    MONITORINFO info{ sizeof(info) };
    GetMonitorInfoW(monitor, &info);

    int x = cursor.x - width / 2;
    int y = cursor.y - DipToPx(80);
    x = std::clamp(x, info.rcWork.left, std::max(info.rcWork.left, info.rcWork.right - width));
    y = std::clamp(y, info.rcWork.top, std::max(info.rcWork.top, info.rcWork.bottom - height));

    SetWindowPos(g_hwnd, HWND_TOPMOST, x, y, 0, 0, SWP_NOSIZE | SWP_NOACTIVATE);
}

void ShowCalculator() {
    if (!g_hwnd) return;
    PlaceNearCursor();
    ShowWindow(g_hwnd, SW_SHOWNORMAL);
    SetWindowPos(g_hwnd, HWND_TOPMOST, 0, 0, 0, 0,
                 SWP_NOMOVE | SWP_NOSIZE | SWP_SHOWWINDOW);
    SetForegroundWindow(g_hwnd);
    FocusExpression();
}

void HideCalculator() {
    if (g_hwnd) ShowWindow(g_hwnd, SW_HIDE);
}

void ToggleCalculator() {
    if (!g_hwnd) return;
    if (IsWindowVisible(g_hwnd)) HideCalculator();
    else ShowCalculator();
}

void AddTrayIcon() {
    ZeroMemory(&g_tray, sizeof(g_tray));
    g_tray.cbSize = sizeof(g_tray);
    g_tray.hWnd = g_hwnd;
    g_tray.uID = 1;
    g_tray.uFlags = NIF_MESSAGE | NIF_ICON | NIF_TIP;
    g_tray.uCallbackMessage = WM_TRAY;
    g_tray.hIcon = LoadIconW(nullptr, IDI_APPLICATION);
    wcscpy_s(g_tray.szTip, L"Statics Calculator · Alt+C");
    Shell_NotifyIconW(NIM_ADD, &g_tray);
}

void RemoveTrayIcon() {
    if (g_tray.cbSize) Shell_NotifyIconW(NIM_DELETE, &g_tray);
}

void ShowTrayMenu() {
    HMENU menu = CreatePopupMenu();
    if (!menu) return;
    AppendMenuW(menu, MF_STRING, IDM_OPEN, L"Open calculator");
    AppendMenuW(menu, MF_STRING, IDM_HIDE, L"Hide calculator");
    AppendMenuW(menu, MF_SEPARATOR, 0, nullptr);
    AppendMenuW(menu, MF_STRING, IDM_QUIT, L"Quit");

    POINT pt{};
    GetCursorPos(&pt);
    SetForegroundWindow(g_hwnd);
    TrackPopupMenu(menu, TPM_RIGHTBUTTON | TPM_BOTTOMALIGN | TPM_LEFTALIGN,
                   pt.x, pt.y, 0, g_hwnd, nullptr);
    DestroyMenu(menu);
}

void ShowWebViewError(HRESULT hr) {
    wchar_t message[512]{};
    swprintf_s(
        message,
        L"Statics Calculator could not start Microsoft Edge WebView2.\\n\\n"
        L"Install or repair the Microsoft Edge WebView2 Runtime and try again.\\n\\n"
        L"Error: 0x%08X",
        static_cast<unsigned int>(hr));
    MessageBoxW(g_hwnd, message, kWindowTitle, MB_OK | MB_ICONERROR);
}

void InitializeWebView() {
    const auto userData = LocalAppRoot() / L"WebView2Data";
    std::error_code ec;
    std::filesystem::create_directories(userData, ec);

    const HRESULT hr = CreateCoreWebView2EnvironmentWithOptions(
        nullptr,
        userData.c_str(),
        nullptr,
        Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(
            [](HRESULT result, ICoreWebView2Environment* environment) -> HRESULT {
                if (FAILED(result) || !environment) {
                    ShowWebViewError(result);
                    return result;
                }
                g_environment = environment;

                return environment->CreateCoreWebView2Controller(
                    g_hwnd,
                    Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                        [](HRESULT controllerResult, ICoreWebView2Controller* controller) -> HRESULT {
                            if (FAILED(controllerResult) || !controller) {
                                ShowWebViewError(controllerResult);
                                return controllerResult;
                            }

                            g_controller = controller;
                            g_controller->get_CoreWebView2(&g_webview);
                            ResizeWebView();

                            ComPtr<ICoreWebView2Controller2> controller2;
                            if (SUCCEEDED(g_controller.As(&controller2))) {
                                COREWEBVIEW2_COLOR background{255, 244, 238, 226};
                                controller2->put_DefaultBackgroundColor(background);
                            }

                            ComPtr<ICoreWebView2Settings> settings;
                            if (SUCCEEDED(g_webview->get_Settings(&settings)) && settings) {
                                settings->put_AreDefaultContextMenusEnabled(FALSE);
                                settings->put_AreDevToolsEnabled(FALSE);
                                settings->put_IsStatusBarEnabled(FALSE);
                                settings->put_IsZoomControlEnabled(FALSE);
                            }

                            ComPtr<ICoreWebView2_3> webview3;
                            if (FAILED(g_webview.As(&webview3)) || !webview3) {
                                MessageBoxW(g_hwnd, L"This WebView2 Runtime is too old. Please update Microsoft Edge WebView2 Runtime.", kWindowTitle, MB_OK | MB_ICONERROR);
                                return E_NOINTERFACE;
                            }

                            webview3->SetVirtualHostNameToFolderMapping(
                                L"statics.local",
                                g_assetDir.c_str(),
                                COREWEBVIEW2_HOST_RESOURCE_ACCESS_KIND_DENY_CORS);

                            EventRegistrationToken token{};
                            g_webview->add_WebMessageReceived(
                                Callback<ICoreWebView2WebMessageReceivedEventHandler>(
                                    [](ICoreWebView2*, ICoreWebView2WebMessageReceivedEventArgs* args) -> HRESULT {
                                        LPWSTR raw = nullptr;
                                        if (FAILED(args->TryGetWebMessageAsString(&raw)) || !raw) return S_OK;
                                        std::wstring message(raw);
                                        CoTaskMemFree(raw);

                                        if (message == L"close") {
                                            PostMessageW(g_hwnd, WM_APP_HIDE, 0, 0);
                                        } else if (message == L"drag") {
                                            PostMessageW(g_hwnd, WM_APP_DRAG, 0, 0);
                                        } else if (message.rfind(L"fit:", 0) == 0) {
                                            try {
                                                const int height = std::stoi(message.substr(4));
                                                FitWindowToContent(height);
                                            } catch (...) {}
                                        }
                                        return S_OK;
                                    }).Get(),
                                &token);

                            g_webview->Navigate(L"https://statics.local/index.html");
                            return S_OK;
                        }).Get());
            }).Get());

    if (FAILED(hr)) ShowWebViewError(hr);
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT message, WPARAM wParam, LPARAM lParam) {
    switch (message) {
        case WM_CREATE:
            return 0;

        case WM_SIZE:
            ResizeWebView();
            return 0;

        case WM_DPICHANGED: {
            const RECT* suggested = reinterpret_cast<const RECT*>(lParam);
            SetWindowPos(hwnd, HWND_TOPMOST,
                         suggested->left, suggested->top,
                         suggested->right - suggested->left,
                         suggested->bottom - suggested->top,
                         SWP_NOACTIVATE);
            if (g_lastContentHeightDip > 0) FitWindowToContent(g_lastContentHeightDip);
            return 0;
        }

        case WM_HOTKEY:
            if (wParam == kHotkeyId) ToggleCalculator();
            return 0;

        case WM_APP_SHOW:
            ShowCalculator();
            return 0;

        case WM_APP_HIDE:
            HideCalculator();
            return 0;

        case WM_APP_DRAG:
            if (IsWindowVisible(hwnd)) {
                ReleaseCapture();
                SendMessageW(hwnd, WM_NCLBUTTONDOWN, HTCAPTION, 0);
            }
            return 0;

        case WM_CLOSE:
            if (!g_quitting) {
                HideCalculator();
                return 0;
            }
            DestroyWindow(hwnd);
            return 0;

        case WM_COMMAND:
            switch (LOWORD(wParam)) {
                case IDM_OPEN: ShowCalculator(); break;
                case IDM_HIDE: HideCalculator(); break;
                case IDM_QUIT:
                    g_quitting = true;
                    DestroyWindow(hwnd);
                    break;
            }
            return 0;

        case WM_TRAY:
            if (LOWORD(lParam) == WM_LBUTTONDBLCLK) {
                ShowCalculator();
            } else if (LOWORD(lParam) == WM_RBUTTONUP || LOWORD(lParam) == WM_CONTEXTMENU) {
                ShowTrayMenu();
            }
            return 0;

        case WM_DESTROY:
            RemoveTrayIcon();
            UnregisterHotKey(hwnd, kHotkeyId);
            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, message, wParam, lParam);
}
} // namespace

int WINAPI wWinMain(HINSTANCE instance, HINSTANCE, PWSTR, int) {
    g_instance = instance;
    SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);
    CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);

    g_mutex = CreateMutexW(nullptr, TRUE, L"Local\\StaticsCalculatorWebView2SingleInstance");
    if (g_mutex && GetLastError() == ERROR_ALREADY_EXISTS) {
        HWND existing = FindWindowW(kWindowClass, nullptr);
        if (existing) PostMessageW(existing, WM_APP_SHOW, 0, 0);
        CloseHandle(g_mutex);
        CoUninitialize();
        return 0;
    }

    if (!PrepareAssets()) {
        MessageBoxW(nullptr, L"Could not prepare the calculator files.", kWindowTitle, MB_OK | MB_ICONERROR);
        if (g_mutex) CloseHandle(g_mutex);
        CoUninitialize();
        return 1;
    }

    WNDCLASSEXW wc{ sizeof(wc) };
    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = instance;
    wc.hCursor = LoadCursorW(nullptr, IDC_ARROW);
    wc.hbrBackground = CreateSolidBrush(RGB(244, 238, 226));
    wc.lpszClassName = kWindowClass;
    RegisterClassExW(&wc);

    const int width = MulDiv(440, GetDpiForSystem(), 96);
    const int height = MulDiv(640, GetDpiForSystem(), 96);

    g_hwnd = CreateWindowExW(
        WS_EX_TOPMOST | WS_EX_APPWINDOW,
        kWindowClass,
        kWindowTitle,
        WS_POPUP,
        CW_USEDEFAULT, CW_USEDEFAULT,
        width, height,
        nullptr, nullptr, instance, nullptr);

    if (!g_hwnd) {
        if (g_mutex) CloseHandle(g_mutex);
        CoUninitialize();
        return 1;
    }

    AddTrayIcon();

    if (!RegisterHotKey(g_hwnd, kHotkeyId, MOD_ALT | MOD_NOREPEAT, 'C')) {
        MessageBoxW(g_hwnd,
                    L"Alt+C is already being used by another application.\\nThe calculator will still work from the tray icon.",
                    kWindowTitle, MB_OK | MB_ICONWARNING);
    }

    InitializeWebView();
    ShowCalculator();

    MSG msg{};
    while (GetMessageW(&msg, nullptr, 0, 0) > 0) {
        TranslateMessage(&msg);
        DispatchMessageW(&msg);
    }

    g_webview.Reset();
    if (g_controller) g_controller->Close();
    g_controller.Reset();
    g_environment.Reset();

    if (g_mutex) {
        ReleaseMutex(g_mutex);
        CloseHandle(g_mutex);
    }
    CoUninitialize();
    return 0;
}
