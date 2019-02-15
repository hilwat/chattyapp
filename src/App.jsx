import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

export default class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id:1,
          type:"incomingMessage"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id:2,
          type:"incomingMessage"
        }
      ]
    }
  }

  sendMessage = (event) => {
	if(event.key === 'Enter') {
	  this.socket.send(JSON.stringify({ 
			username: this.state.currentUser.name, 
			content: event.target.value,
			type:"incomingMessage"
		}
		));
	  event.target.value = "";
	}
  }
  
  updateUsername = (event) => {
	if (event.key === 'Enter') {
	this.socket.send(JSON.stringify({ 
		username: event.target.value, 
		previousname: this.state.currentUser.name,
		type:"incomingNotification"
		}
	  ));
  	}
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type:"incomingMessage"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    this.socket = new WebSocket('ws://localhost:3001')
	
	this.socket.onopen = () => {
      console.log('Connected 3001');
    }
	
	this.socket.onmessage = (event) => {
		let data = JSON.parse(event.data)
		console.log(data)
      switch(data.type) {
		case "incomingMessage":
			var currentMessages = this.state.messages;
		    currentMessages.push(data);
		    this.setState({ 
		      messages: currentMessages
		    });
          	break;
        case "incomingNotification":
			var currentMessages = this.state.messages;
			currentMessages.push(data);
			this.setState({ 
		  		messages: currentMessages, currentUser: { name: data.username }
			});
			
          break;
        default:
        	// show an error in the console if the message type is unknown
        	throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
      return (
     <div>
       <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar username={this.state.currentUser.name} sendMessage={this.sendMessage} updateUsername={this.updateUsername}/>
     </div>
      );
  }
}


