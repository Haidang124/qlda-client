/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UncontrolledTooltip } from 'reactstrap';
import '../../../assets/scss/component/chat.scss';
import { chatService } from '../../../services/chat/api';
import { userService } from '../../../services/user/api';
import socket from '../../../socketioClient';

const Chat: React.FC = () => {
  const [targetId, setTargetId] = useState(null);
  const [roomSocket, setRoomSocket] = useState(null);
  const [listContent, setlistContent] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [listChat, setlistChat] = useState([]);
  const [info, setInfo] = useState({ avatar: '', username: '' });
  const [userId, setUserId] = useState(null);
  const hashCode = (string) => {
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };
  useEffect(() => {
    socket.on('loadChat', (data) => {
      setlistContent(data.data.chatList);
      let div = document.getElementById('list-content-chat');
      div.scrollTop = div.scrollHeight;
    });
    console.log(socket);
    console.log(roomSocket);
    socket.emit('joinRoom', { roomId: roomSocket });
    chatService
      .getChat({ projectId: targetId })
      .then((res) => {
        setlistContent(res.data.data);
        let div = document.getElementById('list-content-chat');
        div.scrollTop = div.scrollHeight;
      })
      .catch((err) => { });
    userService
      .getUserInfo()
      .then((res) => {
        setUserId(res.data.data.userId);
        setInfo(res.data.data);
      })
      .catch((err) => {
        toast.error('Không thể tải dữ liệu!');
      });
  }, [targetId]);
  useEffect(() => {
    chatService
      .getListChat()
      .then((res) => {
        let data = res.data.data;
        let array = data.projectChat;
        data.friendChat.forEach(element => {
          element.type = 'chatUser'
          array.push(element)
        });
        setlistChat(array);
        setTargetId(array[0]._id)
      })
      .catch(() => { });
  }, [userId]);
  const addChat = (content: String) => {
    chatService
      .addChat({ projectId: targetId, friendId: targetId, userId: userId, content: content })
      .then((res) => {
        setlistContent(res.data.data);
        socket.emit('chatting', {
          chatList: res.data.data,
          roomId: roomSocket,
        });
      })
      .catch((err) => { });
  };
  return (
    <div className="chat pt-5 pt-md-8">
      {/* <WrapperProject> */}
      <div className="chat-container">
        <div className="list-chat">
          <div className="info-user-chat">
            <img src={info.avatar} className="avatar-chat" alt="" />
            <span>{info.username}</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" aria-hidden="true" />
              </button>
            </div>
          </div>
          {listChat.map((item, index) => (
            <div
              className={
                index === activeIndex
                  ? 'list-user-chat active'
                  : 'list-user-chat'
              }
              // onClick={() => this.loadChat(key, item.keyTopic)}
              onClick={() => {
                if (item.type) {
                  setRoomSocket(hashCode(item._id) + hashCode(userId))
                }
                else {
                  setRoomSocket(item._id);
                }
                setTargetId(item._id);
                setActiveIndex(index);
              }}>
              <div className="avatar-chat-group d-flex justify-content-center align-items-center">
                <img
                  src={
                    item.avatar
                  }
                  className="avatar-chat-small-first"
                  alt=""
                />
              </div>
              <div className="name-contentchat">
                <span>{item.name ? item.name : item.username}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="content-chat">
          <div className="info-current-chat">
            <div className="info-current-left">
              <img
                src="https://randomuser.me/api/portraits/women/12.jpg"
                className="avatar-chat"
                alt=""
              />
              <img
                src="https://randomuser.me/api/portraits/men/4.jpg"
                className="avatar-chat"
                alt=""
              />
              <img
                src="https://randomuser.me/api/portraits/men/42.jpg"
                className="avatar-chat"
                alt=""
              />
            </div>
            <div className="social-media">
              <i className="fab fa-facebook-f" />
              <i className="fa fa-twitter" />
              <i className="fab fa-google" />
            </div>
          </div>
          <div className="list-content-chat" id="list-content-chat">
            {listContent.map((item) =>
              item.userId._id === userId ? (
                <div className="info-current">
                  <span>{item.content}</span>
                  <UncontrolledTooltip delay={0} target="user-id1">
                    {item.userId.username}
                  </UncontrolledTooltip>
                  <img
                    src={item.userId.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id1"
                  />
                </div>
              ) : (
                <div className="info-current-friend">
                  <img
                    // src="https://randomuser.me/api/portraits/men/42.jpg"
                    src={item.userId.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id"
                  />
                  <UncontrolledTooltip delay={0} target="user-id">
                    {item.userId.username}
                  </UncontrolledTooltip>
                  <span>{item.content}</span>
                </div>
              ),
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-white border-1 small text-dark"
              placeholder="Type a message..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              id="input-message"
              onChange={(event) => {
                event.target.onkeyup = (key) => {
                  let content = document.getElementById(
                    'input-message',
                  ) as HTMLInputElement;
                  if (key.keyCode === 13) {
                    addChat(content.value);
                    content.value = '';
                  }
                };
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(event) => {
                  let content = document.getElementById(
                    'input-message',
                  ) as HTMLInputElement;
                  addChat(content.value);
                  content.value = '';
                }}>
                <i className="fa fa-paper-plane" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </WrapperProject> */}
    </div>
  );
};

export default Chat;
