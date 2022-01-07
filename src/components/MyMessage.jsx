import Magnifier from "react-magnifier";

const MyMessage = ({ message }) => {
  if(message?.attachments?.length > 0) {
    return (
      <div style={{ float: 'right' }}>
        <Magnifier
          src={message.attachments[0].file}
          width={400}
        />
      </div>
    )
  }
  return (
    <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#007452' }}>
      {message.text}
    </div>
  )
}

export default MyMessage;
