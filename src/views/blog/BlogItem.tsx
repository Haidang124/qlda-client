/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../assets/scss/component/itemblog.scss';

const BlogItem: React.FC<any> = (props: any) => {
  return (
    <div className="item-blog mx-4">
      <div className="PostItem_wrapper">
        <div className="PostItem_header">
          <div className="PostItem_author">
            <a href="/blog">
              <img
                src="https://cdn.fullstack.edu.vn/f8-learning/user_avatars/9143/616309bb2f85f.png"
                alt="Dong Ngo"
              />
            </a>
            <a href="/blog">
              <span>Dong Ngo</span>
            </a>
          </div>
        </div>
        <div className="PostItem_body">
          <div className="PostItem_info">
            <a href="/blog/thoi-gian-va-dong-luc.html">
              <h3>Thời gian và Động lực</h3>
            </a>
            <p>
              Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là
              "timetable". Hay dân dã hơn thì người ta hay gọi là "Lịch thường
              nhật",...
            </p>
            <div className="PostItem_info">
              <span>8 ngày trước</span>
              <span className="PostItem_dot">·</span>6 phút đọc
            </div>
          </div>
          <div className="PostItem_thumb">
            <a href="/blog/thoi-gian-va-dong-luc.html">
              <img
                src="https://cdn.fullstack.edu.vn/f8-learning/blog_posts/1671/61b6368a3a089.jpg"
                alt="Thời gian và Động lực"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
