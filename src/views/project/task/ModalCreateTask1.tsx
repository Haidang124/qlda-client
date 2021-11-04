import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
const ModalCreateTask1: React.FC<any> = (props: any) => {
  const [listAssignment, setListAsignment] = useState([]);
  const removeAssigment = (e) => {
    let temp = e.target.id;
    let userId = temp.substring(11, temp.length);
    let list = [...listAssignment];
    for (var i = 0; i < list.length; i++) {
      if (list[i].userId === userId) {
        list.splice(i, 1);
        break;
      }
    }
    setListAsignment([...list]);
  };
  return (
    <div className="create-task">
      <Modal
        size="lg"
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          setListAsignment([]);
          props.funcQuit();
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
          <span>New Task</span>
        </Modal.Header>
        <Modal.Body className="py-0">
          <div className="task-info">
            <div className="task-name">
              <input
                className="task-name-input"
                type="text"
                placeholder="Task Name"
              />
            </div>
            <div className="assign">
              <span>For</span>
              <Dropdown alignRight>
                <i
                  className="fa fa-user-plus dropdown-toggle"
                  aria-hidden="true"></i>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Thêm học sinh có tài khoản email
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Thêm học sinh không có tài khoản email
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Thêm học sinh bằng tên đăng nhập
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <span>in</span>
              <Dropdown alignRight>
                <Dropdown.Toggle>Project default</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Thêm học sinh có tài khoản email
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Thêm học sinh không có tài khoản email
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Thêm học sinh bằng tên đăng nhập
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="task-lable">
            <div className="priority"></div>
            <div className="lable"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: '#7b68ee',
            }}
            onClick={(e) => {
              let assignment = [];
              listAssignment.forEach((element) => {
                assignment.push(element.userId);
              });
              let data = {
                taskname: (document.getElementById(
                  'taskname',
                ) as HTMLInputElement).value,
                desc: (document.getElementById('desc') as HTMLInputElement)
                  .value,
                deadline: (document.getElementById(
                  'input-deadine',
                ) as HTMLInputElement).value,
                assignment: assignment,
                projectId: props.projectId,
              };
              props.funcCreate(data);
              setListAsignment([]);
              props.funcQuit();
            }}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreateTask1;
