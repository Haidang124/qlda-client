import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import '../assets/scss/component/postlist.scss';
import { projectService } from '../services/projects/api';
import { userService } from '../services/user/api';
import Friend from './Friend';
import HeadProject from './HeadProject';
import NewPostItem from './NewPostItem';
import PostItem from './PostItem';
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
const PostList: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    role: "",
    avatar: "",
    language: "",
    email: "",
    username: "",
    birthday: "",
  });
  useEffect(() => {
    projectService
      .getPosts({
        projectId: projectId,
      })
      .then((response) => {
        setData(response.data.data.postList);
      });
    userService.getUserInfo().then((response)=>{
      setUser(response.data.data);
    }).catch((err)=>{
      toast.error("Không xác định được user!");
    })
  }, []);
  return (
    <div className="post-list header d-flex flex-column m-0 pb-2 ">
      <HeadProject projectId={projectId}/>
      <div className="d-flex flex-row justify-content-center">
        <div>
          <NewPostItem author={{name: user.username, avatar: user.avatar}}></NewPostItem>
          {data.map((post, index) => (
            <PostItem key={index} {...post} />
          ))}
        </div>
        <Friend />
      </div>
    </div>
  );
};
export default PostList;
