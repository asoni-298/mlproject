'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'ashish-recruiter-agent-history';

type AgentMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type Slot = {
  startIso: string;
  endIso: string;
  label: string;
};

type CalendarDay = {
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  slots: Slot[];
};

const starterPrompts = [
  'Tell me about yourself',
  'What is your expected CTC?',
  'Can we schedule an interview?',
  'Explain your Agentic RAG project',
];

const recruiterQuickActions = [
  'Share availability',
  'Explain projects',
  'Compensation details',
  'Notice period',
  'Preferred locations',
  'Relevant skills',
];

const initialMessage =
  "Hi, this is Ashish Soni's AI assistant. I can help with initial screening and provide all relevant details. Please feel free to ask your questions.";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toIsoDate(value: string) {
  return value.slice(0, 10);
}

function formatCalendarMonth(value: Date) {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    year: 'numeric',
  }).format(value);
}

function formatCalendarDayLabel(isoDate: string) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${isoDate}T00:00:00`));
}

function buildCalendarDays(slots: Slot[]) {
  const slotMap = new Map<string, Slot[]>();

  for (const slot of slots) {
    const isoDate = toIsoDate(slot.startIso);
    const existing = slotMap.get(isoDate) ?? [];
    existing.push(slot);
    slotMap.set(isoDate, existing);
  }

  const anchor = slots.length > 0 ? new Date(slots[0].startIso) : new Date();
  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(monthStart.getDate() - monthStart.getDay());

  const todayIso = toIsoDate(new Date().toISOString());
  const days: CalendarDay[] = [];

  for (let offset = 0; offset < 35; offset += 1) {
    const current = new Date(calendarStart);
    current.setDate(calendarStart.getDate() + offset);
    const isoDate = toIsoDate(current.toISOString());
    days.push({
      isoDate,
      dayNumber: current.getDate(),
      isCurrentMonth: current.getMonth() === anchor.getMonth(),
      isToday: isoDate === todayIso,
      slots: slotMap.get(isoDate) ?? [],
    });
  }

  return {
    monthLabel: formatCalendarMonth(anchor),
    days,
  };
}

export default function RecruiterAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>([
    { id: 'welcome', role: 'assistant', content: initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [availabilitySource, setAvailabilitySource] = useState<string>('');
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [handoffStatus, setHandoffStatus] = useState<string | null>(null);
  const [submittingHandoff, setSubmittingHandoff] = useState(false);
  const [activeTool, setActiveTool] = useState<'schedule' | 'upload' | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as AgentMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage failures and keep the agent usable.
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      viewportRef.current?.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, loading, isOpen, availability, bookingStatus, handoffStatus]);

  async function submitMessage(messageText: string) {
    if (!messageText.trim() || loading) return;

    const userMessage: AgentMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: messageText.trim(),
    };
    const assistantId = `${Date.now()}-assistant`;
    const nextMessages = [...messages, userMessage];

    setMessages((current) => [...current, userMessage, { id: assistantId, role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      await sleep(420);

      const response = await fetch('/api/recruiter-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to stream recruiter agent response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, content: accumulated } : message,
          ),
        );
      }
    } catch {
      const fallback =
        'The recruiter agent is currently unavailable. It will continue handling screening questions, project explanations, and scheduling once the live response is available again.';
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId ? { ...message, content: fallback } : message,
        ),
      );
      setError('Live recruiter agent unavailable right now.');
    } finally {
      setLoading(false);
    }
  }

  function resetConversation() {
    const resetMessages: AgentMessage[] = [
      { id: 'welcome', role: 'assistant', content: initialMessage },
    ];
    setMessages(resetMessages);
    setError(null);
    setAvailability([]);
    setAvailabilitySource('');
    setSelectedSlot('');
    setSelectedDate('');
    setBookingStatus(null);
    setHandoffStatus(null);
    setJdFile(null);
    setActiveTool(null);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resetMessages));
    } catch {
      // Ignore storage failures.
    }
  }

  async function loadAvailability() {
    setSlotsLoading(true);
    setBookingStatus(null);
    try {
      const response = await fetch('/api/recruiter-agent/availability', { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to load availability');
      const data = (await response.json()) as { source?: string; slots?: Slot[] };
      const nextSlots = data.slots ?? [];
      setAvailability(nextSlots);
      setAvailabilitySource(data.source ?? '');
      if (nextSlots.length > 0) {
        const firstDate = toIsoDate(nextSlots[0].startIso);
        setSelectedDate((current) => current || firstDate);
      }
    } catch {
      setBookingStatus('Unable to load availability right now.');
    } finally {
      setSlotsLoading(false);
    }
  }

  async function bookSelectedSlot() {
    if (!selectedSlot) {
      setBookingStatus('Please choose an available slot first.');
      return;
    }

    setBookingStatus('Booking slot...');

    try {
      const response = await fetch('/api/recruiter-agent/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startIso: selectedSlot,
          recruiterName: 'Recruiter',
          recruiterEmail: 'engr.ashishsoni@gmail.com',
          notes: messages.map((message) => `${message.role}: ${message.content}`).join('\n'),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        booking?: { message?: string };
        emailStatus?: 'sent' | 'failed' | 'disabled';
      };
      if (!response.ok || !data.ok) throw new Error('Unable to book');
      const bookingMessage = data.booking?.message || 'Booking request captured.';
      if (data.emailStatus === 'failed') {
        setBookingStatus(`${bookingMessage} Calendar booking succeeded, but the summary email could not be sent.`);
      } else if (data.emailStatus === 'disabled') {
        setBookingStatus(`${bookingMessage} Calendar booking succeeded without email notification.`);
      } else {
        setBookingStatus(bookingMessage);
      }
      setActiveTool('schedule');
    } catch {
      setBookingStatus('Unable to book the selected slot right now.');
    }
  }

  async function shareConversationWithAshish() {
    setSubmittingHandoff(true);
    setHandoffStatus('Sharing recruiter conversation...');

    try {
      const formData = new FormData();
      formData.append(
        'messages',
        JSON.stringify(messages.map(({ role, content }) => ({ role, content }))),
      );

      if (jdFile) {
        formData.append('jdFile', jdFile);
      }

      const response = await fetch('/api/recruiter-agent/handoff', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as {
        ok?: boolean;
        driveLink?: string;
        emailed?: boolean;
        driveEnabled?: boolean;
        emailConfigured?: boolean;
        driveUploadFailed?: boolean;
        emailFailed?: boolean;
      };
      if (!response.ok || !data.ok) throw new Error('handoff failed');

      if (data.emailed) {
        setHandoffStatus(
          data.driveUploadFailed
            ? 'Conversation summary emailed to Ashish, but the JD upload could not be completed.'
            : data.driveLink
              ? 'Conversation summary emailed to Ashish and the JD link was attached.'
              : 'Conversation summary emailed to Ashish successfully.',
        );
      } else if (data.emailFailed) {
        setHandoffStatus(
          data.driveLink
            ? 'JD uploaded successfully, but the summary email could not be sent right now.'
            : data.driveUploadFailed
              ? 'Summary was prepared, but both the JD upload and email delivery failed right now.'
              : 'Summary was prepared, but the email could not be sent right now.',
        );
      } else if (!data.emailConfigured) {
        setHandoffStatus(
          data.driveUploadFailed
            ? 'Summary prepared, but the JD upload failed and Gmail is not configured yet.'
            : data.driveEnabled || !jdFile
            ? 'Summary prepared, but Gmail is not configured yet. Add Google OAuth credentials to enable email delivery.'
            : 'Summary prepared, but Gmail and Drive are not configured yet. Add Google OAuth credentials to enable delivery.',
        );
      } else {
        setHandoffStatus(
          data.driveUploadFailed
            ? 'Summary was prepared, but the JD upload could not be completed right now.'
            : 'Summary was prepared, but the email could not be sent right now.',
        );
      }
    } catch {
      setHandoffStatus('Unable to share recruiter details right now.');
    } finally {
      setSubmittingHandoff(false);
    }
  }

  function toggleTool(tool: 'schedule' | 'upload') {
    setActiveTool((current) => (current === tool ? null : tool));
  }

  const calendarData = buildCalendarDays(availability);
  const selectedDateSlots = selectedDate
    ? availability.filter((slot) => toIsoDate(slot.startIso) === selectedDate)
    : [];

  return (
    <div className={`recruiter-agent-shell ${isOpen ? 'is-open' : ''}`}>
      {isOpen ? (
        <section className="recruiter-agent-window" aria-label="Recruiter assistant">
          <header className="recruiter-agent-header">
            <div>
              <p className="recruiter-agent-eyebrow">AI Screening Agent</p>
              <h3>Recruiter Assistant</h3>
              <p className="recruiter-agent-subtitle">Powered by Gemini 2.5 Flash-Lite</p>
            </div>
            <div className="recruiter-agent-header-actions">
              <button
                type="button"
                className="recruiter-agent-secondary-control"
                onClick={resetConversation}
                aria-label="Reset recruiter conversation"
              >
                Reset
              </button>
              <button
                type="button"
                className="recruiter-agent-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close recruiter assistant"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7 17 17M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </header>

          <div ref={viewportRef} className="recruiter-agent-messages" aria-live="polite">
            <div className="recruiter-agent-actions">
              {recruiterQuickActions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="recruiter-agent-action"
                  onClick={() => void submitMessage(prompt)}
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`recruiter-agent-message ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}
              >
                <div className="recruiter-agent-bubble">
                  {message.content || (loading && message.role === 'assistant' ? 'Thinking...' : '')}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="recruiter-agent-message is-assistant">
                <div className="recruiter-agent-typing">
                  <span className="recruiter-agent-typing-label">Ashish is reviewing this</span>
                  <span className="recruiter-agent-typing-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : null}

            {messages.length === 1 && !loading ? (
              <div className="recruiter-agent-starters">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="recruiter-agent-starter"
                    onClick={() => void submitMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}

          </div>

          <div className="recruiter-agent-footer">
            <input
              ref={fileInputRef}
              type="file"
              className="recruiter-file-input-hidden"
              onChange={(event) => {
                setJdFile(event.target.files?.[0] ?? null);
                setActiveTool('upload');
              }}
              accept=".pdf,.doc,.docx,.txt"
            />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void submitMessage(input);
              }}
              className="recruiter-agent-form"
            >
              <label htmlFor="recruiter-agent-input" className="sr-only">
                Ask recruiter screening questions
              </label>
              <div className="recruiter-agent-composer">
                <div className="recruiter-agent-composer-shell">
                  <div className="recruiter-agent-input-row">
                    <textarea
                      id="recruiter-agent-input"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask about experience, salary expectations, notice period, or interview scheduling..."
                      className="recruiter-agent-input"
                      rows={3}
                    />
                  </div>
                  <div className="recruiter-agent-footer-row">
                    <div className="recruiter-agent-footer-tools">
                      <button
                        type="button"
                        className={`recruiter-agent-tool-button recruiter-agent-tool-button-schedule ${activeTool === 'schedule' ? 'is-active' : ''}`}
                        onClick={() => {
                          if (!availability.length) {
                            void loadAvailability();
                          }
                          toggleTool('schedule');
                        }}
                        aria-label="Open booking slots"
                        title="Booking slots"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 3.8v2.5M17 3.8v2.5M4.8 9.3h14.4M6.5 6.2h11a1.7 1.7 0 0 1 1.7 1.7v9.4a1.7 1.7 0 0 1-1.7 1.7h-11a1.7 1.7 0 0 1-1.7-1.7V7.9a1.7 1.7 0 0 1 1.7-1.7Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M8.4 13h3.4v3.3H8.4z" fill="currentColor" opacity=".85" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className={`recruiter-agent-tool-button recruiter-agent-tool-button-upload ${activeTool === 'upload' ? 'is-active' : ''}`}
                        onClick={() => toggleTool('upload')}
                        aria-label="Open JD upload"
                        title="JD upload"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 5v9M8.6 8.5 12 5l3.4 3.5M5.5 16.3v1.3A1.9 1.9 0 0 0 7.4 19.5h9.2a1.9 1.9 0 0 0 1.9-1.9v-1.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="recruiter-agent-tool-chip"
                        onClick={() => void submitMessage('I am done with my questions for now.')}
                      >
                        Done for now
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="recruiter-agent-tool-button recruiter-agent-send"
                        aria-label={loading ? 'Sending message' : 'Send message'}
                        title={loading ? 'Sending...' : 'Send'}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4.5 12 18.8 5.6c.7-.3 1.4.4 1.1 1.1L13.5 21c-.4.9-1.8.8-2-.2l-1.1-5.2-5.2-1.1c-1-.2-1.1-1.6-.2-2Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {activeTool === 'schedule' ? (
              <div className="recruiter-tool-popover-shell">
                <section
                  className="recruiter-tool-modal recruiter-inline-tool-panel recruiter-inline-tool-panel-schedule"
                  aria-label="Interview calendar"
                >
                  <div className="recruiter-inline-tool-head">
                    <div>
                      <p className="recruiter-inline-tool-kicker">Booking</p>
                      <h4>Interview Calendar</h4>
                    </div>
                    <button
                      type="button"
                      className="recruiter-inline-tool-close"
                      onClick={() => setActiveTool(null)}
                      aria-label="Close booking tools"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 7 17 17M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="recruiter-inline-tool-actions">
                    <button
                      type="button"
                      className="recruiter-utility-chip"
                      onClick={() => void loadAvailability()}
                    >
                      {slotsLoading ? 'Loading...' : 'Refresh Slots'}
                    </button>
                    {availability.length > 0 ? (
                      <button
                        type="button"
                        className="recruiter-mini-button recruiter-mini-button-primary"
                        onClick={() => void bookSelectedSlot()}
                      >
                        Book Selected Slot
                      </button>
                    ) : null}
                  </div>

                  {availabilitySource ? (
                    <p className="recruiter-utility-caption">
                      {availabilitySource === 'mock'
                        ? 'Mock calendar view with suggested availability.'
                        : 'Live Google Calendar availability is active.'}
                    </p>
                  ) : null}

                  {availability.length > 0 ? (
                    <div className="recruiter-calendar-panel">
                      <div className="recruiter-calendar-header">
                        <h5>{calendarData.monthLabel}</h5>
                        <span>{availability.length} open slots</span>
                      </div>
                      <div className="recruiter-calendar-weekdays" aria-hidden="true">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                      <div className="recruiter-calendar-grid">
                        {calendarData.days.map((day) => (
                          <button
                            key={day.isoDate}
                            type="button"
                            className={[
                              'recruiter-calendar-day',
                              day.isCurrentMonth ? '' : 'is-outside',
                              day.isToday ? 'is-today' : '',
                              day.slots.length > 0 ? 'has-slots' : '',
                              selectedDate === day.isoDate ? 'is-selected' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            onClick={() => {
                              if (day.slots.length > 0) {
                                setSelectedDate(day.isoDate);
                                setSelectedSlot(day.slots[0].startIso);
                              }
                            }}
                            disabled={day.slots.length === 0}
                            aria-label={`${formatCalendarDayLabel(day.isoDate)}${day.slots.length > 0 ? `, ${day.slots.length} available slots` : ', unavailable'}`}
                          >
                            <span>{day.dayNumber}</span>
                            {day.slots.length > 0 ? <i>{day.slots.length}</i> : null}
                          </button>
                        ))}
                      </div>

                      <div className="recruiter-calendar-slots">
                        <div className="recruiter-calendar-slots-head">
                          <h5>{selectedDate ? formatCalendarDayLabel(selectedDate) : 'Select a highlighted day'}</h5>
                          {selectedDateSlots.length > 0 ? <span>{selectedDateSlots.length} available</span> : null}
                        </div>
                        {selectedDateSlots.length > 0 ? (
                          <div className="recruiter-slot-grid recruiter-slot-grid-compact">
                            {selectedDateSlots.map((slot) => (
                              <button
                                key={slot.startIso}
                                type="button"
                                className={`recruiter-slot ${selectedSlot === slot.startIso ? 'is-selected' : ''}`}
                                onClick={() => setSelectedSlot(slot.startIso)}
                              >
                                {slot.label}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="recruiter-utility-caption">
                            Pick a blue-highlighted day to view available interview slots.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {bookingStatus ? <p className="recruiter-tool-status">{bookingStatus}</p> : null}
                </section>
              </div>
            ) : null}

            {activeTool === 'upload' ? (
              <section className="recruiter-inline-tool-panel recruiter-inline-tool-panel-upload">
                <div className="recruiter-inline-tool-head">
                  <div>
                    <p className="recruiter-inline-tool-kicker">Optional</p>
                    <h4>Upload JD</h4>
                  </div>
                  <button
                    type="button"
                    className="recruiter-inline-tool-close"
                    onClick={() => setActiveTool(null)}
                    aria-label="Close JD upload"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 7 17 17M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="recruiter-upload-actions">
                  <button
                    type="button"
                    className="recruiter-upload-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="recruiter-upload-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 4.5v9M8.5 8 12 4.5 15.5 8M5.5 15.5v2A1.5 1.5 0 0 0 7 19h10a1.5 1.5 0 0 0 1.5-1.5v-2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{jdFile ? 'Replace JD File' : 'Choose JD File'}</span>
                  </button>

                  <button
                    type="button"
                    className="recruiter-utility-chip"
                    onClick={() => void shareConversationWithAshish()}
                    disabled={submittingHandoff}
                  >
                    {submittingHandoff ? 'Sharing...' : 'Share Summary with Ashish'}
                  </button>
                </div>

                <p className="recruiter-utility-caption">
                  {jdFile ? `Selected file: ${jdFile.name}` : 'Attach a JD only if the recruiter wants to share one.'}
                </p>
                {handoffStatus ? <p className="recruiter-tool-status">{handoffStatus}</p> : null}
              </section>
            ) : null}

            {error ? <p className="recruiter-agent-error">{error}</p> : null}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="recruiter-agent-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Hide recruiter assistant' : 'Open recruiter assistant'}
      >
        <span className="recruiter-agent-trigger-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.2" />
            <rect x="9.1" y="9.1" width="5.8" height="5.8" rx="1.5" fill="url(#agent-core-gradient)" />
            <path d="M12 3.8v2.2M12 18v2.2M20.2 12H18M6 12H3.8M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9 6.3 6.3" stroke="#38BDF8" strokeWidth="1.35" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1.2" fill="#F8FAFC" />
            <defs>
              <linearGradient id="agent-core-gradient" x1="9.1" y1="9.1" x2="14.9" y2="14.9" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22D3EE" />
                <stop offset=".52" stopColor="#818CF8" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="recruiter-agent-trigger-copy">
          <strong>Recruiter Agent</strong>
          <span>Ask screening questions</span>
        </span>
      </button>
    </div>
  );
}
