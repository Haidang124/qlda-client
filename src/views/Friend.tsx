/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import '../assets/scss/component/friend.scss';
import { projectService } from '../services/projects/api';

const Friend: React.FC<any> = (props) => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    projectService.getUserJoin({projectId: props.projectId})
    .then((res) => {
      setListUser(res.data.data.listUser);
      // console.log(projectId);
    }).catch((err) => {
      
    });
  },[]);
  function MemberStatus ({username, avatar, status}) {  //status: online || offline
    return (
      <div className="member">
        <img
          src={avatar == "" ? "https://api.hoclieu.vn/images/game/bbfb3597f173af631cb24f6ee0f8b8da.png" : avatar}
          className="avatar-member"
          alt=""
        />
        <span className="name-member">{username}</span>
        <div className={status}></div>
      </div>
    )
  }
  return (
    <div className="friend">
      <div className="members">
        <span className="title">Member</span>
        {listUser.map((value, i) => {
          return <MemberStatus username={value.username} avatar={value.avatar} status={props.listOnline.indexOf(value.userId) != -1?"online":"offline"} ></MemberStatus>
        })}
        {/* <div className="more">
          <a href="/">Xem thêm</a>
        </div> */}
      </div>
    </div>
  );
};
export default Friend;
