# Steady workout tracker

Standalone static app at `/statics-lab/workout/`. All runtime assets stay in this folder. No imports from the main Statics Lab, account system, backend, service worker, cookies or shared storage keys.

Progress is browser-local under `ntu-workout:steady:v1`. JSON export/import provides backup and manual device transfer. It does not sync automatically. Existing Statics files and deployment configuration are unchanged.

The 12-week plan follows Eren's NTU beginner program from November 5, 2026. Suggested training days are adjustable with recovery spacing validation. Repeating a week inserts a new log at the same program phase, preserving history. Checking exercises never fabricates actual weight, reps or cardio minutes. Marking a day complete does not check unchecked exercises.

Video links are external YouTube demonstrations selected from PureGym, NASM, Fitness 19 and Oxford University Hospitals. Equipment models and video training-volume recommendations may differ; use this plan's prescribed dose and have staff demonstrate NTU's exact equipment.

Run the logic checks from the repository root with `node --test public/workout/tests/plan.test.cjs`.
