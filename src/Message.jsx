import React, {Component} from 'react';

/* renders single message -> by params  */
class Message extends Component {
    render() {
        switch(this.props.message.type){
        case "incomingMessage":
        return (
        <div className="Message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>
        )
        case "incomingNotification":
        return (
            <div class="notification">
            <span class="notification-content">Anonymous1 changed their name to {this.props.message.username}</span>
            </div>
            )
        }
    }
}

    export default Message;