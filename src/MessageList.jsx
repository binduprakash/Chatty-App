import React from 'react';
import Message from './Message.jsx';

/* MessageList functional component which displays list of Message */
function MessageList(props) {
  const messageList = props.messages.map((message) => {
    return(<Message message={message} key={message.id}/>);
  });
  return (
    <main className="messages">
      {messageList}
    </main>
  );
}
export default MessageList;