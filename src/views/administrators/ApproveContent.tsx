/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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
import { blogService } from '../../services/blog/api';
import { TypeContent } from './interface';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}
interface Blog {
  _id: string;
  authorId: {
    _id: string;
    username: string;
    email: string;
    role: Role;
    avatar: string;
  };
  blogId: {
    _id: string;
    title: string;
  };
  createdAt: Date;
  status: number;
  type: string;
  updatedAt: string;
}
const ApproveContent: React.FC = () => {
  const [blogs, setBlogs] = useState<Array<Blog>>([]);
  const [blogShow, setBlogShow] = useState<Array<Blog>>([]);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const memberOnePage = 5;
  useEffect(() => {
    administratorService.getAllBlog().then((res) => {
      setBlogs(res.data.data);
    });
  }, [page]);
  useEffect(() => {
    let _dataShow = [];
    let min = (page - 1) * memberOnePage;
    let max = page * memberOnePage - 1;
    if (min < 0) {
      min = 0;
    }
    if (max > blogs.length - 1) {
      max = blogs.length - 1;
    }
    for (let i = min; i <= max; i++) {
      _dataShow.push(blogs[i]);
    }
    setBlogShow([..._dataShow]);
  }, [blogs, page]);
  const handleBlog = (blogId: string, status: boolean) => {
    administratorService
      .handleStatus({
        _id: blogId,
        type: TypeContent.blog,
        status: status,
      })
      .then((res) => {
        setBlogs([]);
        setBlogs(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  const changeStatus = (administratorId, status) => {
    administratorService
      .changeStatusBlog({
        administratorId: administratorId,
        status: status,
      })
      .then((res) => {
        setBlogs(res.data.data);
      });
  };
  function RowBlog(props: { blog: Blog; index: number }) {
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
                  props.blog?.authorId?.avatar === ''
                    ? '/image/avatar.png'
                    : props.blog?.authorId?.avatar
                }
                // src={require('assets/img/theme/bootstrap.jpg')}
              />
            </div>
            <Media>
              <span className="mb-0 text-sm">
                {props.blog?.authorId?.username}
              </span>
            </Media>
          </Media>
        </th>
        <th scope="row">{props.blog?.authorId?.email}</th>
        <td style={{ fontSize: '18px', fontWeight: 'bold' }}>
          <a href={'/admin/blog/' + props.blog?.blogId?._id}>
            {props.blog?.blogId?.title}
          </a>
        </td>
        <td>
          {props.blog?.status === 1 && (
            <i className="fas fa-check" style={{ color: 'green' }}></i>
          )}
          {props.blog?.status === -1 && (
            <i className="fas fa-times" style={{ color: 'red' }}></i>
          )}
        </td>
        <td>
          <a className="table-action" href="#pablo" id="tooltip564981685">
            {props.blog?.status === 0 ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm mr-2"
                  onClick={() => {
                    handleBlog(props.blog?.blogId?._id, true);
                  }}>
                  Phê duyệt
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    handleBlog(props.blog?.blogId?._id, false);
                  }}>
                  Từ chối
                </button>
              </>
            ) : (
              <>
                <button
                  className={
                    'btn btn-sm ' +
                    (props.blog?.status === 1
                      ? 'btn-outline-danger'
                      : 'btn-outline-primary')
                  }
                  onClick={() => {
                    changeStatus(
                      props.blog?._id,
                      props.blog?.status === 1 ? -1 : 1,
                    );
                  }}>
                  {props.blog?.status === 1 ? 'Lock' : 'Open'}
                </button>
              </>
            )}
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
                  true ? 'fas fa-ellipsis-v text-success' : 'fas fa-ellipsis-v'
                }
              />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem
                onClick={(e) => {
                  history.push('/admin/blog/' + props.blog?.blogId?._id);
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
            <Card className="shadow mt-4">
              <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                <h3 className="mb-0">Nội dung phê duyệt</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr style={{ textAlign: 'center' }}>
                    <th scope="col">stt</th>
                    <th scope="col">Username</th>
                    <th scope="col">Gmail</th>
                    <th scope="col">Title Blog</th>
                    <th scope="col">Status</th>
                    <th scope="col">Function</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {blogShow.map((blog, index) => (
                    <RowBlog blog={blog} index={index + 1}></RowBlog>
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
                        length: Math.ceil(blogs.length / memberOnePage),
                      },
                      (_, index) => index + 1,
                    ).map((value, index) => {
                      return (
                        <>
                          <PaginationItem
                            className={index + 1 === page ? 'active' : ''}>
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
                            page === Math.ceil(blogs.length / memberOnePage)
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
