import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { confirmService } from '../services/mailer/api';

const Confirm: React.FC = () => {
  const { params } = useRouteMatch();
  const { confirmId } = params as any;
  useEffect(() => {
    confirmService
      .confirmMail({ confirmId: confirmId })
      .then((res) => {
        window.location.href = '/member-project/' + res.data.data.projectId;
      })
      .catch((err) => {
        switch (err.response.data.error) {
          case 'FailCheckComfirm':
            alert('Lỗi xác nhận!');
            window.location.href = '/admin/index';
            break;
          default:
            alert('Error!!!');
            window.location.href = '/admin/index';
        }
        // alert("Lỗi xác nhận!");
      });
  }, [confirmId]);
  return <> </>;
};

export default Confirm;
