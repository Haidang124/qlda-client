/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../assets/scss/component/itemblog.scss';
import { DataUser } from '../user/Profile';
import { Blog } from './MyListBlog';
import moment from 'moment';

interface PropsBlog {
  blog: Blog;
  dataUser: DataUser;
}

const BlogItem: React.FC<PropsBlog> = (props: PropsBlog) => {
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
          </div>
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
      </div>
    </div>
  );
};

export default BlogItem;
