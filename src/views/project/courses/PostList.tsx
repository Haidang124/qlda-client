import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import '../../../assets/scss/component/postlist.scss';
import { postService } from '../../../services/posts/api';
import { projectService } from '../../../services/projects/api';
import { userService } from '../../../services/user/api';
import socket from '../../../socketioClient';
import Friend from '../member/Friend';
import WrapperProject from '../WrapperProject';
import CreatePost from './CreatePost';
import PostItem from './PostItem';
const PostList: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
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
      })
      .catch((err) => {
        if (err.response.data.error === 'ErrorSecurity') {
          window.location.href = './error404';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="post-list header d-flex flex-column m-0 pb-2 px-4">
      <WrapperProject>
        <div className="d-flex flex-row justify-content-center">
          <div className="col-8 mx-2">
            <CreatePost
              author={{ name: user.username, avatar: user.avatar }}
              funcCreatePost={(content) => {
                addPost(content);
              }}
            />
            {postList.map((post, index) => (
              <PostItem key={index} {...post} userId={user.userId} />
            ))}
          </div>
          <Friend projectId={projectId} listOnline={listOnline} />
        </div>
      </WrapperProject>
    </div>
  );
};
export default PostList;
