import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../assets/scss/component/postlist.scss';
import { postService } from '../services/posts/api';
import { projectService } from '../services/projects/api';
import { userService } from '../services/user/api';
import socket from '../socketioClient';
import Friend from './Friend';
import HeadProject from './HeadProject';
import NewPostItem from './NewPostItem';
import PostItem from './PostItem';

const PostList: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [security, setSecurity] = useState(null);
  useEffect(() => {
    socket.emit('joinRoom', { roomId: projectId });
  }, []);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState({
    role: '',
    avatar: '',
    language: '',
    email: '',
    username: '',
    birthday: '',
  });

  const addPost = (content) => {
    postService
      .addPost({
        projectId: projectId,
        content: content,
      })
      .then(async (res) => {
        toast.success('Đẫ tạo post mới thành công');
          socket.emit('createdPost', { postList: res.data.data.post, roomId: projectId });
          // getListPost();
          // await getListPost().then(() => {
          //   socket.emit('createdPost', { postList: postList, roomId: projectId });
          //   console.log(postList);
          // }
          // );
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  // useEffect(() => {
  //   socket.emit('createdPost', { postList: postList, roomId: projectId });
  // }, [postList]);
  const getListPost = async () => {
    projectService
      .getPosts({
        projectId: projectId,
      })
      .then((response) => {
        setPostList(response.data.data.postList);
        setSecurity(true);
      }).catch((err) => {
        if(err.response.data.error == "ErrorSecurity") {
          window.location.href = "./error404";
        }
      });
    userService
      .getUserInfo()
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((err) => {
        toast.error('Không xác định được user!');
      });
  };
  useEffect(() => {
    getListPost();
    socket.on('loadPost', (data) => {
      setPostList(data.data.postList);
    });
  }, []);
  if(security == null) {
    return (
      <></>
    );
  }
  else if(security == true) {
    return (
      <div className="post-list header d-flex flex-column m-0 pb-2 ">
        <HeadProject projectId={projectId} />
        {/* <Button color="info" onClick={addPost}>
          Post
        </Button> */}
        <div className="d-flex flex-row justify-content-center">
          <div>
            <NewPostItem
              author={{ name: user.username, avatar: user.avatar }}
              funcCreatePost = {(content)=>{addPost(content);}}
              ></NewPostItem>
            {postList.map((post, index) => (
              <PostItem key={index} {...post} />
            ))}
          </div>
          <Friend projectId={projectId}/>
        </div>
      </div>
    );
  }
};
export default PostList;
