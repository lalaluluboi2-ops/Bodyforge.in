import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, SupportedLanguage, UserFitnessProfile, ChatSession } from '../types';
import { streamChatMessage, extractMediaContent } from '../services/aiChatService';
import { WorkoutMediaCard } from './WorkoutMediaCard';
import { 
  fetchChatSessions, 
  saveChatSession, 
  deleteChatSession 
} from '../services/firebase';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  Globe2, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  Minimize2,
  History,
  Plus,
  Trash2,
  Edit2,
  MessageSquare,
  HelpCircle,
  Heart,
  Smile,
  Flame,
  Coffee
} from 'lucide-react';

interface BodyBuddyChatProps {
  userProfile?: UserFitnessProfile | null;
  onNavigateTab: (tab: string) => void;
}

const getPersonalizedGreeting = (name?: string | null): ChatMessage => ({
  id: 'initial',
  sender: 'assistant',
  text: `Hey ${name ? name.split(' ')[0] : 'there'}, superstar! 🌟 I'm BodyBuddy, your personal fitness bestie and wellness cheerleader on BODYFORGE! Whether you need workout guidance, 60FPS interactive video demos, delicious healthy meal ideas, or just a boost of daily motivation—I'm always right here in your corner. How are you feeling today? 💪✨`,
  timestamp: Date.now()
});

export const BodyBuddyChat: React.FC<BodyBuddyChatProps> = ({ userProfile, onNavigateTab }) => {
  const uid = userProfile?.uid || 'guest_user';
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveAI, setIsLiveAI] = useState<boolean | null>(null);

  // Sessions and Active Chat
  const defaultGreeting = getPersonalizedGreeting(userProfile?.displayName);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>(() => `session_${Date.now()}`);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultGreeting]);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [likedMessages, setLikedMessages] = useState<Record<string, boolean>>({});
  const [selectedCreatorPhoto, setSelectedCreatorPhoto] = useState<string | null>(null);

  const toggleLike = (msgId: string) => {
    setLikedMessages(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load chat sessions on mount or when user changes
  useEffect(() => {
    fetchChatSessions(uid).then((loaded) => {
      setSessions(loaded);
      if (loaded.length > 0) {
        // Resume most recent session
        setActiveSessionId(loaded[0].id);
        setMessages(loaded[0].messages.length > 0 ? loaded[0].messages : [defaultGreeting]);
      }
    });
  }, [uid, userProfile?.displayName]);

  useEffect(() => {
    if (isOpen && !showHistory) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, showHistory]);

  const handleStartNewChat = () => {
    const newId = `session_${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      userId: uid,
      title: 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [defaultGreeting]
    };

    setActiveSessionId(newId);
    setMessages([defaultGreeting]);
    setSessions(prev => [newSession, ...prev]);
    saveChatSession(uid, newSession);
    setShowHistory(false);
  };

  const handleSelectSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setMessages(session.messages.length > 0 ? session.messages : [defaultGreeting]);
    setShowHistory(false);
  };

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteChatSession(uid, sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      handleStartNewChat();
    }
  };

  const handleStartRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitleInput(session.title);
  };

  const handleSaveRename = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTitle = editTitleInput.trim() || 'Conversation';
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title: updatedTitle } : s));
    const target = sessions.find(s => s.id === sessionId);
    if (target) {
      await saveChatSession(uid, { ...target, title: updatedTitle });
    }
    setEditingSessionId(null);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: Date.now()
    };

    const assistantMsgId = `assistant_${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      text: '',
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, userMsg, initialAssistantMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    let accumulatedText = '';
    await streamChatMessage(
      query,
      messages,
      language,
      userProfile,
      (chunk) => {
        accumulatedText += chunk;
        const { cleanText } = extractMediaContent(accumulatedText, query);
        setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, text: cleanText } : m));
      },
      (action, live, media, creator) => {
        setIsLiveAI(live ?? true);
        const { cleanText, creatorProfile: extractedCreator } = extractMediaContent(accumulatedText, query);
        const finalCreator = creator || extractedCreator;
        const finalMessages = updatedMessages.map(m => m.id === assistantMsgId ? { 
          ...m, 
          text: cleanText,
          suggestedAction: action,
          mediaContent: media,
          creatorProfile: finalCreator
        } : m);
        setMessages(finalMessages);
        setIsLoading(false);

        // Auto-save session and set title if first user message
        const currentSession = sessions.find(s => s.id === activeSessionId);
        const sessionTitle = (!currentSession || currentSession.title === 'New Conversation')
          ? query.slice(0, 32) + (query.length > 32 ? '...' : '')
          : currentSession.title;

        const savedSession: ChatSession = {
          id: activeSessionId,
          userId: uid,
          title: sessionTitle,
          createdAt: currentSession ? currentSession.createdAt : Date.now(),
          updatedAt: Date.now(),
          messages: finalMessages
        };

        saveChatSession(uid, savedSession);
        setSessions(prev => {
          const idx = prev.findIndex(s => s.id === activeSessionId);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = savedSession;
            return copy;
          }
          return [savedSession, ...prev];
        });
      },
      (err) => {
        console.error('Chat error:', err);
        const { cleanText, media, creatorProfile: extractedCreator } = extractMediaContent(
          accumulatedText || "I'm right here to help you train and stay healthy! What's next on your mind?", 
          query
        );
        const fallbackMessages = updatedMessages.map(m => m.id === assistantMsgId ? {
          ...m,
          text: cleanText,
          mediaContent: media,
          creatorProfile: extractedCreator
        } : m);
        setMessages(fallbackMessages);
        setIsLoading(false);
      }
    );
  };

  const quickPills = [
    { label: '🌟 Who made you?', query: 'Who made you and created this website?' },
    { label: '💛 Cheer me up today!', query: 'Can you give me a friendly boost of motivation and a kind word today? 💛' },
    { label: '🎥 Push-Up Video Demo', query: 'Make an interactive video demonstration of pushups with form cues' },
    { label: '🥑 Healthy & Tasty Meals', query: 'What healthy, balanced meals and protein foods support bodyweight fitness?' },
    { label: '✨ 30-Day Glow-Up Blueprint', query: 'Give me the athletic glow-up blueprint for jawline, posture, and skin radiance' },
    { label: '☕ Feeling tired & low energy', query: "I'm feeling a bit tired and low on energy today. What's a gentle, kind way to move my body without stress?" },
    { label: '🎉 Fun Fitness Fact', query: 'Tell me a fun, fascinating fitness or human body fact to brighten my day!' },
    { label: '🧘 Gentle Back & Neck Relief', query: 'My back and neck feel stiff from sitting. What are gentle movements I can do safely?' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-5 z-40 p-3.5 rounded-2xl bg-forge-lime text-black font-extrabold shadow-forge-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group cursor-pointer"
          aria-label="Open BodyBuddy AI assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 fill-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-forge-cyan animate-ping" />
          </div>
          <span className="text-xs font-bold font-sans tracking-wide pr-1 hidden sm:inline">
            BodyBuddy AI 🌟
          </span>
        </button>
      )}

      {/* Responsive Chat Overlay */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-charcoal-900 border border-charcoal-700 shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-2 md:inset-10 rounded-3xl'
              : 'inset-x-0 bottom-0 md:inset-x-auto md:right-6 md:bottom-6 md:w-[460px] md:h-[640px] h-[88vh] rounded-t-3xl md:rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-charcoal-950 border-b border-charcoal-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forge-lime/10 border border-forge-lime flex items-center justify-center text-forge-lime shadow-[0_0_12px_rgba(202,255,0,0.2)]">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">BodyBuddy AI</h3>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase flex items-center gap-1 ${
                    isLiveAI === true 
                      ? 'bg-forge-lime/20 text-forge-lime border border-forge-lime/40' 
                      : 'bg-charcoal-800 text-gray-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-forge-lime animate-pulse" />
                    {isLiveAI === true ? 'Live Gemini AI' : 'Friendly Coach'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span>Created by Debojyoti Karmakar</span>
                  <span className="text-forge-lime">• Always here for you 💛</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* History Toggle Button */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all ${
                  showHistory ? 'bg-forge-lime text-black font-bold' : 'text-gray-400 hover:text-white bg-charcoal-900 border border-charcoal-800'
                }`}
                title="View Saved Chat History"
              >
                <History className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">History</span>
              </button>

              {/* Language Switcher */}
              <div className="flex items-center gap-0.5 bg-charcoal-900 p-0.5 rounded-lg border border-charcoal-800 text-[10px] font-mono">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-forge-lime text-black font-bold' : 'text-gray-400'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-1.5 py-0.5 rounded ${language === 'hi' ? 'bg-forge-lime text-black font-bold' : 'text-gray-400'}`}
                >
                  HI
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`px-1.5 py-0.5 rounded ${language === 'bn' ? 'bg-forge-lime text-black font-bold' : 'text-gray-400'}`}
                >
                  BN
                </button>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden md:inline-flex p-1.5 rounded-lg text-gray-400 hover:text-white"
                aria-label="Toggle chat size"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                aria-label="Close BodyBuddy AI"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat History View vs Active Chat */}
          {showHistory ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-charcoal-950/80">
              <div className="flex items-center justify-between pb-2 border-b border-charcoal-800">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <History className="w-4 h-4 text-forge-lime" />
                  <span>Your Saved Conversations ({sessions.length})</span>
                </div>
                <button
                  onClick={handleStartNewChat}
                  className="px-3 py-1.5 rounded-xl bg-forge-lime text-black font-bold text-[10px] flex items-center gap-1 shadow-forge-glow hover:bg-forge-lime-hover"
                >
                  <Plus className="w-3 h-3" /> New Chat
                </button>
              </div>

              {sessions.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs space-y-1">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                  <p>No previous conversations recorded yet.</p>
                  <p className="text-[10px]">Start chatting and your sessions will save automatically!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sessions.map((sess) => {
                    const isActive = sess.id === activeSessionId;
                    return (
                      <div
                        key={sess.id}
                        onClick={() => handleSelectSession(sess)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isActive 
                            ? 'bg-charcoal-900 border-forge-lime' 
                            : 'bg-charcoal-900/60 border-charcoal-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          {editingSessionId === sess.id ? (
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                value={editTitleInput}
                                onChange={(e) => setEditTitleInput(e.target.value)}
                                className="bg-charcoal-950 border border-forge-lime text-xs text-white rounded-lg px-2 py-1 w-full focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={(e) => handleSaveRename(sess.id, e)}
                                className="px-2 py-1 rounded bg-forge-lime text-black font-bold text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <>
                              <h4 className={`text-xs font-bold truncate ${isActive ? 'text-forge-lime' : 'text-white'}`}>
                                {sess.title}
                              </h4>
                              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                                {new Date(sess.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} • {sess.messages.length} messages
                              </p>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => handleStartRename(sess, e)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800"
                            title="Rename chat"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteSession(sess.id, e)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-charcoal-800"
                            title="Delete chat"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Friendly Encouragement Banner */}
              <div className="bg-charcoal-950/80 px-4 py-2 border-b border-charcoal-850 flex items-center justify-between text-[10px] text-gray-300 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-forge-lime font-bold">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    {userProfile?.streakDays || 1}-Day Streak!
                  </span>
                  <span className="text-gray-500 hidden sm:inline">•</span>
                  <span className="text-gray-400 hidden sm:inline">You are doing fantastic today! ✨</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSend("Give me a quick high-five and an uplifting thought for today! 🙌")}
                    className="px-2 py-0.5 rounded-full bg-forge-lime/10 border border-forge-lime/30 text-forge-lime font-bold hover:bg-forge-lime hover:text-black transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>High-Five! 🙌</span>
                  </button>
                  <button
                    onClick={handleStartNewChat}
                    className="text-gray-400 hover:text-white font-mono flex items-center gap-0.5"
                    title="Start fresh conversation"
                  >
                    <Plus className="w-3 h-3" /> New
                  </button>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed transition-all shadow-md ${
                        m.sender === 'user'
                          ? 'bg-forge-lime text-black font-medium rounded-tr-none'
                          : m.isEmergencyAlert
                          ? 'bg-red-950/60 border border-red-600 text-red-100 rounded-tl-none shadow-lg'
                          : 'bg-charcoal-950 border border-charcoal-800 text-gray-200 rounded-tl-none'
                      }`}
                    >
                      {/* Coach Banner inside assistant message */}
                      {m.sender === 'assistant' && (
                        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-charcoal-800/80">
                          <div className="flex items-center gap-1.5 text-forge-lime font-bold text-[11px]">
                            <Smile className="w-3.5 h-3.5" />
                            <span>BodyBuddy Coach</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-sans">In your corner 💛</span>
                        </div>
                      )}

                      {m.isEmergencyAlert && (
                        <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>Safety Notice</span>
                        </div>
                      )}

                      <p className="whitespace-pre-wrap">
                        {m.text}
                        {m.text === '' && isLoading && (
                          <span className="inline-flex items-center gap-1.5 text-forge-lime font-mono text-xs">
                            <Sparkles className="w-3.5 h-3.5 animate-spin" /> BodyBuddy is typing with love... ✨
                          </span>
                        )}
                        {m.text !== '' && isLoading && m.id === messages[messages.length - 1]?.id && (
                          <span className="inline-block w-1.5 h-3.5 bg-forge-lime animate-pulse ml-1 align-middle" />
                        )}
                      </p>

                      {/* On-Demand Workout Video or Image Media Card */}
                      {m.mediaContent && (
                        <WorkoutMediaCard media={m.mediaContent} />
                      )}

                      {/* Verified Creator Card with Debojyoti Karmakar portrait */}
                      {m.creatorProfile && (
                        <div className="mt-3.5 p-3.5 rounded-2xl bg-charcoal-900/90 border border-forge-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] relative overflow-hidden backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
                          {/* Ambient cyan and violet aura inspired by the portrait's neon backdrop */}
                          <div className="absolute -top-10 -right-10 w-28 h-28 bg-forge-cyan/20 rounded-full blur-2xl pointer-events-none" />
                          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-indigo-600/30 rounded-full blur-2xl pointer-events-none" />

                          <div className="relative z-10 flex items-center gap-3.5">
                            {/* Circular glowing portrait */}
                            <div 
                              onClick={() => setSelectedCreatorPhoto(m.creatorProfile?.image || null)}
                              className="relative cursor-pointer group shrink-0"
                              title="Click to expand Debojyoti's photo"
                            >
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_15px_rgba(0,240,255,0.5)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.75)] transition-all duration-300">
                                <img 
                                  src={m.creatorProfile.image} 
                                  alt={m.creatorProfile.name} 
                                  className="w-full h-full rounded-full object-cover bg-charcoal-950" 
                                />
                              </div>
                              <span className="absolute bottom-0 right-0 p-1 bg-charcoal-950 rounded-full border border-forge-cyan text-cyan-300 shadow-md">
                                <Sparkles className="w-2.5 h-2.5" />
                              </span>
                            </div>

                            {/* Creator details */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="text-sm font-extrabold text-white tracking-wide">{m.creatorProfile.name}</h4>
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-forge-cyan/20 border border-forge-cyan/40 text-[9px] font-bold text-forge-cyan tracking-wider uppercase">
                                  <ShieldCheck className="w-2.5 h-2.5" /> Verified
                                </span>
                              </div>
                              <p className="text-[11px] font-bold text-forge-lime mt-0.5">
                                {m.creatorProfile.role}
                              </p>
                              {m.creatorProfile.tagline && (
                                <p className="text-[10px] text-gray-300 leading-snug mt-1 font-sans">
                                  {m.creatorProfile.tagline}
                                </p>
                              )}
                              <div className="mt-2 flex items-center gap-2">
                                <button 
                                  onClick={() => setSelectedCreatorPhoto(m.creatorProfile?.image || null)}
                                  className="text-[9px] font-mono text-cyan-300 hover:text-white flex items-center gap-1 underline underline-offset-2 cursor-pointer transition-colors"
                                >
                                  <Maximize2 className="w-2.5 h-2.5" />
                                  <span>View Photo</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Contextual Action Button */}
                      {m.suggestedAction && (
                        <button
                          onClick={() => {
                            if (m.suggestedAction?.tabTarget) {
                              onNavigateTab(m.suggestedAction.tabTarget);
                              setIsOpen(false);
                            }
                          }}
                          className="mt-3 px-3 py-1.5 rounded-lg bg-forge-lime text-black font-extrabold uppercase text-[10px] tracking-wider flex items-center gap-1 hover:bg-forge-lime-hover transition-all cursor-pointer shadow-sm"
                        >
                          <span>{m.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {/* Love Reaction Button on Assistant Messages */}
                      {m.sender === 'assistant' && m.text && !isLoading && (
                        <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-charcoal-800/60 text-[10px] text-gray-400">
                          <button
                            onClick={() => toggleLike(m.id)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                              likedMessages[m.id] 
                                ? 'bg-pink-500/20 text-pink-400 font-bold' 
                                : 'hover:bg-charcoal-850 text-gray-400 hover:text-pink-300'
                            }`}
                            title="Show love to BodyBuddy"
                          >
                            <Heart className={`w-3 h-3 ${likedMessages[m.id] ? 'fill-pink-400 text-pink-400' : ''}`} />
                            <span>{likedMessages[m.id] ? 'Loved! ❤️' : 'Love this'}</span>
                          </button>
                          <span className="text-[9px] text-gray-500 font-mono">
                            {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                    </div>

                    {m.sender === 'user' && (
                      <span className="text-[9px] text-gray-600 font-mono mt-1 px-1">
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Friendly Prompt Pills */}
              <div className="px-3 py-2 bg-charcoal-950/60 border-t border-charcoal-850 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {quickPills.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p.query)}
                    className="px-2.5 py-1 rounded-full bg-charcoal-950 border border-charcoal-800 hover:border-forge-lime/60 text-[10px] text-gray-300 whitespace-nowrap transition-all cursor-pointer hover:text-white hover:bg-charcoal-800"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-charcoal-950 border-t border-charcoal-800 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    language === 'hi' 
                      ? 'दोस्त, वर्कआउट या पोषण के बारे में कुछ भी पूछें... 🌟' 
                      : language === 'bn' 
                      ? 'বন্ধু, ওয়ার্কআউট বা সুস্থ জীবন নিয়ে যেকোনো প্রশ্ন করুন... 🌟' 
                      : 'Ask your friendly coach about workouts, food, or anything... 🌟'
                  }
                  className="flex-1 bg-charcoal-900 border border-charcoal-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-forge-lime"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all ${
                    input.trim() && !isLoading
                      ? 'bg-forge-lime text-black hover:bg-forge-lime-hover shadow-forge-glow cursor-pointer'
                      : 'bg-charcoal-800 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-label="Send chat message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Lightbox Modal for Debojyoti's Portrait Photo */}
      {selectedCreatorPhoto && (
        <div 
          onClick={() => setSelectedCreatorPhoto(null)}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-charcoal-900 border border-forge-cyan/60 rounded-3xl p-6 text-center shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            <button 
              onClick={() => setSelectedCreatorPhoto(null)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-charcoal-800 text-gray-400 hover:text-white hover:bg-charcoal-700 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-44 h-44 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_30px_rgba(0,240,255,0.6)] mb-4">
              <img 
                src={selectedCreatorPhoto} 
                alt="Debojyoti Karmakar" 
                className="w-full h-full rounded-full object-cover bg-charcoal-950" 
              />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-forge-cyan/20 border border-forge-cyan/40 text-[10px] font-bold text-forge-cyan tracking-wider uppercase mb-1.5">
              <ShieldCheck className="w-3 h-3" /> Verified Creator
            </div>
            <h3 className="text-xl font-extrabold text-white">Debojyoti Karmakar</h3>
            <p className="text-xs text-forge-lime font-bold mt-0.5">Creator & Developer of BODYFORGE</p>
            <p className="text-xs text-gray-300 mt-2.5 leading-relaxed font-sans">
              Debojyoti created BODYFORGE and BodyBuddy AI to bring accessible bodyweight fitness, smart kinetic motion demonstrations, and positive daily motivation to athletes everywhere! ✨
            </p>
            
            <button
              onClick={() => setSelectedCreatorPhoto(null)}
              className="mt-5 px-4 py-2.5 rounded-xl bg-forge-lime text-black font-extrabold text-xs hover:bg-forge-lime-hover transition-all w-full shadow-forge-glow cursor-pointer"
            >
              Awesome! Let's Workout 💪
            </button>
          </div>
        </div>
      )}
    </>
  );
};
