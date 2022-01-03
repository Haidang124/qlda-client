/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { blogService } from '../../services/blog/api';
import moment from 'moment';
import { userService } from '../../services/user/api';
import { Assignment } from '../project/task/InterfaceTask';
import Pricing from '../Pricing';
import { toast } from 'react-toastify';
// import dataBlogs from '../../assets/data/dataBlog.json';

const Blog: React.FC = () => {
  const { params } = useRouteMatch();
  const blogId = (params as any).id;
  const [dataBlog, setDataBlog] = useState<any>();
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState<Assignment>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    blogService
      .getBlog({ blogId: blogId })
      .then((post) => {
        setIsShow(true);
        setDataBlog(post.data.data);
      })
      .catch((err) => {
        switch (err?.response?.data?.error) {
          case 'SecurityPrivate':
            toast.warning(
              'Bài viết được để chế độ riêng tư. Bạn không thể xem bài viết',
            );
            break;
          case 'UpgradeAccount':
            toast.warning(
              'Hãy nâng cấp tài khoản lên Pro để xem được bài viết',
            );
            userService
              .getUserInfo()
              .then((res) => {
                setUser(res.data.data);
              })
              .catch((err) => {
                toast.error('Lỗi lấy dữ liệu');
              });
            setShowModal(true);
            break;
        }
      });
  }, []);

  return isShow ? (
    <div className="blog pb-8 pt-5 pt-md-7">
      <div className="blog-detail row d-flex justify-content-center">
        <div
          className="col-11 w-100 h-100"
          style={{ backgroundColor: 'rgb(38,137,12)' }}>
          <div className="row d-flex justify-content-center pt-3">
            <div className="col-8 text-white">
              <a href="/admin/index" className="text-white">
                <u>Back to blog</u>
              </a>
              <div
                className="mt-3"
                style={{ fontSize: '40px', fontWeight: 'bold' }}
                id="title">
                {dataBlog?.title}
              </div>
              <div className="mt-3" id="describe" style={{ fontSize: '20px' }}>
                {dataBlog?.describe}
              </div>
              <a href="/" style={{ color: 'white' }}>
                <div
                  id="author"
                  className="row w-100 d-flex flex-row bd-highlight mt-3">
                  <div id="icon_image" className="p-2 bd-highlight">
                    <img
                      src={
                        dataBlog?.authorId?.avatar ||
                        'https://kahoot.com/files/2017/05/craig_kahoot_avatar.png'
                      }
                      style={{
                        width: '60px',
                        height: '60px',
                        border: '3px solid white',
                        borderRadius: '50%',
                      }}
                      alt=""
                    />
                  </div>
                  <div id="username" className="p-2 bd-highlight">
                    <span style={{ fontWeight: 'bold' }}>
                      <u>{dataBlog?.authorId?.username}</u>
                    </span>
                    <br />
                    <span>{moment(dataBlog?.createdAt).fromNow()}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className="blog-content col-8 mt-5"
          id="content"
          style={{ fontSize: '18px', lineHeight: '40px', color: 'black' }}>
          <div
            dangerouslySetInnerHTML={{
              __html: dataBlog?.content,
            }}
          />
          <br />
          <br />
          <br />
        </div>
        <div
          className="col-11 w-100 h-100 pt-4"
          style={{ backgroundColor: 'rgb(38,137,12)' }}>
          <div className="row d-flex justify-content-center pt-3">
            <div className="col-8 text-white">
              <a href="/" style={{ color: 'white' }}>
                <div
                  id="author"
                  className="row w-100 d-flex flex-row bd-highlight mt-3">
                  <div id="icon_image" className="p-2 bd-highlight">
                    <img
                      src={
                        dataBlog?.authorId?.avatar ||
                        'https://kahoot.com/files/2017/05/craig_kahoot_avatar.png'
                      }
                      style={{
                        width: '60px',
                        height: '60px',
                        border: '3px solid white',
                        borderRadius: '50%',
                      }}
                      alt=""
                    />
                  </div>
                  <div id="username" className="p-2 bd-highlight">
                    <span style={{ fontWeight: 'bold' }}>
                      <u>{dataBlog?.authorId?.username}</u>
                    </span>
                    <br />
                    <span>{moment(dataBlog?.createdAt).fromNow()}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <img
          className="mt-9"
          style={{ marginLeft: '25%' }}
          src="../../../image/404.svg"
          alt="404 not found"
          height={500}
        />
      </div>
      <Pricing
        state={showModal}
        setState={(status) => {
          setShowModal(status);
        }}
        role={user?.role}
      />
    </div>
  );
};

export default Blog;
