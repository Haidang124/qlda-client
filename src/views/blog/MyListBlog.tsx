import React from 'react';
import { Form } from 'reactstrap';
import ItemNotification from '../user/ItemNotification';
const MyListBlog: React.FC<any> = ({}) => {
  return (
    <div className="my-list-blog card-body">
      <Form>
        <ItemNotification message="Đã giao task cho bạn" />
        <ItemNotification message="Đã giao task cho bạn" />
        <ItemNotification message="Đã giao task cho bạn" />
        <ItemNotification message="Đã giao task cho bạn" />
        <ItemNotification message="Đã giao task cho bạn" />
        <ItemNotification message="Đã giao task cho bạn" />
      </Form>
    </div>
  );
};

export default MyListBlog;
