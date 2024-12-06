import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ChatbotSection = ({
  onSend,
}: {
  onSend: (input: string, target: 'USER' | 'WAITER') => void;
}) => {
  const [userInput, setUserInput] = useState('Input');
  const [chatbotResponse, setChatbotResponse] = useState('Response');

  const handleSend = () => {
    if (userInput.trim()) {
      // Simulate a chatbot response (replace with your chatbot logic)
      const response = `You said: "${userInput}"`;
      setChatbotResponse(response);
      setUserInput(''); // Clear the input
      onSend(userInput, 'USER');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chat with the Bot
      </Typography>
      {/* User Input Section */}
      <div style={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Your Message"
          variant="outlined"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{ height: '100%' }}
        >
          Send
        </Button>
      </div>

      {/* Chatbot Response Section */}
      <Box
        sx={{
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 1,
          backgroundColor: '#f9f9f9',
          minHeight: '100px',
        }}
      >
        <Typography variant="body1">
          {chatbotResponse || 'The chatbot response will appear here.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatbotSection;
