/* eslint-disable @typescript-eslint/no-unused-vars */
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../assets/scss/component/editorblog.scss';
import { userService } from '../../services/user/api';
import ModalCreateBlog from '../modal/ModalCreateBlog';
import { Assignment } from '../project/task/InterfaceTask';
const EditorBlog: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState('');
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<Assignment>(null);
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
        <ModalCreateBlog
          size="xl"
          showModal={showModal}
          setShowModal={(value) => setShowModal(value)}
          content={content}
          projectId={projectId}
        />
        <Button
          className="btn-save"
          color="primary"
          onClick={() => {
            if (content !== '') {
              setShowModal(true);
            } else {
              toast.warning('Vui lòng nhập nội dung !!!');
            }
          }}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditorBlog;
