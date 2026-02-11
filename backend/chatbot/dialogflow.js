// Example chatbot integration (Dialogflow)
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

async function runChatbotQuery(projectId, query, languageCode = 'en') {
  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: { text: query, languageCode }
    }
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult.fulfillmentText;
}

module.exports = { runChatbotQuery };