/* eslint-disable jsx-a11y/alt-text */
import {
  faCalendar,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Task } from '../InterfaceTask';
import '../../../../assets/scss/component/help.scss';
import { DateRange, Calendar } from 'react-date-range';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const DropdownAssignee: React.FC<{
  task: Task;
  config?: {
    isShowName?: boolean;
    style?: any;
    handleInvite?: (email) => void;
  };
}> = (props: {
  task: Task;
  config?: {
    isShowName?: boolean;
    style?: any;
    handleInvite?: (email) => void;
  };
}) => {
  const [isShowInvite, setIsShowInvite] = useState(false);
  const [emailInvite, setEmailInvite] = useState<string>(null);
  return (
    <div className="user-assignee-block">
      <Dropdown
        onClick={(event) => {
          event.stopPropagation();
        }}
        onToggle={(isOpen, event, metadata) => {
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
          {props.task.assignee.length > 0 ? (
            <img src={props.task.assignee[0].avatar} className="user-avatar" />
          ) : (
            <img
              src={
                'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
              }
              className="user-avatar"
            />
          )}
        </Dropdown.Toggle>
        <span className="pl-2">
          {props.config?.isShowName && props.task.assignee.length > 0
            ? props.task.assignee.map((value) => (
                <span className="p-1">{value.userName};</span>
              ))
            : ''}
        </span>
        <Dropdown.Menu>
          {isShowInvite ? (
            <div className="w-100 p-3">
              <div className="d-flex justify-content-center border border-top-0 border-right-0 border-left-0 mb-3">
                Assignee
              </div>
              <div className="d-flex bd-highlight align-items-center">
                <div className="ml-auto bd-highlight pr-4">
                  <input
                    type="text"
                    className="h-100 p-2"
                    placeholder="Email"
                    value={emailInvite ? emailInvite : ''}
                    onChange={(event) => {
                      setEmailInvite(event.target.value);
                    }}
                  />
                </div>
                <div className="bd-highlight">
                  <div className="btn btn-primary btn-sm">Invite</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center p-2">Assignee</div>
              {props.task.assignee.map((user, index) => {
                return (
                  <Dropdown.Item>
                    <div className="d-flex bd-highlight align-items-center">
                      <div className="p-2 bd-highlight">
                        <img src={user.avatar} className="user-avatar" />
                      </div>
                      <div className="mr-auto bd-highlight pl-1 pr-1">
                        {user.userName}
                      </div>
                      <div className="bd-highlight pl-1 pr-1">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color="#F06A6F"
                          onClick={(event) => {
                            event.stopPropagation();
                            // delete assignee
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
                    <FontAwesomeIcon
                      icon={faPlus}
                      color="#5882CC"
                      onClick={(event) => {
                        event.stopPropagation();
                        // add user assignee
                      }}
                    />
                  </div>
                  <div
                    className="mr-auto bd-highlight pl-1 pr-1"
                    style={{ color: '#5882CC' }}>
                    Invite teammates via email
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
  startDate?: Date;
  endDate?: Date;
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
      startDate: props?.startDate || null,
      endDate: props?.endDate || null,
      key: 'selection',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isChooseDays, setIsChooseDays] = useState(
    props?.startDate ? true : false,
  );
  const renderDate = () => {
    if (!state[0].endDate) {
      return (
        <div className="d-flex align-items-center justify-content-center calendar-null">
          <FontAwesomeIcon icon={faCalendar} size={'lg'} />
        </div>
      );
    } else if (
      !state[0].startDate ||
      state[0].startDate.toDateString() === state[0].endDate.toDateString()
    ) {
      return moment.utc(state[0].endDate).local().format('DD/MM/YYYY');
    } else {
      return (
        <>
          {moment.utc(state[0].startDate).local().format('DD/MM/YYYY')}
          {props.config.breakLine ? <br /> : ''}-{' '}
          {moment.utc(state[0].endDate).local().format('DD/MM/YYYY')}
        </>
      );
    }
  };
  const renderCalendar = () => {
    if (state[0].startDate === null) {
      // choose one date
      return (
        <Calendar
          onChange={(item) => {
            setState([
              {
                startDate: null,
                endDate: item,
                key: 'selection',
              },
            ]);
          }}
          date={state[0].endDate}
        />
      );
    } else {
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
    }
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
          if (
            !isOpen &&
            (state[0].startDate?.toDateString() !==
              props.startDate?.toDateString() ||
              state[0].endDate?.toDateString() !== props.endDate?.toString())
          ) {
            props.handleChangeDate(state[0].startDate, state[0].endDate);
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
              <div className="mr-auto bd-highlight">
                <div
                  className="btn btn-outline-primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (isChooseDays) {
                      setIsChooseDays(false);
                      setState([
                        {
                          startDate: null,
                          endDate: new Date(),
                          key: 'selection',
                        },
                      ]);
                    } else {
                      setIsChooseDays(true);
                      setState([
                        {
                          startDate: new Date(),
                          endDate: new Date(),
                          key: 'selection',
                        },
                      ]);
                    }
                  }}>
                  {isChooseDays ? 'Chọn 1 ngày' : 'Chọn nhiều ngày'}
                </div>
              </div>
              <div className="bd-highlight">
                <div
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setIsChooseDays(false);
                    setState([
                      {
                        startDate: null,
                        endDate: null,
                        key: 'selection',
                      },
                    ]);
                  }}>
                  Clear
                </div>
              </div>
            </div>
          </>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
