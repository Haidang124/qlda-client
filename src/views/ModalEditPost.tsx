// import { AUTO } from 'phaser';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
const ModalEditPost: React.FC<any> = (props: any) => {
  //props: funcQuit(), show, data:{content, postId}
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
          <Modal.Title className="w-100 d-flex justify-content-center">
            <div
              className="w-75 d-flex justify-content-center"
              style={{ borderBottom: '1px solid black' }}>
              <h1>Sửa bài đăng</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-nowrap bd-highlight">
            <div className="order-2 p-2 bd-highlight">
              <img className="avatar" src={props.data.author.avatar} alt="" />
            </div>
            <div
              className="order-3 p-2 bd-highlight"
              style={{ margin: 'auto 0' }}>
              <div className="details">
                <span style={{ fontWeight: 'bold' }}>
                  {props.data.author.name}
                </span>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-11">
              <textarea
                id="content"
                defaultValue={props.data.content}></textarea>
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
                  backgroundColor: '#dc3545',
                  color: 'white',
                }}
                onClick={(e) => {
                  let newContent = (document.getElementById(
                    'content',
                  ) as HTMLInputElement).value;
                  props.funcEdit(props.data.postId, newContent);
                  props.funcQuit();
                }}>
                <b>Save</b>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditPost;
