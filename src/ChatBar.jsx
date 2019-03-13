import React, {Component} from 'react';
class ChatBar extends Component {
  render() {
    const onKeyPressfn = event =>{
      if(event.key === "Enter"){
        const messageText = event.target.value;
        if(messageText){
          this.props.addMessage ({
            content: messageText,
            username: this.props.currentUser.name
          });
        }
      }

    };
    const currentUser = this.props.currentUser.name || "Anonymous"
    return(
    <footer className="chatbar">
      <input className="chatbar-username" placeholder={currentUser}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPressfn} />
    </footer>);
  }
}
export default ChatBar;