import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/scss/component/chooselist.scss';

const ChooseList: React.FC = () => {
  return (
    <div className="choose-list">
      <nav className="navbar navbar-default navbar-static-top d-flex justify-content-center">
        <ul className="nav nav-pills">
          <li className="mr-4">
            <NavLink to="/admin/index" activeClassName="selected">
              Home
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink to="/member-project" activeClassName="selected">
              Member
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink to="/task-project" activeClassName="selected">
              Task
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink to="/forum" activeClassName="selected">
              Course
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink to="/chat" activeClassName="selected">
              Chat
              <div className="border"></div>
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink to="/analysis" activeClassName="selected">
              Analysis
              <div className="border"></div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ChooseList;
