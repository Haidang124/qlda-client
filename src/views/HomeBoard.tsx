import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { Button, Container } from 'reactstrap';
import '../assets/scss/component/homeboard.scss';
import ModalCreate from '../modals/ModalCreate';

const HomeBoard: React.FC = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="home-board header pb-2 pt-3 pt-md-7">
      
      <ModalCreate state={show} setState={setShow} />
      <Container fluid>
        <div className="title mb-4">
          <SVG src={'/svg/icon.svg'} height={27} width={27} className="mr-3" />
          <span>Most popular templates</span>
        </div>
        <div className="list-templete">
          <Templete background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x336/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg" />
          <Templete background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg" />
          <Templete background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/efea59b89ada0934c5256715fb180bd9/photo-1463107971871-fbac9ddb920f.jpg" />
          <Templete background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/b10c8bd87b80f7abeb56820f50c4db66/photo-1474487548417-781cb71495f3.jpg" />
        </div>
        <div className="recently-viewed mt-4">
          <div className="boards-page-board-section-header">
            <div className="boards-page-board-section-header-icon">
              <i className="far fa-clock"></i>
            </div>
            <h3 className="boards-page-board-section-header-name">
              Recently viewed
            </h3>
          </div>
          <div className="list-templete">
            <Templete background="https://images.unsplash.com/photo-1615493932251-71495614f3ab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
            <Templete background="https://images.unsplash.com/photo-1617643606475-99ad26026885?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
          </div>
        </div>
        <div className="my-project mt-4">
          <div className="boards-page-board-section-header d-flex">
            <div className="boards-page-board-section-header-icon">
              <i className="fas fa-home mr-3"></i>
            </div>
            <h3 className="boards-page-board-section-header-name">
              My Projects
            </h3>
          </div>
          <div className="list-templete d-flex align-items-center">
            <Templete background="https://images.unsplash.com/photo-1617868392419-c34dd83e9f2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
            <Templete background="https://images.unsplash.com/photo-1616423642096-95a567a16828?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
            <Button color="info" style={{ width: '150px', height: '50px' }}>
              Create Project
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
const Templete: React.FC<{ background: string }> = ({ background }) => {
  return (
    <a
      href="/"
      className="templete"
      style={{
        backgroundImage: 'url(' + background + ')',
      }}>
      <span className="wrap-templete"></span>
      <div className="content">
        <div
          className="tag-templete"
          title="Templates are read-only boards for others to copy.">
          Template
        </div>
        <div className="name-templete">
          <h1 className="name">Project Management</h1>
        </div>
      </div>
    </a>
  );
};

export default HomeBoard;
