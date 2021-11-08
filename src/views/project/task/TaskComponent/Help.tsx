import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Task } from '../InterfaceTask';
import '../../../../assets/scss/component/help.scss';

export const DropdownAssignee: React.FC<{
  task: Task;
  config?: {
    isShowName?: boolean;
    handleInvite?: (email) => void;
  };
}> = (props: {
  task: Task;
  config?: {
    isShowName?: boolean;
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
            ? props.task.assignee[0].userName
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
