import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from 'reactstrap';
import UserHeader from '../../components/Headers/UserHeader';
import { chatService } from '../../services/chat/api';
import { userService } from '../../services/user/api';
import MyListBlog from '../blog/MyListBlog';
import InfoUser from './InfoUser';

interface DataUser {
  role: string;
  username: string;
  avatar: string;
  language: string;
  email: string;
  birthday: string;
  userId: string;
}
const Profile: React.FC = () => {
  const { params } = useRouteMatch();
  const { id } = params as any;
  const [isBlog, setIsBlog] = useState<boolean>(false);
  const history = useHistory();
  const [dataUser, setDataUser] = useState<DataUser>({
    role: '',
    username: '',
    avatar: '',
    language: '',
    email: '',
    birthday: '',
    userId: '',
  });
  const [buttonEdit, setTrangThai] = useState({
    status: true,
    statusName: 'Edit Profile',
    colorStatus: '',
  });
  let dataUpdate = {
    newUsername: dataUser.username,
    newAvatar: dataUser.avatar,
    newLanguage: dataUser.language,
    newBirthday: dataUser.birthday,
  };
  const connectUser = (content: String) => {
    chatService
      .addChat({
        friendId: id,
        content: content,
      })
      .then((res) => {
        history.push(`/admin/message`);
      })
      .catch((err) => {
        toast.error('Chưa gửi được tin nhắn');
      });
  };
  useEffect(() => {
    userService
      .getUserInfo(id)
      .then((response) => {
        Promise.resolve({
          data: JSON.parse(JSON.stringify(response.data.data)),
        }).then((post) => {
          setDataUser(post.data);
        });
        history.push(`/admin/user-profile/${response.data.data.userId}`);
      })
      .catch((res) => {
        toast.error('Không tồn tại User');
        history.push(`/admin/index`);
      });
  }, [id]);

  const postUpdateDataUser = () => {
    userService
      .updateUser(dataUpdate)
      .then((res) => {
        toast.success(res.data.message);
        setDataUser({
          ...dataUser,
          role: dataUser.role,
          username: dataUpdate.newUsername,
          avatar: dataUpdate.newAvatar,
          language: dataUpdate.newLanguage,
          email: dataUser.email,
          birthday: dataUpdate.newBirthday,
        });
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  const changeButtonEdit = () => {
    if (buttonEdit.statusName === 'Save') {
      postUpdateDataUser();
    }
    setTrangThai({
      status: !buttonEdit.status,
      statusName:
        buttonEdit.statusName === 'Edit Profile' ? 'Save' : 'Edit Profile',
      colorStatus:
        buttonEdit.statusName === 'Edit Profile' ? 'btn btn-danger' : '',
    });
  };
  const getFieldUpdate = (event) => {
    if (buttonEdit.statusName === 'Save') {
      dataUpdate['new' + event.target.name] = event.target.value;
    }
  };

  return (
    <>
      <UserHeader username={dataUser.username} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={dataUser.avatar}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    onClick={() => connectUser('hello')}
                    size="sm">
                    Message
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm">
                    Follow
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {dataUser.username}
                    <span className="font-weight-light">
                      ,{' '}
                      {new Date().getFullYear() -
                        Number(dataUser.birthday.split('-')[0])}
                    </span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Cầu Giấy, Hà Nội
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {dataUser.role === 'member' ? 'Student' : 'Teacher'}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Đại học Công Nghệ - Đại học Quốc Gia Hà Nội
                  </div>
                  <hr className="my-4" />
                  <p className="px-3">
                    Học làm chi, thi làm gì. Tú Xương còn rớt,huống chi là mình
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => setIsBlog(true)}>
                      Blog
                    </Button>
                    {isBlog ? (
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => setIsBlog(false)}>
                        Infomation
                      </Button>
                    ) : (
                      <Button
                        className={buttonEdit.colorStatus}
                        color="info"
                        onClick={(e) => changeButtonEdit()}
                        size="sm">
                        {buttonEdit.statusName}
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row></Row>
              </CardHeader>
              {isBlog ? (
                <MyListBlog />
              ) : (
                <InfoUser
                  dataUser={dataUser}
                  buttonEdit={buttonEdit}
                  getFieldUpdate={getFieldUpdate}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
