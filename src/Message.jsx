import React from 'react';

/* Message function component which displays messages and notification */
function Message(props) {
  let divElement = null;
  if(props.message.type === "incomingNotification"){
    divElement = (
      <div className="notification">
        <span className="notification-content">{props.message.content}</span>
      </div>
    );
  } else {
    divElement = (
      <div className="message">
        <span className="message-username" style={{color: props.message.color}}>{props.message.username}</span>
        <span className="message-content">{props.message.content}</span>
      </div>
    );
  }
  return(
    <div>{divElement}</div>
  );
}
export default Message;