/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { userService } from '../../services/user/api';
import { Role } from '../project/wrapperUpgrade/WrapperUpgrade';
import ApproveContent from './ApproveContent';
import ApproveUser from './ApproveUser';
import ApproveWithdrawal from './ApproveWithdrawal';
const Administrators: React.FC = () => {
  const [isCheckRole, setIsCheckRole] = useState(false);
  const history = useHistory();
  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        if (res.data?.data?.role === Role.Admin) {
          setIsCheckRole(true);
        } else {
          toast.error('Không có quyền truy cập');
          history.push('/');
          setIsCheckRole(false);
        }
      })
      .catch((error) => {
        history.push('/');
        console.log(error.response?.data?.error);
      });
  }, []);
  return (
    <>
      {isCheckRole && (
        <div className="administrators">
          <ApproveUser />
          <ApproveContent />
          <ApproveWithdrawal />
        </div>
      )}
    </>
  );
};

export default Administrators;
