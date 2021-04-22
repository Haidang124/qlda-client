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
  Progress,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
import ModalInvite from '../modals/ModalInvite';
import { projectService } from '../services/projects/api';
import HeadProject from './HeadProject';
import socket from '../socketioClient';

const MemberProject: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [isShowInvite, setShowInvite] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [security, setSecurity] = useState(null);
  const [listOnline, setListOnline] = useState([]);
  useEffect(() => {
    socket.emit('loadUserOnline');
    socket.on('reloadUserOnline', (data) => {
      setListOnline(data.data);
    })
    projectService.getUserJoin({projectId: projectId})
    .then((res) => {
      // console.log(res.data.data.listUser);
      setListUser(res.data.data.listUser);
      setSecurity(true);
    }).catch((err) => {
      if(err.response.data.error == "ErrorSecurity") {
        window.location.href = "/error404"
      }
    });
  },[]);
  function RowUser ({username, email, avatar, admin, status}) {
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar  mr-3"
            href="#pablo"
            onClick={(e) => e.preventDefault()}>
            <img
              height="50"
              alt="..."
              src={avatar == "" ? "https://api.hoclieu.vn/images/game/bbfb3597f173af631cb24f6ee0f8b8da.png" : avatar}
              // src={require('assets/img/theme/bootstrap.jpg')}
            />
          </a>
          <Media>
            <span className="mb-0 text-sm">
              {username}
            </span>
          </Media>
        </Media>
      </th>
      <td>{email}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className={status? "bg-success" : "bg-warning"} />
          {status? "Online": "Offline"}
        </Badge>
      </td>
      <td>
        {/* <div className="avatar-group">
          <a
            className="avatar avatar-sm"
            href="#pablo"
            id="tooltip742438047"
            onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="rounded-circle"
              src="https://randomuser.me/api/portraits/men/10.jpg"
            />
          </a>
          <UncontrolledTooltip
            delay={0}
            target="tooltip742438047">
            Ryan Tompson
          </UncontrolledTooltip>
        </div> */}
        <span style={{color:"green"}}>{admin}</span>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">60%</span>
          <div>
            <Progress
              max="100"
              value="60"
              barClassName="bg-danger" // bg-warning, bg-success
            />
          </div>
        </div>
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
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
              href="#pablo"
              onClick={(e) => e.preventDefault()}>
              Action
            </DropdownItem>
            <DropdownItem
              href="#pablo"
              onClick={(e) => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem
              href="#pablo"
              onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>);
  }
  if(security == null) {
    return <></>
  }
  else if(security == true) {
    return (
      <>
        <ModalInvite state={isShowInvite} setState={setShowInvite} />
        <HeadProject projectId={projectId} />
        <Container className="mt-4" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                  <h3 className="mb-0">Member</h3>
                  <Button color="primary" onClick={() => setShowInvite(true)}>
                    <i className="fa fa-user-plus mr-1 " aria-hidden="true"></i>
                    <span> Invite member</span>
                  </Button>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Gmail</th>
                      <th scope="col">Status</th>
                      <th scope="col">Admin</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {listUser.map((value, i) => {
                      return (<RowUser username={value.username} email={value.email} avatar={value.avatar} admin={value.admin} status={listOnline.indexOf(value.userId) != -1 ? true : false}></RowUser>);
                    })}                  
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0">
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}>
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
      </>
    );
  }
};

export default MemberProject;
