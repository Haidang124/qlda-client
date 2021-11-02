import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import { userService } from './services/user/api';
import socket from './socketioClient';
import Upload from './Upload/Upload';
import Chat from './views/project/chat/Chat';
import ChooseAnswer from './views/game/ChooseAnswer';
import ChooseList from './views/project/ChooseList';
import CodePin from './views/game/CodePin';
import Confirm from './views/project/member/Confirm';
import Error404 from './views/Error404';
import Friend from './views/project/member/Friend';
import Game from './views/game/Game';
import GameDetail from './views/game/GameDetail';
import Lobby from './views/game/Lobby';
import MemberProject from './views/project/member/MemberProject';
import PostList from './views/project/courses/PostList';
import ProjectAnalysis from './views/project/analysis/ProjectAnalysis';
import Ranking from './views/game/Ranking';
import SettingProject from './views/project/setting/SettingProject';
import TaskProject from './views/project/task/TaskProject';

const App: React.FC = () => {
  useEffect(() => {
    // console.log(window.location.pathname);
    userService
      .getUserId()
      .then((res) => {
        socket.emit('online', { roomId: 'online', userId: res.data.data.id });
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
          <Route path="/task-project/:projectId" component={TaskProject} />
          <Route
            path="/setting-project/:projectId"
            component={SettingProject}
          />
          <Route path="/confirm-project/:confirmId" component={Confirm} />
          <Route path="/codepin" component={CodePin} />
          <Route path="/friend" component={Friend} />
          <Route path="/upload" component={Upload} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/playing-game" component={ChooseAnswer} />
          <Route path="/lobby/:id" component={Lobby} />
          <Route path="/error404" component={Error404} />
          {/* <Route path="/socketio" component={SocketioClient} /> */}
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
