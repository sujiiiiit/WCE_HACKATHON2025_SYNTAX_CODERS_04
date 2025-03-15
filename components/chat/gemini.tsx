import React, { useState } from 'react';

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const GeminiTextProcessor = () => {
  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(event.target.value);
};

  const callGeminiAPI = async () => {
    setIsLoading(true);
    setApiResponse('');
    setError('');
    try {
      if (!process.env.GEMINI_API_KEY) {
        setError("GEMINI_API_KEY environment variable is not set. Please set it in your .env file.");
        setIsLoading(false);
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
      });

      const generationConfig = {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 65536,
        responseMimeType: "text/plain",
      };

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(inputText);
      setApiResponse(result.response.text());
    } catch (e) {
      console.error("Error calling Gemini API:", e);
      if (e instanceof Error) {
        setError(`Error processing text: ${e.message}`);
      } else {
        setError("Error processing text: An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Gemini Text Processor</h2>
      <div>
        <label htmlFor="inputText">Enter Text:</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={callGeminiAPI} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Process with Gemini'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {apiResponse && (
        <div>
          <h3>Gemini Response:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {apiResponse}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GeminiTextProcessor;