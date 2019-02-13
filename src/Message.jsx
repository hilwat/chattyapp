import React, {Component} from 'react';

/* renders single message -> by params  */
class Message extends Component {
    render() {
        return (
        <div className="Message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>
        )
        }
    }

    export default Message;