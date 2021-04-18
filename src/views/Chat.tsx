import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { UncontrolledTooltip } from 'reactstrap';
import '../assets/scss/component/chat.scss';
import { projectService } from '../services/projects/api';
import { userService } from '../services/user/api';
import socket from '../socketioClient';
import HeadProject from './HeadProject';

const Chat: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [listChat, setListChat] = useState([]);
  const [info, setInfo] = useState({ avatar: '', username: '' });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    socket.on('loadChat', (data) => {
      console.log(data);
      setListChat(data.data.chatList);
    });
    socket.emit('joinRoom', { roomId: projectId });
    projectService
      .getChat({ projectId: projectId })
      .then((res) => {
        setListChat(res.data.data.listChat);
      })
      .catch((err) => {});
    userService
      .getUserInfo()
      .then((res) => {
        console.log(res.data.data);
        setUserId(res.data.data.userId);
        setInfo(res.data.data);
      })
      .catch((err) => {});
  }, []);
  const addChat = (projectId: String, content: String) => {
    projectService
      .addChat({ projectId: projectId, userId: userId, content: content })
      .then((res) => {
        socket.emit('chatting', {
          chatList: res.data.data.listChat,
          roomId: projectId,
        });
        setListChat(res.data.data.listChat);
      })
      .catch((err) => {});
  };
  return (
    <div className="chat">
      <HeadProject projectId={projectId} />
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
          {/* {this.state.mytopics.map((item, key) => (
            <div
              className={
                key === this.state.active
                  ? 'list-user-chat active'
                  : 'list-user-chat'
              }
              //   onClick={() => this.loadChat(key, item.keyTopic)}
            >
              <div className="avatar-chat-group">
                <img
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                  className="avatar-chat-small-first"
                  alt=""
                />
                <img
                  src="https://randomuser.me/api/portraits/men/47.jpg"
                  className="avatar-chat-small-second"
                  alt=""
                />
              </div>
              <div className="name-contentchat">
                <span>{item.name}</span>
              </div>
            </div>
          ))} */}
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
          <div className="list-content-chat">
            {listChat.map((item, index) =>
              item.userId === userId ? (
                <div className="info-current">
                  <img
                    src={item.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id1"
                  />
                  <span>{item.content}</span>
                  <UncontrolledTooltip delay={0} target="user-id1">
                    {item.userName}
                  </UncontrolledTooltip>
                </div>
              ) : (
                <div className="info-current-friend">
                  <span>
                    {item.content}
                    <UncontrolledTooltip delay={0} target="user-id">
                      {item.userName}
                    </UncontrolledTooltip>
                  </span>
                  <img
                    // src="https://randomuser.me/api/portraits/men/42.jpg"
                    src={item.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id"
                  />
                </div>
              ),
            )}
            {/* <div className="info-current">
              <img
                src="https://randomuser.me/api/portraits/men/11.jpg"
                className="avatar-chat"
                alt=""
                id="user-id1"
              />
              <span>hello</span>
              <UncontrolledTooltip delay={0} target="user-id1">
                Hải Đăng
              </UncontrolledTooltip>
            </div> */}
            {/* <div className="info-current-friend">
              <span>
                Hello ad
                <UncontrolledTooltip delay={0} target="user-id">
                  Ryan Tompson
                </UncontrolledTooltip>
              </span>
              <img
                // src="https://randomuser.me/api/portraits/men/42.jpg"
                src="https://randomuser.me/api/portraits/men/13.jpg"
                className="avatar-chat"
                alt=""
                id="user-id"
              />
            </div> */}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
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
                    addChat(projectId, content.value);
                    content.value = '';
                  }
                };
              }}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-paper-plane" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
