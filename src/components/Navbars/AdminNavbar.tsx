import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Container, Navbar } from 'reactstrap';
import { userService } from '../../services/user/api';
import UserNotification from '../../views/user/UserNotification';

const AdminNavbar: React.FC<any> = (props: any) => {
  const [dataUser, setDataUser] = useState({
    username: '',
    avatar: '',
  });
  useEffect(() => {
    userService.getUserInfo().then((response) =>
      Promise.resolve({
        data: JSON.stringify(response.data.data),
      }).then((post) => {
        setDataUser(JSON.parse(post.data));
      }),
    );
  }, []);
  return (
    <Navbar
      className="navbar-top navbar-dark"
      expand="md"
      id="navbar-main"
      style={{ backgroundColor: 'rgb(70,23,143)' }}>
      <Container fluid>
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/">
          {props.brandText}
        </Link>
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group" style={{ border: 'none' }}>
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>
        <UserNotification dataUser={dataUser} />
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
