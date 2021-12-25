/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// reactstrap components
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import dataTopPick from '../../assets/data/dataTopPicks.json';
import { blogService } from '../../services/blog/api';
import { userService } from '../../services/user/api';
import { Role } from '../../views/project/wrapperUpgrade/WrapperUpgrade';

const Header: React.FC = () => {
  const [isShowTopic, setIsShowTopic] = useState<boolean>(true);
  const [dataBlog, setDataBlog] = useState<Array<any>>([]);
  const [dataUser, setDataUser] = useState<{
    _id: string;
    email: string;
    username: string;
    role: Role;
    avatar: string;
  }>(null);
  useEffect(() => {
    userService.getUserInfo().then((res) =>
      setDataUser({
        _id: res.data.data.userId,
        username: res.data.data.username,
        email: res.data.data.email,
        avatar: res.data.data.avatar,
        role: res.data.data.role,
      }),
    );
    blogService
      .getBlog()
      .then((post) => {
        setDataBlog(post.data.data);
      })
      .catch(() => {});
  }, []);
  return (
    <div className="header pb-8 pt-5 pt-md-8">
      <Container fluid>
        <div className="header-body">
          <Row>
            <Col lg="8" xl="8">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h2"
                        className="mb-0"
                        style={{
                          color: 'black',
                          borderBottom: '3px solid rgb(200,200,200)',
                        }}>
                        What's new
                      </CardTitle>
                    </div>
                  </Row>
                  <div className="mt-3 mb-0 text-sm">
                    {dataBlog.map((blog, key) => {
                      return (
                        <div
                          className="row mb-2"
                          style={{
                            borderBottom: '1px solid rgb(200,200,200)',
                            paddingBottom: '10px',
                          }}>
                          <div className="col-lg-2">
                            <img
                              src={blog.authorId.avatar}
                              alt=""
                              style={{
                                borderRadius: '5px',
                                width: '60px',
                                height: '60px',
                              }}
                            />
                          </div>
                          <div className="col-lg-10">
                            <span>
                              <a
                                href={'/admin/blog/' + blog._id}
                                style={{
                                  fontSize: '14px',
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                {blog.title}
                                {/* <Blog title="" content='' describe=""></Blog> */}
                              </a>
                            </span>
                            <br />
                            <span
                              style={{
                                display: 'block',
                                width: '100%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}>
                              {blog.describe}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="text-center">
                      <div
                        style={{ fontWeight: 'bold', color: 'blue' }}
                        onClick={() => setIsShowTopic(!isShowTopic)}>
                        <u>{isShowTopic ? 'Show more' : 'Hide'}</u>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <br />
              {/* Top Picks */}
              <Card
                className={`card-stats mb-4 mb-xl-0 ${
                  !isShowTopic ? 'd-none' : ''
                }`}>
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle tag="h2" className="mb-0">
                        <a
                          href="/"
                          style={{
                            color: 'black',
                            borderBottom: '3px solid rgb(19,104,206)',
                          }}>
                          Top picks
                        </a>
                      </CardTitle>
                    </div>
                  </Row>
                  <div className="mt-3 mb-0 text-sm">
                    {dataTopPick.map((value) => {
                      return (
                        <>
                          {/* One Temp */}
                          <a href="/">
                            <div className="row mb-3">
                              <div className="col-lg-4 col-md-4 col-sm-3">
                                <img
                                  style={{ borderRadius: '5px' }}
                                  src={value.imgIcon}
                                  width="120px"
                                  height="80px"
                                  alt=""
                                />
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-9">
                                <Card style={{ height: '80px' }}>
                                  <CardTitle
                                    style={{
                                      paddingLeft: '15px',
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}>
                                    {value.title}
                                  </CardTitle>
                                  <CardBody
                                    style={{
                                      backgroundColor: 'rgb(242,242,242)',
                                      padding: '0 0 0 15px',
                                      color: 'black',
                                    }}>
                                    <div className="row">
                                      <div className="col-8">
                                        {value.describe}
                                      </div>
                                      <div
                                        className="col-4"
                                        style={{ fontWeight: 'bold' }}>
                                        {value.plays}
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            </div>
                          </a>
                          {/* End One Temp */}
                        </>
                      );
                    })}
                    <br />
                    <div className="text-center">
                      <div style={{ fontWeight: 'bold', color: 'black' }}>
                        More awesomeness awaits! Search millions of kahoots on
                        any topic
                      </div>
                      <br />
                      <div
                        className="d-flex justify-content-center mb-2"
                        style={{ width: '100%' }}>
                        <button
                          className="btn-primary"
                          style={{
                            padding: '5px',
                            borderRadius: '5px',
                            backgroundColor: 'rgb(19,104,206)',
                            fontWeight: 'bold',
                          }}>
                          Discover Blog
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="mb-0"
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          borderBottom: '1px solid rgb(242,242,242)',
                        }}>
                        My Blog
                      </CardTitle>
                    </div>
                  </Row>
                  <div
                    className="mt-3 mb-0 text-sm"
                    style={{ padding: '0 15px 0 15px' }}>
                    <Row
                      style={{
                        backgroundColor: 'rgb(242,242,242)',
                        borderRadius: '6px',
                        border: '1px dashed rgb(208,208,208)',
                      }}>
                      <p className="text-muted text-center p-3">
                        Discover Medium writers you already follow on Twitter.
                      </p>
                      {dataUser?.role !== Role.Admin && (
                        <div
                          className="d-flex justify-content-center mb-2"
                          style={{ width: '100%' }}>
                          <a href="/editor">
                            <button
                              className="btn-primary"
                              style={{
                                padding: '5px',
                                borderRadius: '5px',
                                backgroundColor: 'rgb(19,104,206)',
                                fontWeight: 'bold',
                              }}>
                              Create Blog
                            </button>
                          </a>
                        </div>
                      )}
                    </Row>
                  </div>
                </CardBody>
              </Card>
              <br />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
