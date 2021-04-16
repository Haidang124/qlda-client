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
        console.log(response.data.data.postList);
        setSecurity(true);
      }).catch((err) => {
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
  }, []);
  if(security == null) {
    return (
      <div className="post-list header d-flex flex-column m-0 pb-2 ">
        <HeadProject projectId={projectId} />
      </div>
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
          <Friend />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="post-list header d-flex flex-column m-0 pb-2 ">
        <HeadProject projectId={projectId} />
        {/* <Button color="info" onClick={addPost}>
          Post
        </Button> */}
        <div className="d-flex flex-row justify-content-center">
          <span style = {{color: "red"}}>Bạn không có quyền truy cập</span>
        </div>
      </div>
    )
  }
};
export default PostList;
// let data1 = {
//   posts: [
//     {
//       author: {
//         name: 'Vanessa Romero',
//         avatar: 'https://i.pravatar.cc/150?img=1',
//       },
//       date: '04 Jun 2019',
//       content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
//       comments: [
//         {
//           author: {
//             name: 'Clara Lisboa',
//             avatar: 'https://i.pravatar.cc/150?img=5',
//           },
//           date: '04 Jun 2019',
//           content:
//             'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!',
//         },
//       ],
//     },
//     {
//       author: {
//         name: 'Neil Cook',
//         avatar: 'https://i.pravatar.cc/150?img=8',
//       },
//       date: '04 Jun 2019',
//       content:
//         'Fala galera, beleza?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
//       comments: [
//         {
//           id: 4,
//           author: {
//             name: 'Clara Lisboa',
//             avatar: 'https://i.pravatar.cc/150?img=5',
//           },
//           date: '04 Jun 2019',
//           content:
//             'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!',
//         },
//         {
//           id: 5,
//           author: {
//             name: 'Cézar Toledo',
//             avatar: 'https://i.pravatar.cc/150?img=11',
//           },
//           date: '04 Jun 2019',
//           content:
//             'Que maaaaaassa! Estou pensando em me inscrever na próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes',
//         },
//       ],
//     },
//   ],
// };
