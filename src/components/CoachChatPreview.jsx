import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, User, Bot, Volume2, Pause } from 'lucide-react';

function Message({ role, text }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isUser ? 'bg-violet-500 text-white' : 'bg-white/10 text-zinc-100'} backdrop-blur border border-white/10`}> {text} </div>
    </div>
  );
}

export default function CoachChatPreview() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome back! Ready for Day 3: Full Body B? I can scale up or down based on your energy today.' },
  ]);
  const [input, setInput] = useState('Can we keep it under 30 minutes?');
  const [speaking, setSpeaking] = useState(false);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newUser = { role: 'user', text: input.trim() };
    const newAssistant = { role: 'assistant', text: 'Absolutely. I will trim accessories and set a 30-min EMOM finisher. Ready to start the timer?' };
    setMessages((m) => [...m, newUser, newAssistant]);
    setInput('');
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">AI Coach</p>
              <p className="text-xs text-zinc-400">Voice-enabled session guide</p>
            </div>
          </div>
          <button onClick={() => setSpeaking((s) => !s)} className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ring-1 ring-white/10 ${speaking ? 'bg-violet-600 text-white' : 'bg-white/10 text-zinc-200'} transition`}>
            {speaking ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />} {speaking ? 'Stop Voice' : 'Play Voice'}
          </button>
        </div>

        <div className="h-72 w-full overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="space-y-3">
            {messages.map((m, i) => (
              <Message key={i} role={m.role} text={m.text} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSend} className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 flex-1">
            <User className="h-4 w-4 text-zinc-400" />
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message to your coach..." className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/10 transition hover:bg-white/20">
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold">What the coach can do</h3>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2"><Mic className="mt-0.5 h-4 w-4 text-violet-300" /> Start/stop timers and intervals hands-free</li>
          <li className="flex gap-2"><Mic className="mt-0.5 h-4 w-4 text-violet-300" /> Substitute movements based on equipment or pain</li>
          <li className="flex gap-2"><Mic className="mt-0.5 h-4 w-4 text-violet-300" /> Track RPE and auto-progress load weekly</li>
          <li className="flex gap-2"><Mic className="mt-0.5 h-4 w-4 text-violet-300" /> Deliver cooldown breathing cues</li>
        </ul>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
          <p className="text-sm text-zinc-300">Tip: Try saying “scale intensity to 7/10 and replace lunges” during a session. The coach adapts instantly.</p>
        </div>
      </motion.div>
    </div>
  );
}
