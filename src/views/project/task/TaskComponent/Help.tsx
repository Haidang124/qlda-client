/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Assignment } from '../InterfaceTask';
import '../../../../assets/scss/component/help.scss';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { projectService } from '../../../../services/projects/api';
import { toast } from 'react-toastify';

interface PropsAssignee {
  assignment: Array<Assignment>;
  projectId: string;
  config?: {
    isShowName?: boolean;
    style?: any;
    isDisabled?: boolean;
  };
  handleInvite?: (user: Assignment) => void;
  handleDelete?: (user: Assignment) => void;
}

export const DropdownAssignee: React.FC<PropsAssignee> = (
  props: PropsAssignee,
) => {
  const [isShowInvite, setIsShowInvite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usersOutTask, setUserOutTask] = useState<Array<Assignment>>([]);
  useEffect(() => {
    projectService
      .getUsers(props.projectId)
      .then((res) => {
        let listUsers = [];
        for (let i = 0; i < res.data.data.length; i++) {
          let assignee = props.assignment.filter(
            (ass) => ass._id === res.data.data[i]._id,
          );
          if (assignee.length === 0) {
            listUsers.push(res.data.data[i]);
          }
          if (i === res.data.data.length - 1) {
            setUserOutTask(listUsers);
          }
        }
      })
      .catch((err) => {
        toast.error(
          err.response.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  }, [props.assignment]);
  return (
    <div className="user-assignee-block">
      <Dropdown
        show={props.config.isDisabled ? false : showModal}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onToggle={(isOpen, event, metadata) => {
          setShowModal(isOpen);
          if (!isOpen) {
            setIsShowInvite(false);
          }
        }}>
        <Dropdown.Toggle
          style={{
            padding: '0px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            ...props.config.style,
          }}>
          <div className="d-flex align-items-center justify-content-center user-avatar">
            {props.assignment.length}+
          </div>
        </Dropdown.Toggle>
        <span className="pl-2">
          {props.config?.isShowName && props.assignment.length > 0
            ? props.assignment.map((value) => (
                <span className="p-1">{value.username};</span>
              ))
            : ''}
        </span>
        <Dropdown.Menu>
          {isShowInvite ? (
            <div className="w-100 p-3">
              <div className="d-flex bd-highlight border border-top-0 border-right-0 border-left-0 mb-3">
                <div className="flex-grow-1 bd-highlight">Assignee</div>
                <div
                  className="bd-highlight"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsShowInvite(false);
                  }}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              {usersOutTask.map((user) => (
                <div className="d-flex bd-highlight justify-content-center align-items-center">
                  <div className="p-2 bd-highlight">
                    <img src={user.avatar} className="user-avatar" />
                  </div>
                  <div className="mr-auto bd-highlight pl-1 pr-1">
                    {user.username}
                  </div>
                  <div className="p-2 bd-highlight">
                    <div
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (props.handleInvite) {
                          props.handleInvite(user);
                        }
                      }}>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center p-2">Assignee</div>
              {props.assignment.map((user, index) => {
                return (
                  <Dropdown.Item>
                    <div className="d-flex bd-highlight align-items-center">
                      <div className="p-2 bd-highlight">
                        <img src={user.avatar} className="user-avatar" />
                      </div>
                      <div className="mr-auto bd-highlight pl-1 pr-1">
                        {user.username}
                      </div>
                      <div className="bd-highlight pl-1 pr-1">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color="#F06A6F"
                          onClick={(event) => {
                            event.stopPropagation();
                            props.handleDelete(user);
                          }}
                        />
                      </div>
                    </div>
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Item className="border border-left-0 border-right-0 border-bottom-0">
                <div
                  className="d-flex bd-highlight align-items-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsShowInvite(true);
                  }}>
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faPlus} color="#5882CC" />
                  </div>
                  <div
                    className="mr-auto bd-highlight pl-1 pr-1"
                    style={{ color: '#5882CC' }}>
                    Thêm assignee
                  </div>
                </div>
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
interface PropsCalendar {
  startDate: Date;
  endDate: Date;
  handleChangeDate?: (from, to) => void;
  config?: {
    isDisabled?: boolean;
    breakLine?: boolean;
  };
}
export const CalenderModal: React.FC<PropsCalendar> = (
  props: PropsCalendar,
) => {
  const [state, setState] = useState([
    {
      startDate: props.startDate,
      endDate: props.endDate,
      key: 'selection',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const renderDate = () => {
    return (
      <>
        {moment.utc(state[0].startDate).local().format('DD/MM/YYYY')}
        {props.config.breakLine ? <br /> : ''}-{' '}
        {moment.utc(state[0].endDate).local().format('DD/MM/YYYY')}
      </>
    );
  };
  const renderCalendar = () => {
    // choose date from ... to ...
    return (
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          setState([item.selection]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    );
  };
  return (
    <div className="calendar-modal">
      <Dropdown
        show={props.config?.isDisabled ? false : showModal}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onToggle={(isOpen, event, metadata) => {
          setShowModal(isOpen);
          if (!isOpen) {
            setState([
              {
                startDate: props.startDate,
                endDate: props.endDate,
                key: 'selection',
              },
            ]);
          }
        }}>
        <Dropdown.Toggle
          style={{ padding: '0px', margin: '0px', borderRadius: '5px' }}>
          <div className="btn btn-outline-primary btn-sm">{renderDate()}</div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <>
            {renderCalendar()}
            <div className="d-flex bd-highlight p-2 footer-modal">
              <div className="bd-highlight">
                <div
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setShowModal(false);
                    if (
                      state[0].startDate?.toDateString() !==
                        props.startDate?.toDateString() ||
                      state[0].endDate?.toDateString() !==
                        props.endDate?.toString()
                    ) {
                      props.handleChangeDate(
                        state[0].startDate,
                        state[0].endDate,
                      );
                    }
                  }}>
                  Lưu
                </div>
              </div>
            </div>
          </>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
