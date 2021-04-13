import React, { useState } from 'react';
import { useRouteMatch } from 'react-router';
import '../assets/scss/component/analysis.scss';
import ChartPie from './ChartPie';
import HeadProject from './HeadProject';

const ProjectAnalysis: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [chartDataPie, setChartDataPie] = useState({
    datasets: [
      {
        label: 'Population',
        data: [12, 5, 3],
        backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
      },
    ],
  });
  return (
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
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
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
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
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
                        Tasks
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        5/ 8
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
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        2
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
                  <h6 className="m-0 font-weight-bold text-primary">
                    File Manager{' '}
                  </h6>
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
                <div className="card-body-task-chart">
                  <div className="chart-area">
                    {/* <canvas id="myAreaChart"></canvas> */}
                    <ChartPie name="bar" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Tasks Manager
                  </h6>
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
                    <ChartPie name="pie" chartDataPie={chartDataPie} />
                  </div>
                  <div className="mt-4 text-center small">
                    <span className="mr-2">
                      <i className="fas fa-circle text-warning"></i> Planned
                    </span>
                    <span className="mr-2">
                      <i className="fas fa-circle text-success"></i> Complete
                    </span>
                    <span className="mr-2">
                      <i className="fas fa-circle text-info"></i> In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectAnalysis;
