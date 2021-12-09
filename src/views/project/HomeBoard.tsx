import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import { Button, Container } from 'reactstrap';
import '../../assets/scss/component/homeboard.scss';
import ModalCreate from '../../modals/ModalCreate';
import { projectService } from '../../services/projects/api';
import socket from '../../socketioClient';
const HomeBoard: React.FC = () => {
  const [data, setData] = useState([]);
  const [listJoin, setListJoin] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const createProject = (name, description, avatar) => {
    projectService
      .addProject({ name: name, description: description, avatar: avatar })
      .then((res) => {
        let project = res.data.data.project;
        setData([...data, project]);
        socket.emit('joinRoom', { roomId: project._id });
        toast.success('Tạo project thành công!');
        setShowCreate(false);
      })
      .catch((err) => {
        toast.error('Không thể tạo project');
      });
  };
  useEffect(() => {
    projectService
      .getProject()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error('Lỗi không thể lấy dữ liệu!');
      });
    // projectService.getProjectJoined().then((res) => {
    //   setListJoin(res.data.data.projectJoined);
    // });
  }, []);
  return (
    <div className="home-board header pb-2 pt-3 pt-md-7">
      <ModalCreate
        state={isShowCreate}
        setState={setShowCreate}
        createProject={createProject}
      />
      <Container fluid>
        <div className="title mb-4">
          <SVG src={'/svg/icon.svg'} height={27} width={27} className="mr-3" />
          <span>Most popular templates</span>
        </div>
        <div className="list-templete">
          <Templete
            name=""
            projectId=""
            background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x336/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg"
          />
          <Templete
            name=""
            projectId=""
            background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg"
          />
          <Templete
            name=""
            projectId=""
            background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/efea59b89ada0934c5256715fb180bd9/photo-1463107971871-fbac9ddb920f.jpg"
          />
          <Templete
            name=""
            projectId=""
            background="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/b10c8bd87b80f7abeb56820f50c4db66/photo-1474487548417-781cb71495f3.jpg"
          />
          {data.forEach((value, i) => {
            // if (i === 0)
            //   return (
            //     <Templete
            //       background={value.avatar}
            //       name={value.name}
            //       projectId={value._id}></Templete>
            //   );
          })}
        </div>
        <div className="recently-viewed mt-4">
          <div className="boards-page-board-section-header">
            <div className="boards-page-board-section-header-icon">
              <i className="far fa-clock"></i>
            </div>
            <h3 className="boards-page-board-section-header-name">
              Project Joined
            </h3>
          </div>
          <div className="list-templete">
            {listJoin.map((value, i) => {
              return (
                <Templete
                  name={value.name}
                  projectId={value._id}
                  background={value.avatar}
                />
              );
            })}
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
            {data.map((value, i) => {
              return (
                <Templete
                  background={value.avatar}
                  name={value.name}
                  projectId={value._id}></Templete>
              );
            })}
            <Button
              color="info"
              style={{ width: '150px', height: '50px' }}
              onClick={() => {
                setShowCreate(true);
              }}>
              Create Project
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
const Templete: React.FC<{
  background: string;
  name: string;
  projectId: string;
}> = ({ background, name, projectId }) => {
  return (
    <a
      href={'/member-project/' + projectId}
      className="templete"
      style={{
        backgroundImage: 'url(' + background + ')',
      }}>
      <span className="wrap-templete"></span>
      <div className="content h-100">
        <div
          className="tag-templete"
          title="Templates are read-only boards for others to copy.">
          Template
        </div>
        <div className="name-templete">
          <h1 className="name">{name}</h1>
        </div>
      </div>
    </a>
  );
};

export default HomeBoard;
