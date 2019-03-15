import React, {Component} from 'react';

/* Message component which displays messages and notification */
class Message extends Component {
  render(){
    let divElement = null;
    if(this.props.message.type === "incomingNotification"){
      divElement = (
        <div className="notification">
          <span className="notification-content">{this.props.message.content}</span>
        </div>
      );
    } else {
      divElement = (
        <div className="message">
          <span className="message-username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    }
  return(
    <div>{divElement}</div>
  );
  }
}
export default Message;