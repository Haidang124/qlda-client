/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import {
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
import { administratorService } from '../../services/administrator/api';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}

enum RoleName {
  'Admin' = 'Admin',
  'Member' = 'Free',
  'MemberPlus' = 'Plus',
  'MemberPro' = 'Pro',
}

const ApproveUser: React.FC = () => {
  const [page, setPage] = useState(1);
  const memberOnePage = 5;
  const [dataUser, setDataUser] = useState<Array<PropsRowUser>>([]);
  const [dataShow, setDataShow] = useState<Array<PropsRowUser>>([]);
  useEffect(() => {
    getData();
  }, [page]);
  useEffect(() => {
    let _dataShow = [];
    let min = (page - 1) * memberOnePage;
    let max = page * memberOnePage - 1;
    if (min < 0) {
      min = 0;
    }
    if (max > dataUser.length - 1) {
      max = dataUser.length - 1;
    }
    for (let i = min; i <= max; i++) {
      _dataShow.push(dataUser[i]);
    }
    setDataShow([..._dataShow]);
  }, [dataUser, page]);
  const getData = () => {
    administratorService
      .getAllUser()
      .then((res) => {
        setDataUser(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };

  interface PropsRowUser {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    role: Role;
    isActive: boolean;
  }

  const RowUser: React.FC<{ user: PropsRowUser; index: number }> = (props: {
    user: PropsRowUser;
    index: number;
  }) => {
    return (
      <tr style={{ textAlign: 'center' }}>
        <th scope="row">{props.index}</th>
        <th scope="row">
          <Media
            className="align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {}}>
            <div
              className="avatar mr-3"
              // href="#pablo"
            >
              <img
                height="50"
                alt="..."
                src={
                  props.user?.avatar === ''
                    ? '/image/avatar.png'
                    : props.user?.avatar
                }
                // src={require('assets/img/theme/bootstrap.jpg')}
              />
            </div>
            <Media>
              <span className="mb-0 text-sm">{props.user?.username}</span>
            </Media>
          </Media>
        </th>
        <th scope="row">{props.user.email}</th>
        <td>{RoleName[props.user.role]}</td>
        <td>
          {props.user.isActive ? (
            <i className="fas fa-lock-open"></i>
          ) : (
            <i className="fas fa-lock"></i>
          )}
        </td>
        <td>
          <a className="table-action" href="#pablo" id="tooltip564981685">
            {props.user.role !== Role.Admin &&
              (props.user.isActive ? (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    administratorService
                      .changeIsActive({
                        memberId: props.user._id,
                        isActive: false,
                      })
                      .then((res) => {
                        console.log(res.data.data);
                        setDataUser(res.data.data);
                      })
                      .catch((err) => {
                        toast.error(
                          err.response?.data?.error ||
                            'Một lỗi không mong muốn đã xảy ra',
                        );
                      });
                  }}>
                  Lock
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    administratorService
                      .changeIsActive({
                        memberId: props.user._id,
                        isActive: true,
                      })
                      .then((res) => {
                        setDataUser(res.data.data);
                      })
                      .catch((err) => {
                        toast.error(
                          err.response?.data?.error ||
                            'Một lỗi không mong muốn đã xảy ra',
                        );
                      });
                  }}>
                  Open
                </button>
              ))}
          </a>
        </td>
        <td className="text-right"></td>
      </tr>
    );
  };
  return (
    <div className="approve-content" style={{ overflowY: 'hidden' }}>
      <Container fluid>
        <Row>
          <div className="col">
            <Card className="shadow" style={{ marginTop: '100px' }}>
              <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                <h3 className="mb-0">Quản lý người dùng</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr style={{ textAlign: 'center' }}>
                    <th scope="col">stt</th>
                    <th scope="col">Username</th>
                    <th scope="col">Gmail</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Function</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {dataShow.map((user, index) => (
                    <RowUser
                      user={{ ...user }}
                      index={(page - 1) * memberOnePage + index + 1}
                    />
                  ))}
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
                        length: Math.ceil(dataUser.length / memberOnePage),
                      },
                      (_, index) => index + 1,
                    ).map((value, index) => {
                      return (
                        <>
                          <PaginationItem
                            className={page === index + 1 ? 'active' : ''}>
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
                            page === Math.ceil(dataUser.length / memberOnePage)
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

export default ApproveUser;
