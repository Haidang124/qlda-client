/* eslint-disable @typescript-eslint/no-unused-vars */
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../assets/scss/component/editorblog.scss';
import { blogService } from '../../services/blog/api';
import { userService } from '../../services/user/api';
import { Assignment } from '../project/task/InterfaceTask';
const EditorBlog: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState('');
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<Assignment>(null);
  const [nameBlog, setNameBlog] = useState('');
  const [descriptionBlog, setDescriptionBlog] = useState('');
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        setUser({
          _id: res.data.data.userId,
          ...res.data.data,
        });
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  }, []);
  const history = useHistory();
  return (
    <>
      <div className="p-2 editor-blog">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <Modal
          show={showModal}
          size={'xl'}
          className="modal-confirm"
          onHide={() => {
            setShowModal(false);
          }}>
          <Modal.Header>
            <h1>Tạo Blog</h1>
          </Modal.Header>
          <Modal.Body>
            <form className="new-event--form">
              <div className="form-group">
                <label className="form-control-label">Tên blog</label>
                <input
                  placeholder="Tên Blog"
                  type="text"
                  className="form-control-alternative new-event--title form-control"
                  onChange={(e) => {
                    setNameBlog(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Description</label>
                <textarea
                  style={{ height: '100px' }}
                  placeholder="Desctiption"
                  className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                  onChange={(e) => {
                    setDescriptionBlog(e.target.value);
                  }}></textarea>
                <i className="form-group--bar"></i>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setShowModal(false);
              }}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (nameBlog === '') {
                  toast.error('Vui lòng nhập tên Blog');
                  return;
                }
                if (content !== '') {
                  blogService
                    .addBlog({
                      content: content,
                      title: nameBlog,
                      describe: descriptionBlog,
                      security: projectId ? 'Private' : 'Pulic',
                      projectId: projectId,
                    })
                    .then((res) => {
                      let blogId = res.data.data._id;
                      toast.success('Thành công');
                      history.push(`/admin/blog/${blogId}`);
                    })
                    .catch(() => {});
                } else {
                  toast.warning('Vui lòng nhập nội dung!');
                }
              }}>
              Tạo blog
            </button>
          </Modal.Footer>
        </Modal>
        <Button
          className="btn-save"
          color="primary"
          onClick={() => {
            setShowModal(true);
          }}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditorBlog;
