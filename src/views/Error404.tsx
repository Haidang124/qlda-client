import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { userService } from '../services/user/api';

const Error404: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>();
  useEffect(() => {
    userService
      .getUser()
      .then((res) => setIsLogin(true))
      .catch((error) => setIsLogin(false));
  }, []);
  const [count, setCount] = useState(3);
  const history = useHistory();
  useEffect(() => {
    const intervalId = setInterval(() => {
      let time = count;
      setCount(time - 1);
      if (!count) {
        history.push(isLogin ? '/admin/index' : '/auth/login');
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="text-center p-5 m-5">
      <div className="mb-4">
        <img src="/image/404.svg" alt="404 not found" height={500} />
      </div>
      <h4>
        <b>Đường dẫn không chính xác</b>
      </h4>
      <h4>Bạn sẽ được chuyển về trang chủ sau {count} giây!</h4>
    </div>
  );
};

export default Error404;
