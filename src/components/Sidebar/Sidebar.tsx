import React, { useState } from 'react';
import { Link, NavLink as NavLinkRRD } from 'react-router-dom';
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
import { userService } from '../../services/user/api';
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
  return (
    <NavLink
      className="project-sidebar pl-5 pr-3 pb-1 d-flex justify-content-between
    align-items-center"
      activeClassName="active"
      href={'/member-project/' + props.item.projectId}>
      <div className="d-flex justify-content-center align-items-center ">
        <img
          style={{ borderRadius: '50%' }}
          alt=""
          width="30"
          height="30"
          src="https://kahoot.com/files/2020/10/FBTwitter_Coco_1020-600x338.png"
        />
        <div className="ml-2">{props.item.name}</div>
      </div>
      <div className="number-notifica">2</div>
    </NavLink>
  );
};
const Sidebar: React.FC<Props> = (props: Props) => {
  const [collapseOpen, setCollapseOpen] = useState<boolean>();
  const [myProject, setMyProject] = useState<any>([
    {
      name: 'Project Demo',
      icon: 'url',
      projectId: '60ac08df1450e2373835f8a5',
    },
    {
      name: 'Quản lý HTTT',
      icon: 'url',
      projectId: '60ac08df1450e2373835f8a5',
    },
  ]);
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
    return routes.map((prop, key) => {
      return (
        prop.active === true && (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={() => setCollapseOpen(false)}
              activeClassName="active">
              <i style={pStyle} className={prop.icon} />
              {prop.name}
            </NavLink>
            {/* {prop.path === '/board' &&
              myProject.map((item) => <ProjectSidebar item={item} />)} */}
          </NavItem>
        )
      );
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
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
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
            <NavItem key={'project'}>
              <NavLink
                to={'/admin/board'}
                tag={NavLinkRRD}
                onClick={() => setCollapseOpen(false)}
                activeClassName="active">
                <i
                  style={{
                    fontSize: '24px',
                  }}
                  className="ni ni-book-bookmark text-primary"
                />
                Project
              </NavLink>
              {myProject.map((item) => (
                <ProjectSidebar item={item} />
              ))}
            </NavItem>
            <NavItem className="active-pro active">
              <NavLink href="auth/logout" onClick={(e) => userService.logOut()}>
                <i className="ni ni-spaceship" />
                Sign out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
Sidebar.defaultProps = {
  routes: [{}],
};
export default Sidebar;
