/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import '../../assets/scss/component/itemblog.scss';
import { DataUser } from '../user/Profile';
import { Blog } from './MyListBlog';
import moment from 'moment';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import ModalTrueFalse from '../ModalTrueFalse';
import { blogService } from '../../services/blog/api';
import { toast } from 'react-toastify';

interface PropsBlog {
  blog: Blog;
  setDataBlog: (data) => void;
  dataUser: DataUser;
}

const BlogItem: React.FC<PropsBlog> = (props: PropsBlog) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="item-blog mx-4">
      <div className="PostItem_wrapper">
        <div className="PostItem_header">
          <div className="PostItem_author">
            <a href={'/admin/blog/' + props.blog._id}>
              <img
                src={
                  props.dataUser?.avatar ||
                  'https://cdn.fullstack.edu.vn/f8-learning/user_avatars/9143/616309bb2f85f.png'
                }
                alt={props.dataUser?.username}
              />
            </a>
            <a href={'/admin/blog/' + props.blog._id}>
              <span>{props.dataUser?.username}</span>
            </a>
            {props.blog.money === 'Money' && (
              <div className="ml-5" style={{ color: '#4433c4' }}>
                <i>Pro</i>
              </div>
            )}
          </div>
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
                  setShowModal(true);
                }}>
                <span className="text-danger">
                  <b>Xóa blog</b>
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="PostItem_body">
          <div className="PostItem_info" style={{ width: '100%' }}>
            <a href={'/admin/blog/' + props.blog._id}>
              <h3>{props.blog.title}</h3>
            </a>
            <p>{props.blog.describe}</p>
            <div className="PostItem_info">
              <span>{moment(props.blog.createdAt).fromNow()}</span>
              {/* <span className="PostItem_dot">·</span> */}
            </div>
          </div>
          <div className="PostItem_thumb">
            <a href={'/admin/blog/' + props.blog._id}>
              <img
                src={
                  props.blog.thumbnail ||
                  'https://cdn.fullstack.edu.vn/f8-learning/blog_posts/1671/61b6368a3a089.jpg'
                }
                height={'150px'}
                width={'300px'}
                alt={props.blog.title}
              />
            </a>
          </div>
        </div>
        <ModalTrueFalse
          show={showModal}
          data={{
            title: `Bạn có muốn xóa blog '${props.blog.title}'`,
            button_1: {
              title: 'No',
              backgroundColor: 'rgb(242,242,242)',
              color: 'black',
            },
            button_2: {
              title: 'Yes',
              backgroundColor: 'rgb(226,27,60)',
              color: 'white',
            },
          }}
          setClose={() => {
            setShowModal(false);
          }}
          funcButton_1={() => {
            setShowModal(false);
          }}
          funcButton_2={() => {
            blogService
              .removeBlog(props.blog._id)
              .then((res) => {
                props.setDataBlog(res.data.data);
                setShowModal(false);
              })
              .catch((err) => {
                toast.error('Một lỗi không mong muốn đã xảy ra');
              });
          }}
          onlyTitle={true}
          funcOnHide={() => {}}
        />
      </div>
    </div>
  );
};

export default BlogItem;
