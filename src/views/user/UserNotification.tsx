import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';
import { userService } from '../../services/user/api';
import ItemNotification from './ItemNotification';
const UserNotification: React.FC<any> = (props) => {
  return (
    <div className="user-notification">
      <Nav
        className="align-items-center d-none d-md-flex flex-row justify-content-center"
        navbar>
        <UncontrolledDropdown
          nav
          className="list-notification d-flex justify-content-center col-3">
          <DropdownToggle tag="a" className="nav-link" caret>
            <i className="fas fa-bell fa-fw"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <h6 className="text-sm text-muted m-0">
                You have <strong className="text-primary">13</strong>{' '}
                notifications.
              </h6>
            </DropdownItem>
            <DropdownItem className="list-group list-group-flush p-0">
              <ItemNotification message="Đã giao task cho bạn" />
              <ItemNotification message="Đã nhắn tin cho bạn" />
              <a
                href="#!"
                className="dropdown-item text-center text-primary font-weight-bold py-3">
                View all
              </a>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        {/* <UncontrolledDropdown nav className="col-3">
          <DropdownToggle tag="a" className="nav-link" caret>
            <i className="fas fa-envelope fa-fw"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Some Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img alt="..." src={props.dataUser.avatar} />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  {props.dataUser.username}
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-single-02" />
              <span>My profile</span>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-settings-gear-65" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>Activity</span>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-support-16" />
              <span>Support</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              href="auth/logout"
              onClick={(e) => userService.logOut()}>
              <i className="ni ni-user-run" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </div>
  );
};

export default UserNotification;
