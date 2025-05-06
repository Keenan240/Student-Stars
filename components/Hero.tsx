'use client';
import { useState, useRef, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const prompts = [
  "What are the Prerequisites for Queen's Commerce?",
  "When is the next UOFT Admissions Round?",
  "What was last year's cutoff for Waterloo CS?",
  "What are the Top Programs for Business?",
  "How many people get into Mac Health Sci?"
];

export default function Hero() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasAsked, setHasAsked] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const typewriterText = useTypewriter(prompts); // ✅ moved here

  const handleAsk = async () => {
    if (!question.trim()) return;

    setMessages(prev => [...prev, { text: question, sender: 'user' }]);
    setHasAsked(true);
    setQuestion('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();

    setMessages(prev => [...prev, { text: data.answer, sender: 'bot' }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest', // ✅ prevents jumping to bottom of entire page
    });
  }, [messages]);
  
  return (
    <div className="container">
    <img
      src="/Logo.png"
      alt="Logo"
      style={{ position: 'absolute', top: '49px', left: '38px', height: '28px' }}
    />
      {!hasAsked && (
        <div className="prompt">
          <h1 style={{ fontSize: '48px', fontWeight: 600 }}>
            {typewriterText}
            <span style={{ borderRight: '2px solid black', marginLeft: '2px' }}></span>
          </h1>
          <input
            className="input-bar"
            type="text"
            placeholder="Ask something…"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
          />
        </div>
      )}

      {hasAsked && (
        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
          ))}
          <div ref={chatEndRef} />
          <input
            className="input-bar"
            type="text"
            placeholder="Type your message…"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
          />
        </div>
      )}
    </div>
  );
}
