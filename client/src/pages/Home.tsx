import { FormEvent, useMemo, useState } from "react";
import { ArrowUp, Check, Copy, Globe2, Heart, Menu, MessageCircle, Mic, MoreHorizontal, Paperclip, ShieldCheck, Sparkles, ThumbsUp } from "lucide-react";

type Role = "assistant" | "user";
type ChatMessage = { id: string; role: Role; content: string; time: string };

const suggestions = [
  "Explique-moi quelque chose simplement",
  "Aide-moi à organiser ma journée",
  "Miresaha amiko amin'ny teny Malagasy",
];

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Bonjour, je suis Tsihoharana. Je suis là pour réfléchir avec toi, t’expliquer les choses simplement et discuter sans jugement. Qu’est-ce que tu aimerais faire aujourd’hui ?",
  time: "maintenant",
};

function MadagascarMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`flag-mark ${small ? "flag-mark-small" : ""}`} aria-label="Drapeau de Madagascar">
      <span className="flag-white" />
      <span className="flag-red" />
      <span className="flag-green" />
      <MessageCircle className="flag-chat" aria-hidden="true" />
    </span>
  );
}

function formatTime() {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const visibleMessages = useMemo(() => messages.slice(-16), [messages]);

  async function sendMessage(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || sending) return;
    setInput("");
    setError("");
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text, time: formatTime() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.filter(message => message.id !== "welcome" || message.role === "assistant").map(({ role, content }) => ({ role, content })),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Tsihoharana n’a pas pu répondre.");
      const answer = typeof payload.content === "string" && payload.content.trim() ? payload.content.trim() : "Je n’ai pas reçu de réponse exploitable. Peux-tu réessayer ?";
      setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", content: answer, time: formatTime() }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Une erreur est survenue.");
      setInput(text);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  async function copyMessage(message: ChatMessage) {
    await navigator.clipboard?.writeText(message.content);
    setCopied(message.id);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <main className="app-shell">
      <aside className="side-rail">
        <div className="brand-lockup">
          <MadagascarMark />
          <div>
            <p className="eyebrow">Présence amie</p>
            <h1>Tsihoharana</h1>
          </div>
        </div>

        <div className="rail-rule" />
        <div className="rail-intro">
          <p className="eyebrow">Une conversation à la fois</p>
          <p>Une assistante pensée pour écouter, expliquer et avancer avec toi.</p>
        </div>

        <nav className="rail-nav" aria-label="Informations">
          <a className="nav-item nav-item-active" href="#conversation"><MessageCircle size={17} /> Conversation</a>
          <a className="nav-item" href="#confidentialite"><ShieldCheck size={17} /> Respect & confidentialité</a>
          <a className="nav-item" href="#apropos"><Globe2 size={17} /> À propos</a>
        </nav>

        <div className="rail-bottom">
          <div className="online-dot"><span /> IA prête à discuter</div>
          <p>Modèle open source configurable<br />Réponses générées côté serveur</p>
        </div>
      </aside>

      <section className="conversation-panel" id="conversation">
        <header className="conversation-header">
          <button className="icon-button mobile-menu" aria-label="Ouvrir le menu"><Menu size={20} /></button>
          <div className="assistant-presence">
            <div className="avatar-wrap"><MadagascarMark small /><span className="presence-dot" /></div>
            <div>
              <div className="assistant-name">Tsihoharana <span className="verified"><Check size={11} /></span></div>
              <p>Assistant malgache · en ligne</p>
            </div>
          </div>
          <button className="icon-button" aria-label="Plus d’options"><MoreHorizontal size={21} /></button>
        </header>

        <div className="thread" aria-live="polite">
          <div className="thread-date"><span /> Aujourd’hui <span /></div>
          <div className="welcome-note"><Sparkles size={15} /> Une présence attentive, sans jugement.</div>

          {visibleMessages.map(message => (
            <article key={message.id} className={`message-row ${message.role === "user" ? "message-row-user" : ""}`}>
              {message.role === "assistant" && <div className="mini-avatar"><MadagascarMark small /></div>}
              <div className="message-column">
                <div className={`message-bubble ${message.role === "user" ? "message-bubble-user" : "message-bubble-assistant"}`}>
                  <p>{message.content}</p>
                </div>
                <div className={`message-meta ${message.role === "user" ? "message-meta-user" : ""}`}>
                  <span>{message.time}</span>
                  {message.role === "assistant" && (
                    <>
                      <button onClick={() => void copyMessage(message)} aria-label="Copier la réponse">{copied === message.id ? <Check size={13} /> : <Copy size={13} />}</button>
                      <button aria-label="Aimer la réponse"><ThumbsUp size={13} /></button>
                    </>
                  )}
                  {message.role === "user" && <Check size={13} className="read-mark" />}
                </div>
              </div>
            </article>
          ))}

          {sending && (
            <article className="message-row">
              <div className="mini-avatar"><MadagascarMark small /></div>
              <div className="message-column">
                <div className="message-bubble message-bubble-assistant thinking-bubble"><span /><span /><span /></div>
                <div className="message-meta"><span>Tsihoharana réfléchit…</span></div>
              </div>
            </article>
          )}
        </div>

        <div className="composer-area">
          {!messages.some(message => message.role === "user") && (
            <div className="suggestions" aria-label="Suggestions">
              {suggestions.map(suggestion => <button key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>)}
            </div>
          )}
          {error && <div className="error-note" role="alert">{error}</div>}
          <form className="composer" onSubmit={submit}>
            <button type="button" className="composer-icon" aria-label="Joindre un fichier"><Paperclip size={18} /></button>
            <input value={input} onChange={event => setInput(event.target.value)} placeholder="Écris ton message à Tsihoharana…" aria-label="Votre message" maxLength={4000} />
            <button type="button" className="composer-icon mic-button" aria-label="Message vocal"><Mic size={18} /></button>
            <button type="submit" className="send-button" disabled={!input.trim() || sending} aria-label="Envoyer"><ArrowUp size={19} /></button>
          </form>
          <p className="composer-hint"><Heart size={12} /> Tsihoharana peut se tromper. Pour une décision importante, vérifie toujours l’information.</p>
        </div>
      </section>

      <footer className="mobile-footer" id="apropos">
        <span>TSIHOHARANA</span><span>Une IA qui parle avec le cœur.</span>
      </footer>
    </main>
  );
}
