function cleanPdfText(rawText) {
  if (!rawText) return "";

  return rawText
    .replace(/\r\n|\r|\n/g, " ")        
    .replace(/\s+/g, " ")              
    .replace(/[^\x20-\x7E\n]/g, "")     
    .replace(/\s([,.;:!?])/g, "$1")     
    .trim();
}

module.exports = { cleanPdfText };