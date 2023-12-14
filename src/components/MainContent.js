// src/components/MainContent.js
import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatResponse from './ChatResponse';
import PromptCard from './PromptCard';
import FollowPromptCard from './FollowPromptCard';
import getInitials from './Initials';

const MainContent = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptClick = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleSendMessage = async (input) => {
    // Check if the last object in response is of type "follow-up-prompts"
    const lastResponse = response.length > 0 ? response[response.length - 1] : null;

    if (lastResponse && lastResponse.type === "follow-up-prompts") {
      // Remove the last object if it's a "follow-up-prompts"
      setResponse((prevArray) => prevArray.slice(0, -1));
    }
    
    setResponse(prevArray => [...prevArray, {
      "text": input,
      "message": input,
      "type": "question",
      "user": "human"
    }]);
    setIsLoading(true); // Start loading
    try {
      const newData = await answer(input);
      if (newData && newData['answers'] && newData['answers'][0]) {
        if (newData['answers'][0].answer) {
          setResponse(prevArray => [...prevArray, {
            "text": newData['answers'][0].answer,
            "message": "Tell me about your services",
            "type": "answer",
            "user": "bot"
          }]);
        }
        if (newData['answers'][0].dialog && newData['answers'][0].dialog.prompts && newData['answers'][0].dialog.prompts.length) {

          const followPrompts = newData['answers'][0].dialog.prompts.map((item, index) => `${index + 1}. ${item.displayText}`);
          setResponse(prevArray => [...prevArray, {
            "prompts": followPrompts,
            "type": "follow-up-prompts",
            "user": null
          }]);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const answer = async (input) => {
    try {
      const response = await fetch('https://mdxinteractivebot.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=MdxInteractiveBot&api-version=2021-10-01&deploymentName=production', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'c0d99a9fd96f4edfb2bee9d7b045eacf'
        },
        body: JSON.stringify({
          "top": 3,
          "question": input,
          "includeUnstructuredSources": true,
          "confidenceScoreThreshold": "0.5",
          "answerSpanRequest": {
              "enable": true,
              "topAnswersWithSpan": 1,
              "confidenceScoreThreshold": "0.5"
          }
      }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  
  useEffect(() => {
    let resData = [
                  {
                      "prompts": ["Explain monitoring vs Observability.",
                      "What is Certainty as a Service (CaaS)?",
                      ],
                      "type": "prompt",
                      "user": null
                  },
                  // {
                  //     "text": "What are your expertise?",
                  //     "message": "Tell me about your services",
                  //     "type": "question",
                  //     "user": "human"
                  // },
                  // {
                  //     "text": "We are experts in Azure servies, you can ask anything from azure.",
                  //     "message": "Tell me about your services",
                  //     "type": "answer",
                  //     "user": "bot"
                  // },
                  // {
                  //     "text": "Help me to build AI model for 10th grade SSLC students in karnataka.",
                  //     "message": "Tell me about your services",
                  //     "type": "question",
                  //     "user": "human"
                  // },
                  // {
                  //     "text": "Feeding the right type of data to an AI model is crucial for its effectiveness. For an AI model designed to assist 10th or SSLC students preparing for The Karnataka Secondary Education Examination Board (KSEEB) exams, consider the following types of data: Curriculum Data: Detailed information about the KSEEB curriculum for each subject, including topics covered, learning objectives, and key concepts. Past Exam Papers: Past exam papers can provide valuable insights into the types of questions asked, the format of the exam, and the marking scheme. Student Performance Data: Information about students’ performance in past exams or assessments can help the AI model understand common areas of difficulty and tailor its assistance accordingly. Study Material: Textbooks, guides, and other study materials used by students can provide a rich source of information for the AI model. Student Queries: Questions or queries raised by students during their study can help the AI model understand common areas of confusion or interest. Feedback Data: Feedback from students about their study habits, challenges faced, and effectiveness of different study strategies can help the AI model provide more personalized assistance. Remember, any data used must be anonymized and used in compliance with relevant data privacy laws and regulations. Also, the quality and relevance of the data are key factors in the effectiveness of the AI model. It’s important to continuously update and refine the data as the curriculum changes or new information becomes available. ",
                  //     "message": "What products do you offer?",
                  //     "type": "answer",
                  //     "user": "bot"
                  // }
              ];
        setResponse(resData);
  }, []);

  return (<MainContainer>
    <div className="MainContent" style={MainContentStyle}>
      <div style={messagesContainerStyle}>
        {response.map((msg, index) => (
          msg.type === "prompt" ? (
            <div style={promptCardsContainerStyle}>
              {msg.prompts.map((prompt, promptIndex) => (
                <PromptCard key={promptIndex} text={prompt} onClick={() => handlePromptClick(prompt)} />
              ))}
            </div>
          ) : (
              msg.type === "follow-up-prompts" ? (
                <div style={followPromptCardsContainerStyle}>
                  {msg.prompts.map((prompt, promptIndex) => (
                    <FollowPromptCard key={promptIndex} text={prompt} onClick={() => handlePromptClick(prompt)} />
                  ))}
                </div>
              ) : (
                msg.user === "human" ? (
                  <div>
                    <div style={userStyle}>
                    <span style={initialsStyle}>{getInitials("You")}</span>
                    You
                    </div>
                    <ChatResponse key={index} text={msg.text} type={msg.type} />
                  </div>
                ) : (
                  <div>
                    <div style={userStyle}>
                    <img src={"/pulsera.png"} alt={'pulsera'} style={iconStyle} />
                    Pulsera</div>
                    <ChatResponse key={index} text={msg.text} type={msg.type} />
                  </div>
                )
              )
          )
        ))}
        <div style={{ flex: 1 }}></div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading}/>
    </div>
  </MainContainer>)

  // }
};

const MainContainer = styled.div`
  height: 90vh;
  overflowY: 'auto',
`;

const MainContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  margin: '0px 30px',
  // flex: 1,
  overflowY: 'auto',
};

const followPromptCardsContainerStyle = {
  // display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  alignItems: 'left',
  margin: '10px, 0',
};

const promptCardsContainerStyle = {
  display: 'flex',
  // overflowY: 'auto',
  justifyContent: 'space-around', // Adjust as needed
  flexWrap: 'wrap', // Allows cards to wrap if there are many
};

const messagesContainerStyle = {
  overflowY: 'auto',
  maxHeight: 'calc(90vh - 30px)', // Adjust this value as needed
  flexDirection: 'column', // Stack messages vertically
  flex: 1, // Expand to fill available space
  padding: '10px',
  margin: '10px 0',
};

const userStyle = {
  fontWeight: "bold",
  display: 'flex', // Use flex to align items in the same line
  alignItems: 'center'
}

const initialsStyle = {
  display: 'inline-block',
  marginRight: '8px', 
  backgroundColor: '#007bff', // Set the background color for the initials
  color: '#fff', // Set the text color for the initials
  borderRadius: '50%', // Make it a circle by setting border radius to 50%
  width: '24px', // Set the width of the circle
  height: '24px', // Set the height of the circle
  textAlign: 'center', // Center the text (initials) horizontally and vertically
  lineHeight: '24px', // Align text vertically in the middle of the circle
  fontWeight: "normal",
};

const iconStyle = {
  display: 'inline-block',
  marginRight: '8px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#007bff',
};


export default MainContent;
