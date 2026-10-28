/**
 * Portfolio contact form backend.
 * Paste this into the Apps Script editor attached to the
 * "Portfolio Contact Form — Submissions" Google Sheet
 * (Extensions > Apps Script), replacing any starter code.
 *
 * On each submission this:
 *  1. Logs the submission as a new row in the sheet.
 *  2. Emails you (laxmann.2003@gmail.com) a notification.
 *  3. Emails the person who submitted the form a short thank-you reply,
 *     sent "from" laxmann.2003@gmail.com (the Google account this script
 *     is deployed under — see the deploy steps below).
 */

var OWNER_EMAIL = "laxmann.2003@gmail.com";
var OWNER_NAME = "Lakshman Prabhu K";

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var params = e.parameter;

  var name = params.name || "";
  var email = params.email || "";
  var subject = params.subject || "";
  var message = params.message || "";

  sheet.appendRow([new Date(), name, email, subject, message]);

  // 1. Notify you.
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: "Portfolio contact: " + (subject || "New message"),
    replyTo: email,
    body: "From: " + name + " <" + email + ">\n\n" + message
  });

  // 2. Thank the submitter, sent from your address.
  if (email) {
    MailApp.sendEmail({
      to: email,
      from: OWNER_EMAIL,
      name: OWNER_NAME,
      replyTo: OWNER_EMAIL,
      subject: "Thanks for reaching out, " + (name || "there") + "!",
      body:
        "Hi " + (name || "there") + ",\n\n" +
        "Thanks for getting in touch through my portfolio — I've received your message" +
        (subject ? " about \"" + subject + "\"" : "") + " and will get back to you soon.\n\n" +
        "For reference, here's what you sent:\n" +
        "\"" + message + "\"\n\n" +
        "Best,\n" +
        OWNER_NAME
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
