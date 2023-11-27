// src/components/ChatInput.js
import React, { useState, useRef, useEffect } from 'react';
// Uncomment the following lines if you're using Font Awesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({ onSendMessage, selectedPrompt }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
//   const [isRecording, setIsRecording] = useState(false);
  const speechRecognition = useRef(null); 
  const isRecording = useRef(false);
  const timeoutId = useRef(null);
  const textareaRef = useRef(null);
  const maxTextareaHeight = 200;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    startRecording();
  }, []); // Empty dependency array to run only once on mount

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition;
        speechRecognition.current = new SpeechRecognition();
        speechRecognition.current.continuous = true; // Change to true for continuous recognition
        speechRecognition.current.interimResults = true;
        speechRecognition.current.lang = 'en-US';

        speechRecognition.current.onstart = () => {
            isRecording.current = true;
        };

        speechRecognition.current.onresult = (event) => {
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

            setMessage(transcript);
            restartRecordingAfterPause(); // Restart recording after a pause in speech
        };

        speechRecognition.current.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        speechRecognition.current.start();
    }
  };

  const restartRecordingAfterPause = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (isRecording.current) {
        speechRecognition.current.stop(); // Stop the current recording
        startRecording(); // Start a new recording
      }
    }, 2000); // 2 seconds pause
  };

// Cleanup on unmount
    useEffect(() => {
        return () => {
        if (speechRecognition.current) {
            speechRecognition.current.stop();
        }
        clearTimeout(timeoutId.current);
        };
    }, []);

  const handleFileClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const handleFileChange = (e) => {
    // Handle file upload logic here
    const file = e.target.files[0];
    console.log(file); // Just logging the file for now
  };

  // Function to calculate textarea height
//   const calculateHeight = (text) => {
//     const numberOfLineBreaks = (text.match(/\n/g) || []).length;
//     // Minimum height: 30px, Line height: 20px, Padding: 10px
//     const newHeight = Math.max(30, numberOfLineBreaks * 20 + 10) + 'px';
//     return newHeight;
//   };


    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      const scrollHeight = textarea.scrollHeight; // Set height to scroll height
      if (scrollHeight > maxTextareaHeight) {
        textarea.style.overflowY = 'auto'; // Enable vertical scrollbar
        textarea.style.height = maxTextareaHeight + 'px'; // Limit height to maxTextareaHeight
      } else {
        textarea.style.overflowY = 'hidden'; // Disable vertical scrollbar
        textarea.style.height = scrollHeight + 'px'; // Adjust height to content
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainerStyle}>
        <div style={iconContainerStyle}>
            <button type="button" onClick={handleFileClick} style={attachmentStyle} >
            {/* Replace with your upload icon */}
            <img src="/attachment.png" alt="Upload" style={{ width: '20px', height: '20px' }} />
            </button><input type="file" ref={fileInputRef}
                onChange={handleFileChange} style={{ display: 'none' }} // Hide the actual file input
            />
            <button type="submit" style={sendButtonStyle}>
                <img src="/send_buttton.png" alt="Send" style={{ width: '20px', height: '20px' }} />
            </button>
        </div>
        <textarea
          ref={textareaRef}
          value={selectedPrompt !== null ? selectedPrompt : message} 
          onChange={handleChange}
          placeholder="Ask me anything or you can type here..."
          style={textareaStyle}
        //   style={{ ...textareaStyle, height: calculateHeight(message) }} // Apply dynamic height here
        ></textarea>
        
      </div>
    </form>
  );
};
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'relative',
    bottom: '1vh',
    left: '0',
    right: '5%',
};

const inputContainerStyle = {
    position: 'relative',
    width: '93%',
    display: 'flex',
    alignItems: 'center',
    right: '5%'
};

const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center', // Center vertically
};

const textareaStyle = {
    width: '100%',
    padding: '10px 40px 0px 40px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    resize: 'none',
    fontSize: '16px',
    overflow: 'hidden',
};

const sendButtonStyle = {
    position: 'absolute',
    right: '10px',
    bottom: '1px',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
};

const attachmentStyle = {
    position: 'absolute',
    left: '10px',
    bottom: '1px',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer'
};

export default ChatInput;
