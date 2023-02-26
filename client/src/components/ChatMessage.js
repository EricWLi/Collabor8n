function ChatMessage({ name, message }) {
  return (
    <div className="chat-msg">
      <div className="name">{name}</div>
      <div className="message">{message}</div>
    </div>
  );
}

export default ChatMessage;