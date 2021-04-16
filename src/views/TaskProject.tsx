import React from 'react';
import { useRouteMatch } from 'react-router';
import '../assets/scss/component/task.scss';
import HeadProject from './HeadProject';
const TaskProject: React.FC<{}> = ({}) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  return (
    <div className="task-project">
      <HeadProject projectId={projectId} />
      <div className="row ml-3 mt-3 ">
        <div className="col-lg-4">
          <div className="card shadow mb-4 ">
            <div className="card-header py-3">
              <h2 className="m-0 font-weight-bold text-primary"> Planned</h2>
            </div>
            <div className="card-body my-detail-task p-4">
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task1 -project1"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "day la task 1"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* { this.state.mytasks ? this.state.mytasks.map((item,key)=>item.valuestatus == "Planned" ? <div className="col mt-2">
                    <div className="card shadow">
                      <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body-task">
                          <div className="row no-gutters align-items-center content-name-tasks  ">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                {item.nametask} - {item.codeCourse}
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                               {item.description}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:<p></p>):<p></p>} */}

              {/* <div className="col mt-2">
                    <div className="card shadow">
                      <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body-task">
                          <div className="row no-gutters align-items-center content-name-tasks ">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Number Members
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                                0 Members
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

              {/* <div className="col mt-2">
                    <div className="card shadow">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body-task">
                          <div className="row no-gutters align-items-center content-name-tasks ">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Number Members
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                                0 Members
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h2 className="m-0 font-weight-bold text-primary">In Progress</h2>
            </div>
            <div className="card-body my-detail-task p-4">
              {/* { this.state.mytasks ? this.state.mytasks.map((item,key)=>item.valuestatus == "Process" ? <div className="col mt-2">
                    <div className="card shadow">
                      <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body-task">
                          <div className="row no-gutters align-items-center content-name-tasks  ">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                {item.nametask} - {item.codeCourse}
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                               {item.description}
                              </div>  
                              
                            </div>
                            <div className="col-auto">
                              <i
                                className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:<p></p>):<p></p>} */}
              <div className="card shadow mb-3">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task của tôi"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "mô tả task"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task của tôi"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "mô tả task"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task của tôi"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "mô tả task"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task của tôi"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "mô tả task"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-3">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body-task">
                    <div className="row no-gutters align-items-center content-name-tasks  ">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          "task của tôi"
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                          "mô tả task"
                        </div>
                      </div>
                      <div className="col-auto">
                        <i
                          className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                          aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h2 className="m-0 font-weight-bold text-primary">Complete</h2>
            </div>
            <div className="card-body my-detail-task p-4">
              {/* { this.state.mytasks ? this.state.mytasks.map((item,key)=>item.valuestatus == "Complete" ? <div className="col mt-2">
                    <div className="card shadow">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body-task">
                          <div className="row no-gutters align-items-center content-name-tasks  ">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                {item.nametask} - {item.codeCourse}
                              </div>
                              
                              <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                               {item.description}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fa fa-list-ol fa-2x text-gray-300 ml-4 icon-task"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:<p></p>):<p></p>} */}
              {/* <div className="col mt-2">
                    <div className="card shadow">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body-task">
                          <div className="row no-gutters align-items-center content-name-tasks  content-name-tasks">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Number Members
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-mytask">
                                0 Members
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fas fa-users fa-2x text-gray-300 ml-4 icon-task"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskProject;
