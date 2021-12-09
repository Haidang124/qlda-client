import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import { userService } from './services/user/api';
import socket from './socketioClient';
import Upload from './Upload/Upload';
import EditorBlog from './views/blog/EditorBlog';
import MyListBlog from './views/blog/MyListBlog';
import Error404 from './views/Error404';
import ChooseAnswer from './views/game/ChooseAnswer';
import CodePin from './views/game/CodePin';
import Game from './views/game/Game';
import GameDetail from './views/game/GameDetail';
import Lobby from './views/game/Lobby';
import Ranking from './views/game/Ranking';
import StatusPayment from './views/payment/StatusPayment';
import Pricing from './views/Pricing';
import ProjectAnalysis from './views/project/analysis/ProjectAnalysis';
import Chat from './views/project/chat/Chat';
import ChooseList from './views/project/ChooseList';
import PostList from './views/project/courses/PostList';
import Confirm from './views/project/member/Confirm';
import Friend from './views/project/member/Friend';
import MemberProject from './views/project/member/MemberProject';
import SettingProject from './views/project/setting/SettingProject';
import { Task } from './views/project/task/Task';

const App: React.FC = () => {
  useEffect(() => {
    // console.log(window.location.pathname);
    userService
      .getUserInfo()
      .then((res) => {
        res.data.data.projects.map((projectId) => {
          socket.emit('online', {
            roomId: projectId,
            userId: res.data.data.userId,
          });
          return 0;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/game/:gameId" component={GameDetail} />
          <Route path="/game" component={Game} />
          <Route path="/test" component={ChooseList} />
          <Route path="/member-project/:projectId" component={MemberProject} />
          <Route path="/chat/:projectId" component={Chat} />
          <Route path="/forum/:projectId" component={PostList} />
          <Route path="/analysis/:projectId" component={ProjectAnalysis} />
          <Route path="/task-project/:projectId" component={Task} />

          <Route
            path="/setting-project/:projectId"
            component={SettingProject}
          />
          <Route path="/my-blog" component={MyListBlog} />
          <Route path="/confirm-project/:confirmId" component={Confirm} />
          <Route path="/codepin" component={CodePin} />
          <Route path="/friend" component={Friend} />
          <Route path="/upload" component={Upload} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/status-payment" component={StatusPayment} />
          <Route path="/editor" component={EditorBlog} />
          <Route path="/playing-game" component={ChooseAnswer} />
          <Route path="/lobby/:id" component={Lobby} />
          <Route path="/error404" component={Error404} />
          <Route exact path="/">
            <Redirect to="/admin/index" />
          </Route>
          <Route path="*">
            <Redirect to="/error404" />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
