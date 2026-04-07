import { useState, useRef, useEffect } from 'react';
import './ChatCoach.css';

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
}

export default function ChatCoach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'ai', text: 'Hi there! I am your EatWise coach. Thinking about eating something specific, or need a suggestion based on your current mood?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), type: 'user', text: inputText };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let aiResponseText = "That's an interesting choice! Based on your 'Weight Loss' goal, I'd suggest pairing it with a large salad or swapping the carbs to keep you in a calorie deficit.";
      
      if (newUserMsg.text.toLowerCase().includes('donut')) {
         aiResponseText = "A donut sounds great for a treat, but since your goal is Weight Loss and it's 10 AM, eating just a donut will spike your blood sugar and leave you hungry in an hour. How about a protein shake now, and a smaller sweet treat after lunch?";
      }

      const newAiMsg: Message = { id: Date.now().toString(), type: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, newAiMsg]);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2>Smart AI Coach</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Ask "Can I eat this?" or tell me how you're feeling.</p>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <div className="ai-avatar">AI</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>NutriBot</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Always online</span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="E.g., I really want a donut right now..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
          />
          <button 
            className="send-button" 
            onClick={handleSend}
            disabled={isTyping || !inputText.trim()}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
