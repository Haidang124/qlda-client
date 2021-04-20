import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
    Input,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
  } from 'reactstrap';
const ModalCreateTask: React.FC<any> = (props: any) => {    //props: funcQuit(), show, defaultName, listUser, projectId
    // console.log(props.listUser);
    const [listAssignment, setListAsignment] = useState([]);
    const removeAssigment = (e) => {
        let temp = e.target.id;
        let userId = temp.substring(11, temp.length);
        let list = [...listAssignment];
        for(var i=0; i<list.length; i++) {
            if(list[i].userId == userId) {
                list.splice(i,1);
                break;
            }
        };
        setListAsignment([...list]);
    }
  return (
    <>
      <Modal
        size="lg"
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          props.funcQuit();
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
            <h2>CREATE TASK</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex mb-2">
            <div className="col-6">
              <h4>Name task: </h4>
              <Input
                id="taskname"
                placeholder="New Task"
                defaultValue={props.defaultName}
                type="text"
                maxLength={76}
                style={{ fontSize: '20px' }}></Input>
                <br/>
                <h4>Description: </h4>
                <textarea
                    id="desc"
                    className="border border-light"
                    style={{width:"100%", height: "100px", resize: "none", padding: "5px"}}
                ></textarea>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-4">
                        <h4>Assignment:</h4>
                    </div>
                    <div className="col-8">
                        <UncontrolledDropdown>
                            <DropdownToggle
                            className="text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            // color=""
                            onClick={(e) => e.preventDefault()}>
                            <span className="text-primary">+ Add user</span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                {props.listUser.map((value, index) => {
                                    return (
                                    <DropdownItem
                                        // href="#pablo"
                                        onClick={(e) => {
                                            // let username = (document.getElementById(value.userId) as HTMLInputElement).innerHTML;
                                            let list = [...listAssignment];
                                            for(var i=0; i<list.length; i++) {
                                                if(list[i].userId == value.userId) {
                                                    return;
                                                }
                                            }
                                            list.push(value);
                                            setListAsignment([...list]);
                                        }}
                                        >
                                        <span style={{fontWeight:"bold"}} id={value.userId}>{value.username}</span>
                                    </DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <div className="row" id="user">
                    <div className="col d-flex just-content-center">
                        <div className="col-11">
                            {listAssignment.map((value, index) => {
                                return (
                                    <div className="btn btn-success mt-3"
                                        id={"assignment-"+value.userId}
                                        onClick={(e) => removeAssigment(e)}
                                    >{value.username}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col lg-6">
              <Button
                style={{
                  border: 'none',
                  width: '100%',
                  backgroundColor: 'rgb(242,242,242)',
                  color: 'black',
                }}
                onClick={(e) => {
                  props.funcQuit();
                }}>
                <b>Quit</b>
              </Button>
            </div>
            <div className="col lg-6">
              <Button
                style={{
                  border: 'none',
                  width: '100%',
                  backgroundColor: 'rgb(226,27,60)',
                  color: 'white',
                }}
                onClick={(e) => {
                    let assignment = [];
                    listAssignment.forEach(element => {
                        assignment.push(element.userId);
                    });
                    let data = {
                        taskname: (document.getElementById('taskname') as HTMLInputElement).value,
                        desc: (document.getElementById('desc') as HTMLInputElement).value,
                        assignment: assignment,
                        projectId: props.projectId
                    }
                    props.funcCreate(data);
                    props.funcQuit();
                }}>
                <b>Create</b>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateTask;