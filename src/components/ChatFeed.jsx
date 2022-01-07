import { useEffect, useState } from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
  import TheirMessage from './TheirMessage';
  import { useSpeechSynthesis } from 'react-speech-kit';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const { speak, voices } = useSpeechSynthesis();
  const [lastMessage, setLastMessage] = useState('sem mensagens');
  
  useEffect(() => {
    const entries = Object.keys(messages).length === 0 ? [['',{text:'sem mensagens'}]] : Object.entries(messages);
    const { text } = entries[entries.length - 1][1];
    if (text !== lastMessage) {
      setLastMessage(text);
      speak({text, voice: voices[14]});
    }
  }, [lastMessage, messages, speak, voices]);

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map((person, index) => person.last_read === message.id && (
      <div
        key={`read_${index}`}
        className="read-receipt"
        style={{
          float: isMyMessage ? 'right' : 'left',
          backgroundImage: `url(${person?.person?.avatar})` 
        }}
      />
    ))
  }

  const renderMessages = () => {
    const keys = Object.keys(messages);
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {
              isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
            }
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      )
    })
  }

  if(!chat) return 'Loading...';

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }}/>
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  )
}

export default ChatFeed;