import "./chat-message.css";

function ChatMessage({ message, userName, date }) {
  return (
    <div className="chat-message">
      <span className="chat-message__name">{userName}</span>
      <span className="chat-message__date">{date}</span>
      <span>{message}</span>
    </div>
  );
}

export default ChatMessage;
