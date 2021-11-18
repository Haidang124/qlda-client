import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/component/chooselist.scss';

const ChooseList: React.FC<any> = (props) => {
  //props: projectId
  return (
    <div className="choose-list">
      <nav className="navbar navbar-default navbar-static-top d-flex justify-content-center pl-1 pt-2">
        <ul className="nav nav-pills">
          {/* <li className="mr-4">
            <NavLink to={'/admin/index'} activeClassName="selected">
              Home
              <div className="border"></div>
            </NavLink>
          </li> */}
          <li className="mr-4">
            <NavLink
              to={'/member-project/' + props.projectId}
              activeClassName="selected">
              Member
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to={'/task-project/' + props.projectId}
              activeClassName="selected">
              Task
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to={'/forum/' + props.projectId}
              activeClassName="selected">
              Group
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink to={'/chat/' + props.projectId} activeClassName="selected">
              Chat
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to={'/analysis/' + props.projectId}
              activeClassName="selected">
              Analysis
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to={'/setting-project/' + props.projectId}
              activeClassName="selected">
              Setting
              <div className="border"></div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ChooseList;
