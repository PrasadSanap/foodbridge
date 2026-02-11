function startVoiceInput() {
  const recognition = new window.SpeechRecognition();
  recognition.lang = document.getElementById('languageSwitcher').value;
  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    const response = chatbotResponse(voiceText.toLowerCase());
    document.getElementById('chatbot').textContent = `You said: ${voiceText}\nBot: ${response}`;
  };
  recognition.start();
}