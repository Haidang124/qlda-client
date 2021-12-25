/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';
import { administratorService } from '../../services/administrator/api';
import { momoService } from '../../services/momo/api';
import { notificationServive } from '../../services/notification/api';
import { userService } from '../../services/user/api';
import ModalPayment from '../modal/ModalPayment';
import ModalWithdrawal from '../modal/ModalWithdrawal';
import Pricing from '../Pricing';
import { Assignment } from '../project/task/InterfaceTask';
import { Role } from '../project/wrapperUpgrade/WrapperUpgrade';
import ItemNotification from './ItemNotification';
interface Props {
  dataUser: {
    username: string;
    avatar: string;
    role: Role;
    money: number;
  };
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
  blogId: {
    title: string;
  };
  administratorId: {
    _id: string;
    type: string;
    status: number;
    authorId: string;
    amount: number;
  };
  type:
    | 'add-assignment' // add thành viên vào task
    | 'del-assignment' // xóa thành viên trong task
    | 'new-chat' //có tin nhắn mới
    | 'project-invite' // mời tham gia project
    | 'project-refuse' // từ chối tham gia project (hiện ở người mời)
    | 'project-agree' // đồng ý tham gia project (hiện ở người mời)
    | 'project-refuse-invited' // từ chối tham gia project (hiện ở người được mời)
    | 'project-agree-invited' // đồng ý tham gia project (hiện ở người được mời)
    | 'add-blog'
    | 'add-blog-agree'
    | 'add-blog-refuse'
    | 'withdrawal-admin'
    | 'withdrawal-admin-agree'
    | 'withdrawal-admin-refuse'
    | 'withdrawal-user'; // tạo request blog
  createdAt: Date;
}
const UserNotification: React.FC<Props> = (props: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [isShowWithdraw, setIsShowWithdraw] = useState(false);
  return (
    <div className="user-notification">
      <Nav
        className="align-items-center d-none d-md-flex flex-row justify-content-center"
        navbar>
        <UncontrolledDropdown
          nav
          className="list-notification d-flex justify-content-center col-3">
          <DropdownToggle
            tag="a"
            className="nav-link"
            caret
            onClick={() => {
              notificationServive
                .getNotifications()
                .then((res) => {
                  props.notification.setData(
                    (res.data.data as Array<Notification>).reverse() || [],
                  );
                })
                .catch((err) => {
                  toast.error(
                    err.response?.data?.error ||
                      'Một lỗi không mong muốn đã xảy ra',
                  );
                });
            }}>
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
        {props.dataUser.role !== Role.Admin && (
          <span
            className="my-auto font-weight-bold nav-link mr-2 p-0"
            style={{ cursor: 'default' }}
            onClick={() => setIsShow(true)}>
            Upgrade
          </span>
        )}
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
            {props.dataUser.role !== Role.Admin && (
              <>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="fab fa-btc"></i>
                  <span>{props.dataUser.money} VNĐ</span>
                </DropdownItem>

                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="far fa-user-circle"></i>
                  <span>
                    {props.dataUser.role === Role.Member
                      ? 'Free'
                      : props.dataUser.role === Role.MemberPlus
                      ? 'Plus'
                      : props.dataUser.role === Role.MemberPro
                      ? 'Pro'
                      : 'Admin'}
                  </span>
                </DropdownItem>
                <DropdownItem
                  to="/admin/user-profile"
                  tag={Link}
                  onClick={() => {
                    setIsShowPayment(true);
                  }}>
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                  <span>Payment</span>
                </DropdownItem>
                <DropdownItem
                  to="/admin/user-profile"
                  tag={Link}
                  onClick={() => {
                    setIsShowWithdraw(true);
                  }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1682/1682308.png"
                    width={25}
                    height={25}
                  />
                  <span className="ml-2">Withdraw</span>
                </DropdownItem>
              </>
            )}
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-settings-gear-65" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>Activity</span>
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
      <Pricing
        state={isShow}
        setState={() => setIsShow(false)}
        role={props.dataUser.role}
      />
      <ModalPayment
        showModal={isShowPayment}
        setShowModal={() => setIsShowPayment(false)}
        handleNext={(amount) => {
          setIsShowPayment(false);
          momoService.payment(amount).then((res) => {
            window.location.replace(res.data.data.payUrl);
          });
        }}
      />
      <ModalWithdrawal
        showModal={isShowWithdraw}
        setShowModal={() => setIsShowWithdraw(false)}
        handleNext={(amount, numberPhone) => {
          administratorService
            .requestWithdrawal({
              amount: amount,
              numberPhone: numberPhone,
            })
            .then((res) => {
              toast('Hãy chờ Admin phê duyệt yêu cầu của bạn');
            })
            .catch((err) => {
              toast.error(
                err.response?.data?.error ||
                  'Một lỗi không mong muốn đã xảy ra',
              );
            });
          setIsShowWithdraw(false);
        }}
      />
    </div>
  );
};

export default UserNotification;
