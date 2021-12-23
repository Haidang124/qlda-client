/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
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
import { projectService } from '../../services/projects/api';
import { userService } from '../../services/user/api';
import socket from '../../socketioClient';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}

const ApproveContent: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [isShowInvite, setShowInvite] = useState(false);
  const [listUser, setListUser] = useState<
    Array<{
      _id: string;
      username: string;
      email: string;
      role: Role;
      avatar: string;
    }>
  >([]);
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
    socket.emit('loadOnline');
    socket.on('reloadUserOnline', (data) => {
      setListOnline(data);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [page, projectId]);
  const getData = () => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Không thể xác thực người dùng!');
      });
    projectService
      .getUsers(projectId)
      .then((res) => {
        setListUser(res.data.data.users);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId._id);
        });
        setUserIdAdmin(_userAdmin);
      })
      .catch((err) => {
        toast.error('Một lỗi không mong muốn đã xảy ra');
      });
  };
  const setAdmin = async (memberId) => {
    projectService
      .setAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Thêm quyền admin thành công');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(err.response.data.err || 'Một lỗi không mong muốn đã xảy');
      });
  };
  const dropAdmin = async (memberId) => {
    projectService
      .dropAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Xóa quyền admin thành công');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        console.log(res.data.data);
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  const deleteMember = async (memberId) => {
    projectService
      .deleteMember({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Xóa thành viên thành công!');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(err.request.response.error);
      });
  };
  const getListPage = (): Array<{
    _id: string;
    username: string;
    email: string;
    role: Role;
    avatar: string;
  }> => {
    let maxLen = listUser.length;
    let maxPage = Math.ceil(maxLen / memberOnePage);
    if (page < 1 || page > maxPage) {
      return [];
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
  function RowUser({ user, status }) {
    // if (typeof user.username === 'undefined') {
    //   return (
    //     <tr style={{ height: '81px' }}>
    //       <th scope="row"></th>
    //       <td></td>
    //       <td></td>
    //       <td></td>
    //       <td></td>
    //     </tr>
    //   );
    // }
    return (
      <tr>
        <th scope="row">1</th>
        <th scope="row">Hải Đăng</th>
        <th scope="row">haidang@gmail.com</th>
        <td>blog</td>
        <td>
          {status ? (
            <i className="fas fa-check" style={{ color: 'green' }}></i>
          ) : (
            <i className="fas fa-times" style={{ color: 'red' }}></i>
          )}
        </td>
        <td>
          <a className="table-action" href="#pablo" id="tooltip564981685">
            {!status ? (
              <i className="fas fa-check" style={{ color: 'green' }}></i>
            ) : (
              <i className="fas fa-times" style={{ color: 'red' }}></i>
            )}
          </a>
          <a
            className="table-action table-action-delete ml-3"
            href="#pablo"
            id="tooltip601065234">
            <i className="fas fa-trash"></i>
          </a>
        </td>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
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
                    id: user._id,
                    type: 'setAdmin',
                    title: 'Bạn có muốn cấp quyền Admin cho ' + user.username,
                  });
                }}>
                <span className="text-primary">
                  <b>Xem chi tiết</b>
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    );
  }
  return (
    <div className="approve-content" style={{ overflowY: 'hidden' }}>
      <Container fluid>
        <Row>
          <div className="col">
            <Card className="shadow" style={{ marginTop: '100px' }}>
              <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                <h3 className="mb-0">Nội dung phê duyệt</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">stt</th>
                    <th scope="col">Username</th>
                    <th scope="col">Gmail</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Function</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {/* {userIdAdmin &&
                    userIdAdmin.length > 0 &&
                    getListPage().map((value, i) => {
                      return (
                        <RowUser
                          user={{ ...value }}
                          status={
                            listOnline.indexOf(value._id) !== -1 ? true : false
                          }></RowUser>
                      );
                    })} */}
                  <RowUser user={null} status={false}></RowUser>
                  <RowUser user={null} status={true}></RowUser>
                  <RowUser user={null} status={false}></RowUser>
                  <RowUser user={null} status={true}></RowUser>
                  <RowUser user={null} status={false}></RowUser>
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
                        length: Math.ceil(listUser.length / memberOnePage),
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
                            page === Math.ceil(listUser.length / memberOnePage)
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
      </Container>
    </div>
  );
};

export default ApproveContent;
