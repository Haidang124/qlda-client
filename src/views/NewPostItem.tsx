import React, { useState } from 'react';
import {
  Input
} from 'reactstrap';
import '../assets/css/NewPostItem.css';
import ModalCreatePost from '../modals/ModalCreatePost';

const NewPostItem: React.FC<any> = (props: any) => {
  // props: author {name, avatar}
  let [showModal, setShowModal] = useState(false);
  return (
    <div>
    <ModalCreatePost
      show = {showModal}
      author = {props.author}
      contentDefault = {props.author.name+", bạn muốn đăng gì?"}
      funcQuit = {() => {setShowModal(false);}}
      funcCreatePost = {(content)=>{props.funcCreatePost(content);}}
    ></ModalCreatePost>
    <div className="post">
      <div className="d-flex flex-row bd-highlight mb-2">
        <div className="p-2 bd-highlight w-15 p-3">
          <div className="post-header">
            <img className="avatar" src={props.author.avatar} alt="" />
          </div>
        </div>
        <div className="p-2 bd-highlight w-100 p-3 mt-1">
          <Input
            id='inputShow'
            onClick={() => {setShowModal(true);}}
            readOnly={true}
            value = {props.author.name + ", bạn muốn đăng gì?"}
          ></Input>
        </div>
      </div>
    </div>
    </div>
  );
}

export default NewPostItem;
