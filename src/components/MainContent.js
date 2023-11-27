// src/components/MainContent.js
import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatResponse from './ChatResponse';
import PromptCard from './PromptCard';

const MainContent = () => {
  const [response, setResponse] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [promptCards, setPromptCards] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null); // State to store the selected prompt

  const handlePromptClick = (promptText) => {
    console.log("Prompt Text ", promptText)
    setSelectedPrompt(promptText); // Set the selected prompt when a prompt card is clicked
  };

  const handleSendMessage = async (message) => {
    console.log('Message sent:', message);
    // Handle the message (e.g., send it to a server or display it in a chat interface)
    if (selectedPrompt) {
      // If a prompt is selected, send it as a message
      handleSendMessage(selectedPrompt);
      setSelectedPrompt(null); // Clear the selected prompt
    }
  };

  useEffect(() => {
    // fetch('YOUR_API_ENDPOINT_FOR_PROMPT_CARDS')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setPromptCards(data); // Assuming 'data' is an array of prompts
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    //   });
    let data = [
                  {
                      "text": "Explain monitoring vs Observability.",
                      "message": "Explain monitoring vs Observability."
                  },
                  {
                      "text": "What is Certainty as a Service (CaaS)?",
                      "message": "What is Certainty as a Service (CaaS)?"
                  },
                  {
                      "text": "Ask about our services",
                      "message": "Tell me about your services"
                  },
                  {
                      "text": "Inquire about products",
                      "message": "What products do you offer?"
                  }
              ];
    setPromptCards(data);
  }, []);

  

  useEffect(() => {
    let resData = [
                  {
                      "prompts": ["Explain monitoring vs Observability.",
                      "What is Certainty as a Service (CaaS)?",
                      "Prompt3",
                      "Prompt4"],
                      "type": "prompt",
                      "user": null
                  },
                  {
                      "text": "What are your expertise?",
                      "message": "Tell me about your services",
                      "type": "question",
                      "user": "human"
                  },
                  {
                      "text": "We are experts in Azure servies, you can ask anything from azure.",
                      "message": "Tell me about your services",
                      "type": "question",
                      "user": "bot"
                  },
                  {
                      "text": "Help me to build AI model for 10th grade SSLC students in karnataka.",
                      "message": "Tell me about your services",
                      "type": "answer",
                      "user": "human"
                  },
                  {
                      "text": "Feeding the right type of data to an AI model is crucial for its effectiveness. For an AI model designed to assist 10th or SSLC students preparing for The Karnataka Secondary Education Examination Board (KSEEB) exams, consider the following types of data: Curriculum Data: Detailed information about the KSEEB curriculum for each subject, including topics covered, learning objectives, and key concepts. Past Exam Papers: Past exam papers can provide valuable insights into the types of questions asked, the format of the exam, and the marking scheme. Student Performance Data: Information about students’ performance in past exams or assessments can help the AI model understand common areas of difficulty and tailor its assistance accordingly. Study Material: Textbooks, guides, and other study materials used by students can provide a rich source of information for the AI model. Student Queries: Questions or queries raised by students during their study can help the AI model understand common areas of confusion or interest. Feedback Data: Feedback from students about their study habits, challenges faced, and effectiveness of different study strategies can help the AI model provide more personalized assistance. Remember, any data used must be anonymized and used in compliance with relevant data privacy laws and regulations. Also, the quality and relevance of the data are key factors in the effectiveness of the AI model. It’s important to continuously update and refine the data as the curriculum changes or new information becomes available. ",
                      "message": "What products do you offer?",
                      "type": "answer",
                      "user": "bot"
                  }
              ];
        setResponse(resData);
  }, []);

  // if (messages.length === 0) {
  //   return (<MainContainer>
  //     <div className="MainContent" style={MainContentStyle}>
  //       <div style={promptCardsContainerStyle}>
  //         {promptCards.map((card, index) => (
  //           <PromptCard key={index} text={card.text} onClick={() => handlePromptClick(card.text)} />
  //         ))}
  //       </div>
  //       <ChatInput onSendMessage={handleSendMessage} />
  //     </div>
  //   </MainContainer>)
  // } else {

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
              msg.user === "human" ? (
                <div>
                <div style={userStyle}>You</div>
                <ChatResponse key={index} text={msg.text} type={msg.type} />
              </div>
              ) : (
                <div>
                  <div style={userStyle}>Pulsera</div>
                  <ChatResponse key={index} text={msg.text} type={msg.type} />
                </div>
              )
          )
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} selectedPrompt={selectedPrompt}/>
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

const promptCardsContainerStyle = {
  display: 'flex',
  // overflowY: 'auto',
  justifyContent: 'space-around', // Adjust as needed
  flexWrap: 'wrap', // Allows cards to wrap if there are many
};

const messagesContainerStyle = {
  overflowY: 'auto',
  maxHeight: 'calc(90vh - 30px)', // Adjust this value as needed
  padding: '10px',
  margin: '10px 0',
};

const userStyle = {
  fontWeight: "bold"
}


export default MainContent;
