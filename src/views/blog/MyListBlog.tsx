/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { blogService } from '../../services/blog/api';
import { DataUser } from '../user/Profile';
import BlogItem from './BlogItem';
// import ItemNotification from '../user/ItemNotification';
interface Props {
  dataUser: DataUser;
}
export enum SecurityBlog {
  Public = 'Public',
  Private = 'Private',
}
export enum MoneyBlog {
  Free = 'Free',
  Money = 'Money',
}
export interface Blog {
  _id: string;
  authorId: string;
  comments: Array<any>;
  content: string;
  createdAt: Date;
  describe: string;
  money: string;
  projectId: string;
  security: string;
  thumbnail: string;
  title: string;
  updatedAt: Date;
}
const MyListBlog: React.FC<Props> = (props: Props) => {
  const [listBlog, setListBlog] = useState<Array<Blog>>(null);
  useEffect(() => {
    blogService
      .getBlogUser({
        userId: props.dataUser.userId,
      })
      .then((res) => {
        setListBlog(res.data.data);
      });
  }, []);
  return (
    <div className="my-list-blog card-body">
      <Form>
        {listBlog?.map((blog, index) => (
          <BlogItem dataUser={props.dataUser} blog={blog} />
        ))}
      </Form>
    </div>
  );
};

export default MyListBlog;
