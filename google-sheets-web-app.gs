const FORM_SHEET_NAMES = {
  "home-inquiry": "Home Inquiry",
  "dealer-inquiry": "Dealer Inquiry",
  "project-inquiry": "Project Inquiry",
  "contact-inquiry": "Contact Inquiry"
};

const NOTIFICATION_EMAIL = "Contact@kcfixit.com";

const LEAD_HEADERS = [
  "Submitted At",
  "Form Key",
  "Page",
  "Inquiry Type",
  "Business Type",
  "Business Name",
  "Company",
  "Contact Person",
  "City / Region",
  "Requirement",
  "Project Type",
  "Use Area",
  "Monthly Opportunity",
  "Current Product Focus",
  "Phone",
  "Email",
  "Message",
  "All Fields JSON"
];

function doGet() {
  return ContentService.createTextOutput("KC Fixit form endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const formKey = payload.formKey || "";
    const fields = payload.fields || {};
    const sheetName = FORM_SHEET_NAMES[formKey] || "Website Leads";
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      formKey,
      payload.page || "",
      fields.inquiryType || "",
      fields.type || "",
      fields.business || "",
      fields.company || "",
      fields.name || "",
      fields.city || "",
      fields.requirement || "",
      fields.project || "",
      fields.useArea || "",
      fields.volume || "",
      fields.focus || "",
      fields.phone || "",
      fields.email || "",
      fields.message || "",
      JSON.stringify(fields)
    ]);

    sendNotificationEmail_(payload, fields);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setValues([LEAD_HEADERS]);
  sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function sendNotificationEmail_(payload, fields) {
  const formKey = payload.formKey || "website-inquiry";
  const senderName = fields.name || "Website visitor";
  const senderEmail = fields.email || "";
  const senderPhone = fields.phone || "";
  const subject = "[KC Fixit] New " + formKey + " submission";
  const lines = [
    "A new KC Fixit form submission has been received.",
    "",
    "Form: " + formKey,
    "Page: " + (payload.page || ""),
    "Submitted At: " + (payload.submittedAt || new Date().toISOString()),
    "",
    "Contact Person: " + senderName,
    "Phone: " + senderPhone,
    "Email: " + senderEmail,
    "Company: " + (fields.company || fields.business || ""),
    "Business Type: " + (fields.type || ""),
    "Inquiry Type: " + (fields.inquiryType || ""),
    "City / Region: " + (fields.city || ""),
    "Requirement: " + (fields.requirement || ""),
    "Project Type: " + (fields.project || ""),
    "Use Area: " + (fields.useArea || ""),
    "Monthly Opportunity: " + (fields.volume || ""),
    "Current Product Focus: " + (fields.focus || ""),
    "Message: " + (fields.message || ""),
    "",
    "All Fields JSON:",
    JSON.stringify(fields, null, 2)
  ];
  const emailOptions = {
    name: "KC Fixit Website"
  };

  if (senderEmail) {
    emailOptions.replyTo = senderEmail;
  }

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, lines.join("\n"), emailOptions);
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
