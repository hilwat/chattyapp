import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

export default class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id:1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id:2
        }
      ]
    }
  }

getMessage=(event) => {
  if(event.key ==='Enter'){
    var oldMessages = this.state.messages
    oldMessages.push( 
      {
      username: this.state.currentUser.name,
      content: event.target.value,
      id: Math.random()
      })
    this.setState({ 
      messages: oldMessages
    })
    event.target.value = ""
  }
}



  // Called after the component was rendered and it was attached to the
  // DOM. This is a good place to make AJAX requests or setTimeout.
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  // Called any time the props or state changes. The JSX elements
  // returned in this method will be rendered to the DOM.
  render() {
      return (
     <div>
       <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar name={this.state.currentUser.name} input={this.getMessage}/>
     </div>
      );
  }
}


