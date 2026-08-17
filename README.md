# JOBJACK Assessment Interpretation Training

Three self-contained HTML training modules, plus a small landing page linking them.

## Files

- `index.html` — landing page linking to all three editions
- `star-view.html` — percentile/percentage + star rating results only
- `ipc-view.html` — Ideal Profile Comparison / sten scale results only
- `assessments-view.html` — Assessments card only, no JobFIT framing

## Deploying to GitHub Pages (free hosting)

1. Create a new repository on GitHub (Settings can be **public** or
   **private** — Pages works on private repos too if your account has
   GitHub Pro/Team/Enterprise; public repos get free Pages on any plan).
2. Upload these four files to the root of that repository (drag-and-drop
   works fine on github.com, or `git add . && git commit && git push`).
3. In the repo: **Settings > Pages**.
4. Under "Build and deployment" > "Source", choose **Deploy from a
   branch**.
5. Branch: `main` (or whichever branch you pushed to), folder: `/ (root)`.
6. Click **Save**. GitHub will give you a URL after a minute or two,
   typically:

   ```
   https://<your-username>.github.io/<repo-name>/
   ```

That URL is your landing page. Share it directly, or link straight to
one edition, e.g. `https://<your-username>.github.io/<repo-name>/star-view.html`.

## Why host it instead of emailing the files

- **Progress saving works properly.** Each training saves a candidate's
  quiz progress in the browser as they go, so they can close the tab and
  resume later on the same device. That relies on the page being loaded
  from a real web address (`https://...`) — some browsers restrict this
  when a file is just opened locally.
- **One link, not three attachments.** Candidates get a single URL
  instead of a downloaded file they have to keep track of.
- **Free and update-friendly.** Whenever you get a new version of these
  files, just replace them in the repo (or re-upload) and the live link
  updates automatically — no need to redistribute anything.

## Tracking quiz scores & certificate downloads

See `tracking-script.gs` for the Google Apps Script that logs each
certificate download (with the candidate's name and per-section quiz
scores) to a Google Sheet. Once deployed, its Web App URL gets pasted
into the `SHEET_WEBHOOK_URL` constant in each HTML file before they're
rebuilt/uploaded.
