import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading/Loading';
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import Upload from './Upload/Upload';
import Board from './views/Board';
import Chat from './views/Chat';
import ChooseAnswer from './views/ChooseAnswer';
import ChooseList from './views/ChooseList';
import CodePin from './views/CodePin';
import Error404 from './views/Error404';
import Friend from './views/Friend';
import Game from './views/Game';
import GameDetail from './views/GameDetail';
import Lobby from './views/Lobby';
import MemberProject from './views/MemberProject';
import PostList from './views/PostList';
import ProjectAnalysis from './views/ProjectAnalysis';
import Ranking from './views/Ranking';
import TaskProject from './views/TaskProject';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/game/:gameId" component={GameDetail} />
          <Route path="/game" component={Game} />
          <Route path="/test" component={ChooseList} />
          <Route path="/board" component={Board} />
          <Route path="/member-project/:projectId" component={MemberProject} />
          <Route path="/chat/:projectId" component={Chat} />
          <Route path="/forum/:projectId" component={PostList} />
          <Route path="/analysis/:projectId" component={ProjectAnalysis} />
          <Route path="/task-project/:projectId" component={TaskProject} />
          <Route path="/codepin" component={CodePin} />
          <Route path="/friend" component={Friend} />
          <Route path="/upload" component={Upload} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/playing-game" component={ChooseAnswer} />
          <Route path="/lobby/:id" component={Lobby} />
          <Route path="/error404" component={Error404}/>
          {/* <Route path="/socketio" component={SocketioClient} /> */}
          <Route path="/loading" render={(props) => <Loading />} />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
