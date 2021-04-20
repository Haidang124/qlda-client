import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
    Input,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
  } from 'reactstrap';
const ModalEditTask: React.FC<any> = (props: any) => {    //props: funcQuit(), funcEdit(), 
                                                          // show, listUser, projectId, data {id, name, desc, columnId, typeTask, assignment}
    const [listAssignment, setListAsignment] = useState([]);
    const [check, setCheck] = useState(false);
    const removeAssigment = (userId) => {
      if(check == false) {
        setListAsignment([...props.data.assignment]);
        setCheck(true);
      }
      let list = check ? [...listAssignment] : [...props.data.assignment];
      for(var i=0; i<list.length; i++) {
          if(list[i].userId == userId) {
              list.splice(i,1);
              break;
          }
      };
      setListAsignment(list);
    }
    const resFunc = () => {
      setCheck(false);
      setListAsignment([]);
    }
    const getListUserId = (list) => {
      let arr = [];
      list.forEach(element => {
          arr.push(element.userId);
      });
      return arr;
    }
  return (
    <>
      <Modal
        size="lg"
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          props.funcQuit(resFunc);
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
            <h2>EDIT TASK</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex mb-2">
            <div className="col-6">
              <h4>Name task: </h4>
              <Input
                id="taskname"
                placeholder= {props.data.name}
                defaultValue={props.data.name}
                type="text"
                maxLength={76}
                style={{ fontSize: '20px' }}></Input>
                <br/>
                <h4>Description: </h4>
                <textarea
                    defaultValue = {props.data.desc}
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
                                            if(check == false) {
                                              setListAsignment([...props.data.assignment]);
                                              setCheck(true);
                                            }
                                            let list = check ? [...listAssignment] : [...props.data.assignment];
                                            for(var i=0; i<list.length; i++) {
                                                if(list[i].userId == value.userId) {
                                                    return;
                                                }
                                            }
                                            list.push({...value});
                                            setListAsignment([...list]);
                                        }}
                                        >
                                        <span style={{fontWeight:"bold"}}>{value.username}</span>
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
                            {(check?listAssignment:props.data.assignment).map((value, index) => {
                                return (
                                    <div className="btn btn-success mt-3"
                                        onClick={(e) => removeAssigment(value.userId)}
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
                  props.funcQuit(resFunc);
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
                    let arr = check ? [...getListUserId(listAssignment)] : [...getListUserId(props.data.assignment)];
                    let data = {
                        id: props.data.id,
                        taskname: (document.getElementById('taskname') as HTMLInputElement).value,
                        desc: (document.getElementById('desc') as HTMLInputElement).value,
                        assignment: [...arr],
                        projectId: props.projectId,
                        typeTask: props.data.typeTask,
                        columnId: props.data.columnId
                    }
                    props.funcEdit(data);
                    props.funcQuit(resFunc);
                }}>
                <b>Edit</b>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditTask;