# Statics Lab

GitHub source for the Statics Lab study site.

## Deployment
- Site source: `public/`
- Production hosting: GitHub Pages
- Deployment: automatic on every push to `main` via `.github/workflows/pages.yml`
- Backend/cloud profiles: existing Supabase project used directly by `public/app.js`

## Migration
The live Hatchable source was copied into this repository. The only runtime path adjustment is in `public/index.html`: root-absolute asset URLs were made document-relative so the site works under the GitHub Pages project path `/statics-lab/`.

The Hatchable project has no API functions and no Hatchable database tables. Cloud progress, practice answers, question whiteboards, and notes already use the same Supabase backend and remain there.
