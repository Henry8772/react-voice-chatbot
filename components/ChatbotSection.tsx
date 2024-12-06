import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ChatbotSection = ({
  onSend,
}: {
  onSend: (input: string, target: 'USER' | 'WAITER') => void;
}) => {
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('Response');
  const [currFlow, setCurrFlow] = useState<'ASK_SUGGESTION' | 'CHOOSE_ITEM'>('ASK_SUGGESTION');

  const handleSend = () => {
    const prefix =
      currFlow === 'ASK_SUGGESTION'
        ? 'I want to get menu suggestions. '
        : 'I will choose a menu item, please tell the waiter about this item. ';
    if (userInput.trim()) {
      // Simulate a chatbot response (replace with your chatbot logic)
      const response = `You said: "${userInput}"`;
      setChatbotResponse(response);
      setUserInput(''); // Clear the input
      onSend(`${prefix}${userInput}`, 'USER');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Hey friend! Let's eat.
      </Typography>
      {/* User Input Section */}
      <div style={{ display: 'flex' }}>
        <TextField
          fullWidth
          label={
            currFlow === 'ASK_SUGGESTION' ? 'What would you like to eat?' : 'Choose a menu item'
          }
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
          onClick={() => {
            setCurrFlow(prev => (prev === 'ASK_SUGGESTION' ? 'CHOOSE_ITEM' : 'ASK_SUGGESTION'));
            handleSend();
          }}
          sx={{ height: '100%' }}
        >
          Send
        </Button>
      </div>
    </Box>
  );
};

export default ChatbotSection;
