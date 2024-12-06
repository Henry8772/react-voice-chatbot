import { Layout } from 'antd';
import { Fragment, useState } from 'react';
import ChatbotSection from './ChatbotSection';

import axios from 'axios';

const sendUserRequest = async (prompt: string, role: string) => {
  console.log({ role, prompt });
  try {
    const response = await axios.post(
      'http://localhost:8000/user_request',
      {
        text: prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Ensure the Content-Type is JSON
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error sending user request:', error);
    throw error; // Throw the error to handle it outside
  }
};

const { Header, Content } = Layout;

export default function MainLayout() {
  const [target, setTarget] = useState<'USER' | 'WAITER'>('USER');

  return (
    <Fragment>
      <Layout className="h-screen w-screen bg-[#b5d6ff] lg:p-10 p-5 pt-0 lg:pr-15 ">
        <div className="bg-[url(./../public/assets/kabi.jpg)] lg:h-[500px] lg:w-[500px] xxs:h-0 w-full bg-no-repeat bg-contain bg-center"></div>
        <ChatbotSection onSend={(input, target) => sendUserRequest(input, target)} />
      </Layout>
    </Fragment>
  );
}
