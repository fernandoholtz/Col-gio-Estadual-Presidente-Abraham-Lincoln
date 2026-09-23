/**
 * Backend gratuito da pesquisa do site.
 * Google Apps Script -> implantar como Aplicativo da Web.
 * Planilha: Pesquisa do Site - Colégio Estadual Presidente Abraham Lincoln - 2026
 */
const SPREADSHEET_ID = "1qnk33C3pulldYIIhEYBrQF24jwJI2kLlrp47pT6hDy4";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, servico: "pesquisa-site-abraham-lincoln" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (data.tipo === "resposta") {
      const sheet = ss.getSheetByName("Respostas");
      sheet.appendRow([
        new Date(),
        safe_(data.visitor_id),
        safe_(data.perfil),
        safe_(data.origem_acesso),
        safe_(data.encontrou),
        safe_(data.interesse),
        safe_(data.nota),
        safe_(data.melhoria),
        safe_(data.duvida),
        safe_(data.pagina)
      ]);
    } else {
      const sheet = ss.getSheetByName("Eventos");
      sheet.appendRow([
        new Date(),
        safe_(data.tipo || "evento"),
        safe_(data.visitor_id),
        safe_(data.session_id),
        safe_(data.pagina),
        safe_(data.referencia),
        safe_(data.dispositivo)
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function safe_(value) {
  if (value === null || value === undefined) return "";
  return String(value).slice(0, 2000);
}
