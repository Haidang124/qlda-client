import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
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
  const [listOnline, setListOnline] = useState([]);
  useEffect(() => {
    socket.emit('joinRoom', { roomId: projectId });
    socket.emit('loadUserOnline');
    socket.on('reloadUserOnline', (data) => {
      setListOnline(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState({
    userId: '',
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
        socket.emit('createdPost', {
          postList: res.data.data.post,
          roomId: projectId,
        });
      })
      .catch((err) => {
        toast.error('Lỗi không đăng được bài!');
      });
  };
  const getListPost = async () => {
    projectService
      .getPosts({
        projectId: projectId,
      })
      .then((response) => {
        setPostList(response.data.data.postList);
        setSecurity(true);
      })
      .catch((err) => {
        if (err.response.data.error === 'ErrorSecurity') {
          window.location.href = './error404';
        }
      })
      .catch((err) => {
        setSecurity(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (security === null) {
    return <></>;
  } else if (security === true) {
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
              funcCreatePost={(content) => {
                addPost(content);
              }}></NewPostItem>
            {postList.map((post, index) => (
              <PostItem key={index} {...post} userId={user.userId} />
            ))}
          </div>
          <Friend projectId={projectId} listOnline={listOnline} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="post-list header d-flex flex-column m-0 pb-2 ">
        <HeadProject projectId={projectId} />
        {/* <Button color="info" onClick={addPost}>
          Post
        </Button> */}
        <div className="d-flex flex-row justify-content-center">
          <span style={{ color: 'red' }}>Bạn không có quyền truy cập</span>
        </div>
      </div>
    );
  }
};
export default PostList;
