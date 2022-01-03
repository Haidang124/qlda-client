/* eslint-disable jsx-a11y/img-redundant-alt */
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import '../../assets/scss/component/itemnotification.scss';
import { notificationServive } from '../../services/notification/api';
import { projectService } from '../../services/projects/api';
import { Notification } from './UserNotification';

interface Props {
  data: Notification;
  setData: (data: Array<Notification>) => void;
}

const ItemNotification: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const joinProject = (status) => {
    projectService
      .joinProject({
        notificationId: props.data._id,
        status: status,
      })
      .then((res) => {
        if (status) {
          toast.success('Bạn đã đồng ý tham gia project thành công!');
          history.push(`/member-project/${props.data.projectId._id}`);
        } else {
          toast.success('Bạn đã từ chối tham gia project thành công!');
        }
        props.setData((res.data.data as Array<Notification>).reverse() || []);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };
  const returnContent = () => {
    switch (props.data.type) {
      case 'add-assignment':
        return (
          <>
            Bạn được thêm vào task: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.taskId.name || 'NAN'}
            </span>
            ' - project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'del-assignment':
        return (
          <>
            Bạn bị xóa khỏi task: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.taskId.name || 'NAN'}
            </span>
            ' - project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'new-chat':
        return (
          <>
            Bạn có tin nhắn mới từ '
            <span>{props.data.authorId.username || 'NAN'}</span>'
          </>
        );
      case 'project-invite':
        return (
          <>
            Bạn được mời tham gia project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'project-refuse':
        return (
          <>
            Đã từ chối tham gia project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'project-agree':
        return (
          <>
            Đã đồng ý tham gia project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'project-refuse-invited':
        return (
          <>
            Bạn đã từ chối tham gia project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'project-agree-invited':
        return (
          <>
            Bạn đã đồng ý tham gia project: '
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.projectId.name || 'NAN'}
            </span>
            '
          </>
        );
      case 'add-blog':
        return (
          <>
            Đã yêu cầu Admin phê duyệt blog{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.blogId?.title || 'NAN'}
            </span>
          </>
        );
      case 'add-blog-agree':
        return (
          <>
            Admin đã đồng ý phê duyệt blog{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.blogId?.title || 'NAN'}
            </span>
          </>
        );
      case 'add-blog-refuse':
        return (
          <>
            Admin đã từ chối phê duyệt blog{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.blogId?.title || 'NAN'}
            </span>
          </>
        );
      case 'withdrawal-admin':
        return (
          <>
            Đã yêu cầu phê duyệt rút{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.administratorId?.amount || 'NAN'}
            </span>{' '}
            VNĐ
          </>
        );
      case 'withdrawal-user':
        return (
          <>
            Bạn đã yêu cầu phê duyệt rút{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.administratorId?.amount || 'NAN'}
            </span>{' '}
            VNĐ
          </>
        );
      case 'withdrawal-admin-agree':
        return (
          <>
            Admin đã đồng ý phê duyệt rút{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.administratorId?.amount || 'NAN'}
            </span>{' '}
            VNĐ
          </>
        );
      case 'withdrawal-admin-refuse':
        return (
          <>
            Admin đã từ chối phê duyệt rút{' '}
            <span style={{ color: '#05008f', fontWeight: 'bold' }}>
              {props.data.administratorId?.amount || 'NAN'}
            </span>{' '}
            VNĐ
          </>
        );
      case 'content':
        return <>{props.data.content}</>;
    }
  };
  const showAuthorName = () => {
    switch (props.data.type) {
      case 'project-agree-invited':
      case 'project-refuse-invited':
        return false;
      default:
        return true;
    }
  };
  return (
    <div className="item-notification w-100">
      <a href="#!" className="list-group-item list-group-item-action">
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              alt="Image placeholder"
              src={props.data.authorId.avatar}
              className="avatar rounded-circle"
            />
          </div>
          <div className="col ml--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 text-sm">
                  {showAuthorName() ? props.data.authorId.username : ''}
                </h4>
              </div>
              <div className="text-muted">
                <small>{moment(props.data.createdAt).fromNow()}</small>
              </div>
              <div className="text-muted">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="#F06A6F"
                  onClick={(event) => {
                    event.stopPropagation();
                    // delete notification
                    notificationServive
                      .deleteNotification(props.data._id)
                      .then((res) => {
                        props.setData(res.data.data);
                      });
                  }}
                />
              </div>
            </div>
            <p className="text-sm mb-0">{returnContent()}</p>
            {props.data.type === 'project-invite' ? (
              <>
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-fill bd-highlight">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        joinProject(false);
                      }}>
                      Từ chối
                    </button>
                  </div>
                  <div className="p-2 flex-fill bd-highlight">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        joinProject(true);
                      }}>
                      Tham gia
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ItemNotification;
