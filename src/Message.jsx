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
            <div className="notification">
            <span className="notification-content">{this.props.message.previousname} changed their name to {this.props.message.username}</span>
            </div>
            )
        }
    }
}

    export default Message;