import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// Functionaly component to Show TopBar
// Contains logo and number of users online.
function TopBar(props){
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="navbar-userCount">{props.userCount} users online</span>
    </nav>
  );
}

// Main Chatty App component
// Integrates all child component Nav, MessageList and Footer Char Bar
class App extends Component {

  // Constructor which initiates the States
  // and socket connection for messaging.
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // Stores current user who is chatting.
      messages: [], // Contains list of messages.
      userCount: 0 // Total users count online broatcasted by WS Server.
    };
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }
  }

  render() {
    /* Function to Send message to Server */
    const addMessage = message => {
      this.socket.send(JSON.stringify(message));
    };

    /* Function to Set Username when client changes it */
    const setUserName = username => {
      if(this.state.currentUser.name){
        this.socket.send(JSON.stringify({
          type: "postNotification",
          content: `${this.state.currentUser.name} has changed their name to ${username}.`
        }));
      }
      this.setState({currentUser: {name: username}});
    };

    /* On Message Event listener - Get called everytime there is a message from Server */
    this.socket.onmessage = (event) =>{
      const message = JSON.parse(event.data);
      if(message.type == "userCountMessage"){
        console.log(message);
        this.setState({userCount: message.count});
      } else {
        let messages = this.state.messages;
        messages = messages.concat([
        {
          id: message.id,
          username: message.username,
          content: message.content,
          type: message.type,
          color: message.color
        }
      ]);
      this.setState({messages});
    };
  }
      
    return (
    <div>
      <TopBar userCount={this.state.userCount}/>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={addMessage} setUserName={setUserName}/>
    </div>
    );
  }
}
export default App;
