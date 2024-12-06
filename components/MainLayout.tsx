import { Layout } from 'antd';
import { Fragment, useState } from 'react';
import ChatbotSection from './ChatbotSection';
import ReactPlayer from 'react-player';

const Video = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player fixed-bottom"
        url="assets/response_video.mp4"
        width="50%"
        height="50%"
        controls={true}
      />
    </div>
  );
};

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
    return response; // Return the response data
  } catch (error) {
    console.error('Error sending user request:', error);
    throw error; // Throw the error to handle it outside
  }
};

export default function MainLayout() {
  const [haveResponse, setHaveResponse] = useState(false);
  const [text, setText] = useState('');

  return (
    <Fragment>
      <Layout className="h-screen w-screen bg-[#b5d6ff] lg:p-10 p-5 pt-0 lg:pr-15 ">
        <ChatbotSection
          onSend={(input, target) => {
            setHaveResponse(false);
            setText('...');
            sendUserRequest(input, target).then(response => {
              console.log(response);
              setHaveResponse(true);
              setText(response.data.response);
            });
          }}
        />
        {haveResponse ? (
          <div id={text}>
            <Video />
          </div>
        ) : (
          <div className="bg-[url(./../public/assets/kabi.jpg)] lg:h-[500px] lg:w-[500px] xxs:h-0 w-full bg-no-repeat bg-contain bg-center"></div>
        )}
        <div>{text}</div>
      </Layout>
    </Fragment>
  );
}
