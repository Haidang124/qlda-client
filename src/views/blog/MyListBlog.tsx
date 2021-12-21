import React from 'react';
import { Form } from 'reactstrap';
import BlogItem from './BlogItem';
// import ItemNotification from '../user/ItemNotification';
const MyListBlog: React.FC<any> = () => {
  return (
    <div className="my-list-blog card-body">
      <Form>
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </Form>
    </div>
  );
};

export default MyListBlog;
