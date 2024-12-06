import CallBob from './CallBob';
import LanguageDropdown from './LanguageDropdown';
import { Layout } from 'antd';
import LanguageManager from './LanguageManager';
import { Fragment, useState } from 'react';
import { CallHistory } from './CallHistory';
import { GithubLink } from './GithubLink';
import ConversionIdeasModal from './ConversationIdeasModal';
import CallManager from './CallManager';
import ChatbotSection from './ChatbotSection';

import axios from 'axios';

const sendUserRequest = async (role: string, prompt: string) => {
  try {
    const response = await axios.post(
      'http://0.0.0.0:8000/user_request',
      {
        role: role,
        prompt: prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Ensure the Content-Type is JSON
        },
      }
    ); // Replace with your API endpoint
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
        <ChatbotSection onSend={(input, target) => sendUserRequest(input, target)} />
        {/* <LanguageManager>
          <CallManager>
            <Header className="flex bg-[#b5d6ff] items-center h-12 flex-row px-0 justify-between">
              <GithubLink />
              <div className="flex items-center">
                <ConversionIdeasModal />
                <CallHistory />
                <LanguageDropdown />
              </div>
            </Header>
            <Content>
              <CallBob />
            </Content>
          </CallManager>
        </LanguageManager> */}
      </Layout>
    </Fragment>
  );
}
