import React, {Component} from 'react';


class ChatBar extends Component {

  render() {
      return (
  <footer className="chatbar">
  <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username} onKeyPress={this.props.updateUsername}/>
  <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.sendMessage}/>
</footer>
      )
  }
}


export default ChatBar;

