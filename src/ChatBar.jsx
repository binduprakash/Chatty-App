import React, {Component} from 'react';

/* ChatBar component which display and controls Chat Bar 
 and calls function to send message to parent component */
class ChatBar extends Component {
  render() {

    /* on Message key press event to listen what user is typing */
    const onKeyPressfn = event => {
      if(event.key === "Enter"){
        const messageText = event.target.value;
        if(messageText){
          this.props.addMessage ({
            content: messageText,
            username: this.props.currentUser.name,
            type: "postMessage"
          });
          event.target.value = '';
        }
      }
    };

    /* on User name key press to listen for user name change */
    const onUserNameKeyPressfn = event =>{
      if(event.key === "Enter"){
        const userName = event.target.value;
        if(userName !== this.props.currentUser.name){
          if(userName){
            this.props.setUserName(userName);
          } else {
            this.props.setUserName("Anonymous");
          }
        }
      }
    };
    return(
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Username (Optional)" onKeyPress={onUserNameKeyPressfn}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPressfn} />
    </footer>);
  }
}
export default ChatBar;