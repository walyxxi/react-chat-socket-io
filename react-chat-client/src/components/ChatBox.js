import React, { Component } from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import socketIOClient from 'socket.io-client';

export default class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.postChat = this.postChat.bind(this);
    this.deleteChat = this.deleteChat.bind(this);
    this.socket = socketIOClient('http://localhost:3001');
  }

  componentDidMount() {
    this.socket.on('message', data => {
      console.log('New data!', data);
      this.setState({ data })
    })
  }

  postChat(item) {
    this.setState((state) => ({
      data: [...state.data, item]
    }))
    this.socket.emit('addData', item);
  }

  deleteChat(id) {
    this.setState((state) => ({
      data: state.data.filter((item) => item.id !== id)
    }))
    this.socket.emit('deleteData', id);
  }

  render() {
    return (
      <div>
        <div className="container darker text-center">
          <h4><font color="blue"><b>REACT CHAT</b></font></h4>
        </div>
        <hr />
        <ChatList datas={this.state.data} deleteChat={this.deleteChat} />
        <ChatForm postChat={this.postChat} />
      </div>
    )
  }
}