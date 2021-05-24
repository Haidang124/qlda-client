import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
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
      let div = document.getElementById("list-content-chat");
      div.scrollTop = div.scrollHeight;
    });
    socket.emit('joinRoom', { roomId: projectId });
    projectService
      .getChat({ projectId: projectId })
      .then((res) => {
        setListChat(res.data.data.listChat);
        let div = document.getElementById("list-content-chat");
        div.scrollTop = div.scrollHeight;
      })
      .catch((err) => {});
    userService
      .getUserInfo()
      .then((res) => {
        console.log(res.data.data);
        setUserId(res.data.data.userId);
        setInfo(res.data.data);
      })
      .catch((err) => {
        toast.error("Không thể tải dữ liệu!");
      });
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
            {listChat.map((item, index) =>
              item.userId === userId ? (
                <div className="info-current">
                  <span>{item.content}</span>
                  <UncontrolledTooltip delay={0} target="user-id1">
                    {item.userName}
                  </UncontrolledTooltip>
                  <img
                    src={item.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id1"
                  />
                </div>
              ) : (
                <div className="info-current-friend">
                  <img
                    // src="https://randomuser.me/api/portraits/men/42.jpg"
                    src={item.avatar}
                    className="avatar-chat"
                    alt=""
                    id="user-id"
                  />
                  <UncontrolledTooltip delay={0} target="user-id">
                      {item.userName}
                  </UncontrolledTooltip>
                  <span>
                    {item.content}
                  </span>
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
                    addChat(projectId, content.value);
                    content.value = '';
                  }
                };
              }}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" 
                onClick={(event) => {
                    let content = document.getElementById(
                      'input-message',
                    ) as HTMLInputElement;
                    addChat(projectId, content.value);
                    content.value = '';
                }}>
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
