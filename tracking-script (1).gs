/**
 * JOBJACK Assessment Interpretation Training — tracking endpoint.
 *
 * Logs one row per certificate download, including the candidate's name,
 * certificate ID, issue/expiry dates, and their score on every section
 * quiz they completed.
 *
 * ---------------------------------------------------------------------
 * SETUP (one-time, ~5 minutes):
 * ---------------------------------------------------------------------
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Name it whatever you like, e.g. "JOBJACK AIT Tracking".
 *
 * 2. In that sheet: Extensions > Apps Script.
 *
 * 3. Delete any starter code in the editor, and paste in this entire
 *    file instead.
 *
 * 4. Click the "Save" icon (or Ctrl/Cmd+S).
 *
 * 5. Click "Deploy" (top right) > "New deployment".
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: anything, e.g. "AIT tracking v1".
 *    - Execute as: "Me".
 *    - Who has access: "Anyone".
 *    - Click "Deploy".
 *
 * 6. Google will ask you to authorize the script (since it writes to
 *    your sheet) — click through the consent screens ("Advanced" >
 *    "Go to [project name] (unsafe)" is expected for your own script;
 *    this is normal for personal Apps Script projects).
 *
 * 7. Copy the "Web app URL" it gives you (ends in /exec).
 *
 * 8. Send that URL back — it gets pasted into the SHEET_WEBHOOK_URL
 *    constant near the top of the training tool's script, and the
 *    files get rebuilt with it wired in.
 *
 * That's it — every certificate download will then add a row to this
 * sheet automatically. If you ever change the quiz/section structure
 * significantly, you can re-deploy (Deploy > Manage deployments > Edit
 * > New version) without needing a new URL.
 * ---------------------------------------------------------------------
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add a header row once, the first time this ever runs.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp (server)",
      "Edition",
      "Event",
      "Candidate Name",
      "Certificate ID",
      "Issued",
      "Valid Until",
      "Quiz Scores"
    ]);
  }

  let data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = {};
  }

  sheet.appendRow([
    new Date(),
    data.edition || "",
    data.event || "",
    data.name || "",
    data.certId || "",
    data.issuedDate || "",
    data.validUntil || "",
    data.scores || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Lets you sanity-check the deployed URL in a browser (just confirms
// the endpoint is live; it doesn't write anything).
function doGet(e) {
  return ContentService.createTextOutput("JOBJACK AIT tracking endpoint is running.");
}
