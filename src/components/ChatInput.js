import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const speechRecognition = useRef(null); 
    const isRecording = useRef(false);
    const timeoutId = useRef(null);
    const textareaRef = useRef(null);
    const [isMicOn, setIsMicOn] = useState(false); // New state for microphone status
    const maxTextareaHeight = 200;

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isMicOn) {
          setIsMicOn(false);
        }
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const startRecording = () => {
        if (isMicOn && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            speechRecognition.current = new SpeechRecognition();
            speechRecognition.current.continuous = true;
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
                restartRecordingAfterPause();
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
                speechRecognition.current.stop();
                startRecording();
            }
        }, 2000);
    };

    useEffect(() => {
        if (isMicOn) {
            startRecording();
        } else if (speechRecognition.current) {
            speechRecognition.current.stop();
        }
        return () => {
            if (speechRecognition.current) {
                speechRecognition.current.stop();
            }
            clearTimeout(timeoutId.current);
        };
    }, [isMicOn]);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            if (scrollHeight > maxTextareaHeight) {
                textarea.style.overflowY = 'auto';
                textarea.style.height = maxTextareaHeight + 'px';
            } else {
                textarea.style.overflowY = 'hidden';
                textarea.style.height = scrollHeight + 'px';
            }
        }
    };

    const toggleMic = () => {
      if (isMicOn) {
        setIsMicOn(false);
        if (speechRecognition.current) {
            speechRecognition.current.stop();
            isRecording.current = false;
            // Send the recorded message if it's not empty
            if (message.trim()) {
                onSendMessage(message);
                setMessage('');
            }
        }
      } else {
        // Turning on the microphone
        setIsMicOn(true);
      }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputContainerStyle}>
                <div style={iconContainerStyle}>
                    <button type="button" onClick={toggleMic} style={micButtonStyle}>
                        {isMicOn ? <img src="/microphone_on.png" alt="Mic On" style={{ width: '20px', height: '20px' }} /> : <img src="/microphone_off.png" alt="Mic Off" style={{ width: '20px', height: '20px' }} />}
                    </button>
                    <button type="button" onClick={handleFileClick} style={attachmentStyle}>
                        <img src="/attachment.png" alt="Upload" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                    <button type="submit" style={sendButtonStyle} disabled={isLoading}>
                        {isLoading ? <img src="/loading.gif" alt="Loading..." style={{ width: '20px', height: '20px' }} /> : 
                        <img src="/send_buttton.png" alt="Send" style={{ width: '20px', height: '20px' }} />} 
                    </button>
                </div>
                <textarea
                    ref={textareaRef}
                    value={message} 
                    onChange={handleChange}
                    placeholder="Ask me anything or you can type here..."
                    style={textareaStyle}
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
    alignItems: 'center',
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

const micButtonStyle = {
  position: 'absolute',
  right: '50px',
  bottom: '1px',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

export default ChatInput;
