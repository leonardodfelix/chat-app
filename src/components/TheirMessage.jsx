import Magnifier from "react-magnifier";

const TheirMessage = ({ lastMessage, message }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{backgroundImage: `url(${message?.sender?.avatar})`}}
        />
      )}
      {message?.attachments?.length > 0
        ? (
          <div style={{ float: 'left' }}>
        <Magnifier
          src={message.attachments[0].file}
          width={400}
        />
      </div>
          ) : (
            <div className="message" style={{ float: 'left', backgroundColor: '#00D18B', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
              {message.text}
            </div>
          ) 
      }
    </div>
  )
}

export default TheirMessage;
