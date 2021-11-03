import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from 'reactstrap';
import Sidebar from '../../../components/Sidebar/Sidebar';
import ModalInvite from '../../../modals/ModalInvite';
import routes from '../../../routes';
import { projectService } from '../../../services/projects/api';
import { userService } from '../../../services/user/api';
import socket from '../../../socketioClient';
import ModalTrueFalse from '../../ModalTrueFalse';
import HeadProject from '../HeadProject';

const MemberProject: React.FC<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [isShowInvite, setShowInvite] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [security, setSecurity] = useState(null);
  const [listOnline, setListOnline] = useState([]);
  const [userId, setUserId] = useState();
  const [userIdAdmin, setUserIdAdmin] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: '',
    title: '',
    type: '',
  });
  const [page, setPage] = useState(1);
  const memberOnePage = 5;
  useEffect(() => {
    socket.emit('loadUserOnline');
    socket.on('reloadUserOnline', (data) => {
      setListOnline(data.data);
    });
    socket.on('reloadMember', (data) => {
      setListUser(data.data);
      let list = [...data.data];
      let admin = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].admin === 'Admin') {
          admin.push(list[i].userId);
        }
      }
      if (page > Math.ceil(data.data.length / memberOnePage)) {
        setPage(Math.ceil(data.data.length / memberOnePage));
      }
      setUserIdAdmin(admin);
    });
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Không thể xác thực người dùng!');
      });
    projectService
      .getUserJoin({ projectId: projectId })
      .then((res) => {
        setListUser(res.data.data.listUser);
        let list = [...res.data.data.listUser];
        let admin = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].admin === 'Admin') {
            admin.push(list[i].userId);
          }
        }
        setPage(1);
        setUserIdAdmin(admin);
        setSecurity(true);
      })
      .catch((err) => {
        if (err.response.data.error === 'ErrorSecurity') {
          window.location.href = '/error404';
        }
      });
  }, [page, projectId]);
  const setAdmin = async (memberId) => {
    projectService
      .setAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Thêm quyền admin thành công');
        socket.emit('loadMember', res.data.data.listUser);
      })
      .catch((err) => {
        toast('Lỗi');
        console.log(err.request);
      });
  };
  const dropAdmin = async (memberId) => {
    projectService
      .dropAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Xóa quyền admin thành công');
        socket.emit('loadMember', res.data.data.listUser);
      })
      .catch((err) => {
        toast.error(err.request.response.error);
      });
  };
  const deleteMember = async (memberId) => {
    projectService
      .deleteMember({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Xóa thành viên thành công!');
        socket.emit('loadMember', res.data.data.listUser);
      })
      .catch((err) => {
        toast.error(err.request.response.error);
      });
  };
  const getListPage = () => {
    let maxLen = listUser.length;
    let maxPage = Math.ceil(maxLen / memberOnePage);
    if (page < 1 || page > maxPage) {
      return;
    }
    let len = page * memberOnePage > maxLen ? maxLen : page * memberOnePage;
    let list = [];
    for (let i = (page - 1) * memberOnePage; i < len; i++) {
      list.push(listUser[i]);
    }
    for (let i = len; i < page * memberOnePage; i++) {
      list.push(NaN);
    }
    return list;
  };
  function RowUser({ index, user, status }) {
    if (typeof user.username === 'undefined') {
      return (
        <tr style={{ height: '81px' }}>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return (
      <tr>
        <th scope="row">
          <Media
            className="align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {}}>
            <div
              className="avatar  mr-3"
              // href="#pablo"
            >
              <img
                height="50"
                alt="..."
                src={
                  user.avatar === ''
                    ? 'https://api.hoclieu.vn/images/game/bbfb3597f173af631cb24f6ee0f8b8da.png'
                    : user.avatar
                }
                // src={require('assets/img/theme/bootstrap.jpg')}
              />
            </div>
            <Media>
              <span className="mb-0 text-sm">{user.username}</span>
            </Media>
          </Media>
        </th>
        <td>{user.email}</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className={status ? 'bg-success' : 'bg-warning'} />
            {status ? 'Online' : 'Offline'}
          </Badge>
        </td>
        <td>
          <span className="text-danger">{user.admin}</span>
          {user.admin !== '' && user.userCreated !== '' ? ', ' : ''}
          <span className="text-success">{user.userCreated}</span>
        </td>
        <td className="text-right">
          <UncontrolledDropdown
            disabled={userIdAdmin.indexOf(userId) !== -1 ? false : true}>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              disabled={userIdAdmin.indexOf(userId) !== -1 ? false : true}
              onClick={(e) => e.preventDefault()}>
              <i
                className={
                  userIdAdmin.indexOf(userId) !== -1
                    ? 'fas fa-ellipsis-v text-success'
                    : 'fas fa-ellipsis-v'
                }
              />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem
                onClick={(e) => {
                  setShowModal(true);
                  setDataModal({
                    id: user.userId,
                    type: 'setAdmin',
                    title: 'Bạn có muốn cấp quyền Admin cho ' + user.username,
                  });
                }}>
                <span className="text-primary">
                  <b>Set Admin</b>
                </span>
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  setShowModal(true);
                  setDataModal({
                    id: user.userId,
                    type: 'dropAdmin',
                    title: 'Bạn có muốn xóa quyền Admin của ' + user.username,
                  });
                }}>
                <span className="text-primary">
                  <b>Drop Admin</b>
                </span>
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  setShowModal(true);
                  setDataModal({
                    id: user.userId,
                    type: 'deleteMember',
                    title: 'Bạn có muốn xóa ' + user.username + ' khỏi Project',
                  });
                }}>
                <span className="text-danger">
                  <b>Delete member</b>
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    );
  }
  {
    return (
      security && (
        <div className="member-project">
          <Row>
            <Col>
              <Sidebar
                {...props}
                routes={[...routes]}
                logo={{
                  innerLink: '/admin/index',
                  imgSrc: require('../../../assets/img/brand/kahoot-logo.png'),
                  imgAlt: '...',
                }}
              />
            </Col>
            <Col md={10}>
              <HeadProject projectId={projectId} />
              <Container fluid>
                <Row>
                  <div className="col">
                    <Card className="shadow">
                      <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                        <h3 className="mb-0">Member</h3>
                        <Button
                          color="primary"
                          onClick={() => setShowInvite(true)}>
                          <i
                            className="fa fa-user-plus mr-1 "
                            aria-hidden="true"></i>
                          <span> Invite member</span>
                        </Button>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Gmail</th>
                            <th scope="col">Status</th>
                            <th scope="col">Admin</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {getListPage().map((value, i) => {
                            return (
                              <RowUser
                                index={i}
                                user={{ ...value }}
                                status={
                                  listOnline.indexOf(value.userId) !== -1
                                    ? true
                                    : false
                                }></RowUser>
                            );
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
                                  if (page === 1) {
                                    return;
                                  }
                                  setPage(page - 1);
                                }}>
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                              </PaginationLink>
                            </PaginationItem>
                            {Array.from(
                              {
                                length: Math.ceil(
                                  listUser.length / memberOnePage,
                                ),
                              },
                              (_, index) => index + 1,
                            ).map((value, index) => {
                              return (
                                <>
                                  <PaginationItem className="active">
                                    <PaginationLink
                                      onClick={(e) => {
                                        setPage(index + 1);
                                      }}>
                                      {index + 1}
                                    </PaginationLink>
                                  </PaginationItem>
                                </>
                              );
                            })}
                            <PaginationItem>
                              <PaginationLink
                                onClick={(e) => {
                                  if (
                                    page ===
                                    Math.ceil(listUser.length / memberOnePage)
                                  ) {
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
              </Container>{' '}
            </Col>
          </Row>
          <ModalTrueFalse
            show={showModal}
            data={{
              title: dataModal.title,
              button_1: {
                title: 'No',
                backgroundColor: 'rgb(242,242,242)',
                color: 'black',
              },
              button_2: {
                title: 'Yes',
                backgroundColor: 'rgb(226,27,60)',
                color: 'white',
              },
            }}
            setClose={() => {
              setShowModal(false);
            }}
            funcButton_1={() => {}}
            funcButton_2={() => {
              if (dataModal.type === 'setAdmin') {
                setAdmin(dataModal.id);
              } else if (dataModal.type === 'dropAdmin') {
                dropAdmin(dataModal.id);
              } else if (dataModal.type === 'deleteMember') {
                deleteMember(dataModal.id);
              }
            }}
            funcOnHide={() => {}}></ModalTrueFalse>
          <ModalInvite
            state={isShowInvite}
            setState={setShowInvite}
            projectId={projectId}
          />
        </div>
      )
    );
  }
};

export default MemberProject;
