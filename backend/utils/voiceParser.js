// Placeholder for voice input processing
function parseVoiceInput(text) {
  if (text.includes('post food')) return 'POST_FOOD';
  if (text.includes('claim food')) return 'CLAIM_FOOD';
  return 'UNKNOWN';
}

module.exports = { parseVoiceInput };