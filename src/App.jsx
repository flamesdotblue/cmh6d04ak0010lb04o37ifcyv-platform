import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import PlanForm from './components/PlanForm';
import CoachChatPreview from './components/CoachChatPreview';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <main className="relative z-10">
        <section id="features" className="py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <Features />
          </div>
        </section>
        <section id="plan" className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black">
          <div className="container mx-auto max-w-6xl px-6">
            <PlanForm />
          </div>
        </section>
        <section id="coach" className="py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <CoachChatPreview />
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 py-8 flex items-center justify-between text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} AIGym Coach. All rights reserved.</p>
          <nav className="flex gap-6">
            <a className="hover:text-white transition" href="#features">Features</a>
            <a className="hover:text-white transition" href="#plan">Your Plan</a>
            <a className="hover:text-white transition" href="#coach">Coach</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
