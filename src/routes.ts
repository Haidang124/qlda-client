import Header from './components/Headers/Header';
import Blog from './views/blog/Blog';
import CreateGame from './views/game/CreateGame';
import Discover from './views/game/Discover';
import EditGame from './views/game/EditGame';
import Game from './views/game/Game';
import GameUI from './views/game/GameUi';
import WatchGame from './views/game/WatchGame';
import HomeBoard from './views/project/HomeBoard';
import Calendar from './views/project/calendar/Calendar';
import ChangePassword from './views/user/ChangePassword';
import Login from './views/user/Login';
import Profile from './views/user/Profile';
import Register from './views/user/Register';
import Chat from './views/project/chat/Chat';
let routes = [
  {
    path: '/index',
    name: 'Home Page',
    icon: 'ni ni-tv-2 text-primary',
    component: Header,
    layout: '/admin',
    active: true,
  },
  {
    path: '/board',
    name: 'Project',
    icon: 'ni ni-book-bookmark text-primary',
    component: HomeBoard,
    layout: '/admin',
    active: false,
  },
  {
    path: '/discover',
    name: 'My Kahoot',
    icon: 'ni ni-atom text-primary',
    component: Discover,
    layout: '/admin',
    active: false,
  },
  {
    path: '/gameUi',
    name: 'Play Game',
    icon: 'ni ni-controller text-primary',
    component: GameUI,
    layout: '/admin',
    active: false,
  },
  {
    path: '/user-profile/:id',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
    active: true,
  },
  {
    path: '/message/',
    name: 'Message',
    icon: 'ni ni-chat-round text-light',
    component: Chat,
    layout: '/admin',
    active: true,
  },
  {
    path: '/chat',
    name: 'Change Password',
    icon: 'ni ni-key-25 text-info',
    component: ChangePassword,
    layout: '/admin',
    active: true,
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
    active: false,
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
    active: false,
  },
  {
    path: '/create-game',
    name: 'Create Game',
    icon: 'ni ni-controller text-primary',
    component: CreateGame,
    layout: '/admin',
    active: false,
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    icon: 'ni ni-controller text-primary',
    component: Blog,
    layout: '/admin',
    active: false,
  },
  {
    path: '/edit-game/:id',
    name: 'Edit Game',
    icon: 'ni ni-controller text-primary',
    component: EditGame,
    layout: '/admin',
    active: false,
  },
  {
    path: '/game',
    name: 'Game',
    icon: 'ni ni-controller text-primary',
    component: Game,
    layout: '/admin',
    active: false,
  },
  {
    path: '/gameUi',
    name: 'GameUi',
    icon: 'ni ni-controller text-primary',
    component: GameUI,
    layout: '/admin',
    active: false,
  },
  {
    path: '/watchGame/:id',
    name: 'Watch Game',
    icon: 'ni ni-controller text-primary',
    component: WatchGame,
    layout: '/admin',
    active: false,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'fa fa-calendar text-light',
    component: Calendar,
    layout: '/admin',
    active: false,
  },
];
export default routes;
