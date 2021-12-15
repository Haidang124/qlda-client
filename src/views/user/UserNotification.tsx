import React, { useState } from 'react';
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
import Pricing from '../Pricing';
import { Assignment } from '../project/task/InterfaceTask';
import ItemNotification from './ItemNotification';
interface Props {
  dataUser: any;
  notification?: {
    data: Array<Notification>;
    setData: (data) => void;
  };
}
export interface Notification {
  _id: string;
  content: string;
  authorId: Assignment;
  projectId: { _id: string; name: string };
  taskId: { _id: string; name: string };
  type:
    | 'add-assignment' // add thành viên vào task
    | 'del-assignment' // xóa thành viên trong task
    | 'new-chat' //có tin nhắn mới
    | 'project-invite' // mời tham gia project
    | 'project-refuse' // từ chối tham gia project (hiện ở người mời)
    | 'project-agree' // đồng ý tham gia project (hiện ở người mời)
    | 'project-refuse-invited' // từ chối tham gia project (hiện ở người được mời)
    | 'project-agree-invited'; // đồng ý tham gia project (hiện ở người được mời)
  createdAt: Date;
}
const UserNotification: React.FC<Props> = (props: Props) => {
  const [isShow, setIsShow] = useState(false);
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
                Bạn có{' '}
                <strong className="text-primary">
                  {props.notification?.data?.length}
                </strong>{' '}
                thông báo.
              </h6>
            </DropdownItem>
            <DropdownItem className="list-group list-group-flush p-0">
              {props.notification &&
                props.notification.data.map((item, i) => (
                  <ItemNotification
                    data={{ ...item }}
                    setData={(data) => {
                      props.notification.setData(data);
                    }}
                  />
                ))}
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <span
          className="my-auto font-weight-bold nav-link mr-2 p-0"
          style={{ cursor: 'default' }}
          onClick={() => setIsShow(true)}>
          Upgrade
        </span>
        <UncontrolledDropdown nav>
          <DropdownToggle className="p-0" nav>
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
      <Pricing state={isShow} setState={() => setIsShow(false)} />
    </div>
  );
};

export default UserNotification;
