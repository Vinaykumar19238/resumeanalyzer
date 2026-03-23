import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: 'Hello! I am your AI Resume Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Mock AI Response logic
        setTimeout(() => {
            let aiText = "I'm not sure about that, but I can help you with resume tips, job matching, or explaining your ATS score!";
            
            const lowerInput = input.toLowerCase();
            if (lowerInput.includes('resume') || lowerInput.includes('upload')) {
                aiText = "You can upload your resume on the Dashboard. I'll analyze it and show you the best matching jobs!";
            } else if (lowerInput.includes('job') || lowerInput.includes('career')) {
                aiText = "We have many job openings! Once you upload your resume, I can recommend the ones that fit your skills best.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                aiText = "Hi there! Ready to boost your career today?";
            } else if (lowerInput.includes('ats') || lowerInput.includes('score')) {
                aiText = "ATS stands for Applicant Tracking System. Your score tells you how well your resume matches standard job requirements.";
            } else if (lowerInput.includes('skill')) {
                aiText = "Improving your skills in areas like React, Java, or Cloud technologies can significantly boost your ATS score.";
            }

            const aiMessage = { id: Date.now() + 1, type: 'ai', text: aiText };
            setMessages(prev => [...prev, aiMessage]);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <svg viewBox="0 0 24 24">
                        <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33L3,22l3.67-1.26A9.89,9.89,0,0,0,12,22a10,10,0,0,0,10-10A10,10,0,0,0,12,2Z" />
                    </svg>
                </div>
            )}

            {isOpen && (
                <div className="chatbot-window glass-panel">
                    <div className="chatbot-header">
                        <h3>AI Assistant</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="chatbot-send-btn" onClick={handleSend}>
                            <svg viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatbot;
