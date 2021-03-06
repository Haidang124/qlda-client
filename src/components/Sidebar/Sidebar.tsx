import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Link, NavLink as NavLinkRRD } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import '../../assets/scss/component/sidebar.scss';
import ModalCreate from '../../modals/ModalCreate';
import { projectService } from '../../services/projects/api';
import { userService } from '../../services/user/api';
import socket from '../../socketioClient';
import { Role } from '../../views/project/wrapperUpgrade/WrapperUpgrade';
interface Props {
  routes: Array<any>;
  logo: {
    innerLink: string;
    outterLink?: string;
    imgSrc: any;
    imgAlt: string;
  };
}
const ProjectSidebar: React.FC<any> = (props) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  return (
    <NavLink
      className="project-sidebar pl-5 pr-3 pb-1 pt-1 d-flex justify-content-between
    align-items-center"
      style={{
        backgroundColor: projectId === props.item._id ? '#e8ebed' : 'white',
        borderRadius: '5px',
      }}
      activeClassName="active"
      href={'/member-project/' + props.item._id}>
      <div className="d-flex justify-content-center align-items-center ">
        <img
          style={{ borderRadius: '50%' }}
          alt=""
          width="30"
          height="30"
          src={props.item.avatar}
        />
        <div className="ml-2">{props.item.name}</div>
      </div>
      <div className="number-notifica">2</div>
    </NavLink>
  );
};
const Sidebar: React.FC<Props> = (props: Props) => {
  const [collapseOpen, setCollapseOpen] = useState<boolean>();
  // eslint-disable-next-line
  const [myProject, setMyProject] = useState<any>([]);
  const [isShowCreate, setShowCreate] = useState(false);
  const [user, setUser] = useState<{
    _id: string;
    username: string;
    avatar: string;
    role: Role;
  }>();
  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        setUser({ ...res.data.data });
      })
      .catch((error) => {
        console.log(error.response?.data?.error);
      });
  }, []);
  const createProject = (name, description, avatar) => {
    projectService
      .addProject({ name: name, description: description, avatar: avatar })
      .then((res) => {
        let project = res.data.data.project;
        setMyProject([...myProject, project]);
        socket.emit('joinRoom', { roomId: project._id });
        toast.success('T???o project th??nh c??ng!');
        setShowCreate(false);
      })
      .catch((err) => {
        toast.error('Kh??ng th??? t???o project');
      });
  };
  useEffect(() => {
    projectService
      .getProject()
      .then((res) => {
        setMyProject(res.data.data);
      })
      .catch((err) => {
        toast.error('L???i kh??ng th??? l???y d??? li???u!');
      });
  }, []);
  const { routes, logo } = props;
  // const [navbarBrandProps, setNavbarBrandProps] = useState<boolean>();
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    };
  }

  const createLinks = (routes) => {
    const pStyle = {
      fontSize: '24px',
    };
    const routesAdmin = ['Administrators'];
    return routes.map((prop, key) => {
      let check = false;
      if (routesAdmin.includes(prop.name)) {
        if (user?.role === Role.Admin) {
          check = true;
        }
      } else {
        check = true;
      }
      if (check) {
        return (
          prop.active === true && (
            <NavItem key={key}>
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={() => setCollapseOpen(false)}
                activeClassName="active">
                <div className="d-flex justify-content-center align-items-center">
                  <i style={pStyle} className={prop.icon} />
                  <span className="pt-2 ml-3"> {prop.name}</span>
                </div>
              </NavLink>
              {/* {prop.path === '/board' &&
              myProject.map((item) => <ProjectSidebar item={item} />)} */}
            </NavItem>
          )
        );
      } else {
        return <></>;
      }
    });
  };
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main">
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapseOpen(!collapseOpen)}>
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require('../../assets/img/theme/team-1-800x800.jpg')}
                  />
                </span>
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
                href="/auth/logout"
                onClick={(e) => {
                  userService.logOut().then((res) => {});
                }}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={() => setCollapseOpen(!collapseOpen)}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <Nav navbar>{createLinks(routes)}</Nav>
          <hr className="my-3" />
          <Nav className="mb-md-3" navbar>
            {user?.role !== Role.Admin && (
              <NavItem key={'project'}>
                <div className="d-flex bd-highlight align-items-center">
                  <div className="p-2 w-100 bd-highlight align-items-center">
                    <div className="d-flex bd-highlight">
                      <div className="bd-highlight">
                        <i
                          style={{
                            fontSize: '24px',
                          }}
                          className="ni ni-book-bookmark text-primary"
                        />
                      </div>
                      <div className="bd-highlight ml-3">Project</div>
                    </div>
                  </div>
                  <div className="p-2 mr-3 flex-shrink-1 bd-highlight">
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setShowCreate(true);
                      }}
                      size={'lg'}
                    />
                  </div>
                </div>
                {myProject.map((item, index) => (
                  <ProjectSidebar item={item} key={index} />
                ))}
              </NavItem>
            )}
            <NavItem className="active-pro active">
              <NavLink
                href="/auth/logout"
                onClick={(e) => {
                  userService.logOut().then((res) => {});
                }}>
                <i className="ni ni-spaceship" />
                Sign out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      <ModalCreate
        state={isShowCreate}
        setState={setShowCreate}
        createProject={createProject}
      />
    </Navbar>
  );
};
Sidebar.defaultProps = {
  routes: [{}],
};
export default Sidebar;
