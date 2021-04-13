import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import { Button, Container } from 'reactstrap';
import '../assets/scss/component/homeboard.scss';
import ModalCreate from '../modals/ModalCreate';
import {projectService} from '../services/projects/api';

const HomeBoard: React.FC = () => {
  const [data, setData] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  useEffect(()=>{
    projectService.getProject().then((res)=>{
      setData(res.data.data);
    }).catch((err)=>{
      toast.error("Lỗi không thể lấy dữ liệu!");
    });
  },[]);
  return (
    <div className="home-board header pb-2 pt-3 pt-md-7">
      <ModalCreate state={isShowCreate} setState={setShowCreate} />
      <Container fluid>
        <div className="title mb-4">
          <SVG src={'/svg/icon.svg'} height={27} width={27} className="mr-3" />
          <span>Most popular templates</span>
        </div>
        <div className="list-templete">
          {data.map((value,i) => {
            if(i==0)
              return <Templete background={value.avatar} name={value.name} projectId={value._id}></Templete>
          })}
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
            {data.map((value,i) => {
              if(i==0)
                return <Templete background={value.avatar} name={value.name} projectId={value._id}></Templete>
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
            {data.map((value,i) => {
              return <Templete background={value.avatar} name={value.name} projectId={value._id}></Templete>
            })}
            <Button
              color="info"
              style={{ width: '150px', height: '50px' }}
              onClick={() => {setShowCreate(true); console.log(data);}}>
              Create Project
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
const Templete: React.FC<{ background: string, name: string, projectId: string }> = ({ background, name, projectId }) => {
  return (
    <a
      href={"/member-project/"+projectId}
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
          <h1 className="name">{name}</h1>
        </div>
      </div>
    </a>
  );
};

export default HomeBoard;
