import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

function TopBar(){
  return(
    <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    </nav>);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }
  }

  render() {
    const addMessage = message => {
      this.socket.send(JSON.stringify(message));
    };
    const setUserName = username => {
      if(this.state.currentUser.name){
        this.socket.send(JSON.stringify({
          type: "postNotification",
          content: `${this.state.currentUser.name} has changed their name to ${username}.`
        }));
      }
      this.setState({currentUser: {name: username}});
      
    };
    this.socket.onmessage = (event) =>{
      const message = JSON.parse(event.data);
      let messages = this.state.messages;
      messages = messages.concat([
        {
          id: message.id,
          username: message.username,
          content: message.content,
          type: message.type
        }
      ]);
      this.setState({messages});
    };
    return (
    <div>
      <TopBar/>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={addMessage} setUserName={setUserName}/>
    </div>
    );
  }
}
export default App;
