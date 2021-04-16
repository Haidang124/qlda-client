import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
// import '../assets/css/ModalCreatePost.css';

const ModalCreatePost: React.FC<any> = (props: any) => {
    //props: show, contentDefault, setClose(), funcQuit(), funcCreatePost()
  const createPost = () => {
    let content = (document.getElementById('content') as HTMLInputElement).value;
    if(content != "") {
      props.funcCreatePost(content);
      props.funcQuit();
    }
    else {
      toast.error("Nhập nội dung trước khi đăng bài!");
    }
  }
  return (
    <>
      <Modal
        size="lg"
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
        //   props.funcQuit();
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 d-flex justify-content-center" >
              <div className="w-75 d-flex justify-content-center" style={{borderBottom:"1px solid black"}}>
                <h1>Tạo bài viết</h1>
              </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <textarea
                id="content"
                placeholder={props.contentDefault}
                ></textarea>
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
                  backgroundColor: 'rgb(0,123,255)',
                  color: 'white',
                }}
                onClick={(e) => {
                  createPost();
                }}>
                <b>Đăng</b>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreatePost;
