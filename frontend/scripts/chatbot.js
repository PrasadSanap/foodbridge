document.getElementById('chatbot').textContent = "Hi! Ask me about FoodBridge.";

function chatbotResponse(query) {
  if (query.includes("post")) return "To post food, go to Dashboard.";
  if (query.includes("claim")) return "NGOs can claim food from available list.";
  return "Sorry, I didn’t understand. Try again.";
}