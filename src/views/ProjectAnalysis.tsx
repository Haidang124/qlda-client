import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import '../assets/scss/component/analysis.scss';
import { projectService } from '../services/projects/api';
import { taskService } from '../services/task/api';
import ChartPie from './ChartPie';
import HeadProject from './HeadProject';
import {randomColor} from 'randomcolor'
import { Button, Card, CardFooter, CardHeader, Container, Media, Modal, Pagination, PaginationItem, PaginationLink, Progress, Row, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import ModalDetailTask from './ModalDetailTask';

const ProjectAnalysis: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [dataAnlysis, setDataAnlysis] = useState({
    listUserId: [],
    dataUser: {
      ['']: {
        taskComplete: [],
        taskCreated: [],
        taskInProgress: [],
        taskOverDeadline: [],
        taskPlanned: [],
        userId: "",
        username: ""
      }
    },
    totalComplete: 0,
    totalPlenned: 0,
    totalInProgress: 0,
    totalTask: 0,
    totalOverDeadline: 0
  });
  const [page, setPage] = useState(1);
  const [listUserPage, setListUserPage] = useState([]);
  const memberOnePage = 5;
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    taskService.analysis({projectId: projectId}).then((res) => {
      let list = [];
      Object.entries(res.data.data.dataUser).map(([memberId, value], index) => {
        list.push(memberId);
      });
      setDataAnlysis({
        ...res.data.data,
        listUserId: list
      });
      setPage(1);
    });
  }, []);
  const getNameUser = () => {
    let arr = [];
    for(let i=0; i<dataAnlysis.listUserId.length; i++) {
      arr.push(dataAnlysis.dataUser[dataAnlysis.listUserId[i]].username);
    }
    return arr;
  }
  const getTotalTaskJoin = () => {
    let arr = [];
    for(let i=0; i<dataAnlysis.listUserId.length; i++) {
      let data = dataAnlysis.dataUser[dataAnlysis.listUserId[i]];
      arr.push(data.taskPlanned.length + data.taskInProgress.length + data.taskComplete.length);
    }
    return arr;
  }
  const TaskPlannedInProgessComplete = (typeTask) => {
    let arr = [];
    switch(typeTask) {
      case "Planned": 
        for(let i=0; i<dataAnlysis.listUserId.length; i++) {
          let data = dataAnlysis.dataUser[dataAnlysis.listUserId[i]];
          arr.push(data.taskPlanned.length);
        }
        break;
      case "In Progress": 
        for(let i=0; i<dataAnlysis.listUserId.length; i++) {
          let data = dataAnlysis.dataUser[dataAnlysis.listUserId[i]];
          arr.push(data.taskInProgress.length);
        }
        break;
      case "Complete": 
        for(let i=0; i<dataAnlysis.listUserId.length; i++) {
          let data = dataAnlysis.dataUser[dataAnlysis.listUserId[i]];
          arr.push(data.taskComplete.length);
        }
        break;
      case "OverDeadline": 
        for(let i=0; i<dataAnlysis.listUserId.length; i++) {
          let data = dataAnlysis.dataUser[dataAnlysis.listUserId[i]];
          arr.push(data.taskOverDeadline.length);
        }
        break;
    }
    return arr;
  }
  const randomArrayColor = () => {
    let arr = [];
    for(let i=0; i<dataAnlysis.listUserId.length; i++) {
      arr.push(randomColor());
    }
    return arr;
  }
  const percentComplete = () => {
    let arr = [];
    let maxLen = dataAnlysis.listUserId.length;
    let maxPage = Math.ceil(maxLen/memberOnePage);
    let len = page*memberOnePage > maxLen ? maxLen : page*memberOnePage;
    for(let i=(page-1)*memberOnePage ; i < len; i++) {
      let user = dataAnlysis.dataUser[dataAnlysis.listUserId[i]];
      let totalTask = user.taskInProgress.length + user.taskPlanned.length + user.taskComplete.length;
      arr.push({
        userId: user.userId,
        username: user.username,
        email:user.email,
        percent: totalTask == 0? NaN : Math.floor(user.taskComplete.length/totalTask*100 + 0.05),
      });
    }
    for(let i=len; i<page*memberOnePage; i++) {
      arr.push(NaN);
    }
    return arr;
  }
  const getProgressColor = (value) => {
    if(value >= 80) {     //80-100
      return "#01AD23";
    }
    if(value >= 60) { // 60-80
      return "#80C02B";
    }
    if(value >= 40) { //40-60
      return "#FFD334";
    }
    if(value >= 20) { //20-40
      return "#F08130";
    }
    return "#E22E2F";  //0-20
  }
  return (<>
  <ModalDetailTask
    show={showModal}
    title = "User 1"
    percent = {80}
    funcQuit = {()=>setShowModal(false)}
    funcOnHide = {()=>setShowModal(false)}
    dataUser={{
        taskComplete: [{authorId: "",deadline: "", desc: "", taskname: ""}],
        taskCreated: [{authorId: "",deadline: "", desc: "", taskname: ""}],
        taskInProgress: [{authorId: "",deadline: "", desc: "", taskname: ""}],
        taskOverDeadline: [{authorId: "",deadline: "", desc: "", taskname: ""}],
        taskPlanned: [{authorId: "",deadline: "", desc: "", taskname: ""}],
        userId: "",
        username: "",
        ...dataAnlysis.dataUser[memberId]
    }}
    data = {{
      ['']: {
        username: ""
      },
      ...dataAnlysis.dataUser
    }}
  ></ModalDetailTask>
    <div className="project-anlysis header d-flex flex-column m-0 pb-2 ">
      <HeadProject projectId={projectId}/>
      <div className="d-flex flex-row justify-content-center mt-5">
        <div className="my-navbar">
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2 d-flex justify-content-center p-4">
                <div className="card-body-task">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Files Upload
                      </div>
                      <div className="h4 mb-0 font-weight-bold text-gray-800">
                        30 File
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-file fa-2x text-gray-300 ml-5 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2 d-flex justify-content-center p-4">
                <div className="card-body-task">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        BUDGET
                      </div>
                      <div className="h4 mb-0 font-weight-bold text-gray-800">
                        $2,500 USD
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fas fa-users fa-2x text-gray-300 ml-4 icon-task"></i> */}
                      <i className="fas fa-money-bill-wave fa-2x text-gray-300 ml-4 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2 d-flex justify-content-center p-4">
                <div className="card-body-task">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                       Completed / Total tasks
                      </div>
                      <div className="h4 mb-0 font-weight-bold text-gray-800">
                        {dataAnlysis.totalComplete} / {dataAnlysis.totalTask}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-list fa-2x text-gray-300 ml-5 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2 d-flex justify-content-center p-4">
                <div className="card-body-task">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Over The Deadline
                      </div>
                      <div className="h4 mb-0 font-weight-bold text-gray-800">
                        {dataAnlysis.totalOverDeadline}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-calendar fa-2x text-gray-300 ml-5 icon-task"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Total Tasks Manager
                  </h5>
                </div>
                <div className="card-body-task-chart">
                  <div className="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="horizontalbar"
                              chartDataBar={{
                                labels: ['Planned', 'In Progress', 'Completed', 'Over Deadline',],
                                datasets: [
                                  { //#007BFF
                                    label: "Number tasks",
                                    backgroundColor: ['#ebb000', '#006FE6', '#28A745', '#DC3545',],
                                    // borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: ['#FFC107', '#007BFF', '#08B530', '#FA0019',],
                                    // hoverBorderColor: 'rgba(255,99,132,1)',
                                    data: [dataAnlysis.totalPlenned, dataAnlysis.totalInProgress, dataAnlysis.totalComplete, dataAnlysis.totalOverDeadline,0,1]
                                  },
                                ],
                                title: "",
                                width: 640,
                                height: 242
                              }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Total Tasks Manager
                  </h5>
                  <div className="dropdown no-arrow">
                    <a
                      className="dropdown-toggle"
                      href="/"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink">
                      <div className="dropdown-header">Dropdown Header:</div>
                      <a className="dropdown-item" href="/">
                        Action
                      </a>
                      <a className="dropdown-item" href="/">
                        Another action
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="chart-pie pt-4 pb-2">
                    <ChartPie name="pie" 
                      chartDataPie={{
                          data: {
                            datasets: [
                              {
                                label: 'Population',
                                data: [dataAnlysis.totalPlenned, dataAnlysis.totalInProgress, dataAnlysis.totalComplete],
                                backgroundColor: ['#ebb000', '#006FE6', '#28A745'],
                                hoverBackgroundColor: ['#FFC107', '#007BFF', '#08B530',],
                              },
                            ],
                            labels: ["Planned", "In Progress", "Completed"]
                          }
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <Container className="mt-4" fluid>
              <Row>
                <div className="col">
                  <Card className="shadow">
                    <Table className="align-items-center table-flush" responsive style={{textAlign:"center"}}>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" >Username</th>
                          <th scope="col" >Email</th>
                          <th scope="col" >Completion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {percentComplete().map((value, i) => {
                          if(typeof(value.username) == "undefined") {
                            return (
                                <tr style={{height:"81px"}}>
                                  <th></th>
                                  <td></td>
                                </tr>
                            )
                          }
                          return (<>
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center"
                                  style={{cursor: "pointer"}}
                                  onClick={(e) =>{
                                    setMemberId(value.userId);
                                    setShowModal(true);
                                  }}>
                                  <a className="avatar mr-3">
                                    <img height="50" alt="..."
                                      src="https://api.hoclieu.vn/images/game/bbfb3597f173af631cb24f6ee0f8b8da.png"/>
                                  </a>
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {value.username}
                                    </span>
                                  </Media>
                                </Media>
                              </th>
                              <td>
                                {value.email}
                              </td>
                              <td style={{width:"100%"}}>
                                <div className="d-flex align-items-center">
                                  <span style={{width:"10%", fontWeight:"bold", color: getProgressColor(value.percent)}} >
                                        {isNaN(value.percent)? "No Task":value.percent+" %"}
                                  </span>
                                  <div style={{width:"90%"}}>
                                    {isNaN(value.percent) ? 
                                        (<></>) : 
                                        (<>
                                        <div className="progress progress-bar-striped" style={{height:"20px", width:"100%"}}>
                                          <div className="progress-bar" role="progressbar" 
                                            style={{width: value.percent +"%", height:"20px",
                                                  backgroundColor: getProgressColor(value.percent)}}>
                                          </div>
                                        </div>
                                        </>)}
                                  </div>
                                </div>
                              </td>
                            </tr> 
                          </>);
                        })}
                                       
                      </tbody>
                    </Table>
                    <CardFooter className="py-4">
                      <nav aria-label="...">
                        <Pagination
                          className="pagination justify-content-end mb-0"
                          listClassName="justify-content-end mb-0">
                          <PaginationItem>
                            <PaginationLink
                              onClick={(e) => {
                                if(page==1) {
                                  return;
                                }
                                setPage(page - 1);
                              }}>
                              <i className="fas fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>
                          {Array.from({length: Math.ceil(dataAnlysis.listUserId.length/memberOnePage)}, (_, index) => index + 1).map((value, index) => {
                            return (<>
                              <PaginationItem className="active">
                                <PaginationLink
                                  onClick={(e) => {
                                    setPage(index+1);
                                  }}>
                                  {index+1}
                                </PaginationLink>
                              </PaginationItem>
                            </>)
                            
                          })}
                          <PaginationItem>
                            <PaginationLink
                              onClick={(e) => {
                                if(page == Math.ceil(dataAnlysis.listUserId.length/memberOnePage)) {
                                  return;
                                }
                                setPage(page + 1);
                              }}>
                              <i className="fas fa-angle-right" />
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </nav>
                    </CardFooter>
                  </Card>
                </div>
              </Row>
            </Container>
          </div>

          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Total tasks Planned of each member
                  </h5>
                </div>
                <div className="card-body-task-chart">
                  <div className="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="bar" 
                          chartDataBar = {{
                            labels: [...getNameUser()],
                            datasets: [
                              {
                                label: 'Number tasks',
                                backgroundColor: [...randomArrayColor()],
                                data: [...TaskPlannedInProgessComplete("Planned")],
                              },
                            ],
                            title: "",
                            width: 640,
                            height: 300
                          }}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Total tasks In Progress of each member
                  </h5>
                </div>
                <div className="card-body-task-chart">
                  <div className="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="bar" 
                          chartDataBar = {{
                            labels: [...getNameUser()],
                            datasets: [
                              {
                                label: 'Number tasks',
                                backgroundColor: [...randomArrayColor()],
                                data: [...TaskPlannedInProgessComplete("In Progress")],
                              },
                            ],
                            title: "",
                            width: 640,
                            height: 300
                          }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Total tasks Complete of each member
                  </h5>
                </div>
                <div className="card-body-task-chart">
                  <div className="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="bar" 
                          chartDataBar = {{
                            labels: [...getNameUser()],
                            datasets: [
                              {
                                label: 'Number tasks',
                                backgroundColor: [...randomArrayColor()],
                                data: [...TaskPlannedInProgessComplete("Complete")],
                              },
                            ],
                            title: "",
                            width: 640,
                            height: 300
                          }}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">
                    Total tasks Over Deadline of each member
                  </h5>
                </div>
                <div className="card-body-task-chart">
                  <div className="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="bar" 
                          chartDataBar = {{
                            labels: [...getNameUser()],
                            datasets: [
                              {
                                label: 'Number tasks',
                                backgroundColor: [...randomArrayColor()],
                                data: [...TaskPlannedInProgessComplete("OverDeadline")],
                              },
                            ],
                            title: "",
                            width: 640,
                            height: 300
                          }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};
export default ProjectAnalysis;
