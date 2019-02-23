import React, {Component} from 'react';
import Message from "./Message.jsx";

  /* this executes message jsx against the messages */

class MessageList extends Component {
  render() {
    return (
    <main className="messages">
        <div className="message system">
            Anonymous1 changed their name to nomnom.
        </div>
        {this.props.messages.map((msg) => <Message message={msg} key={msg.id}/> )}
    </main>
    )
  }
}

export default MessageList;
