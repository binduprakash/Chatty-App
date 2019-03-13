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
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }

      ]
    };
  }


  render() {
    const addMessage = message => {
      let messages = this.state.messages;
      messages = messages.concat([
        {
          id: messages.length + 1,
          username: message.username,
          content: message.content
        }
      ]);
      this.setState({messages});
    };
    return (
    <div>
      <TopBar/>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={addMessage}/>
    </div>
    );
  }
}
export default App;
