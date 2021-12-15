import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../assets/scss/component/editorblog.scss';
import { blogService } from '../../services/blog/api';
const EditorBlog: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState('');
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const history = useHistory();
  return (
    <div className="editor-blog">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <Button
        className='btn-save'
        color="primary"
        onClick={() => {
          if (content !== '') {
            blogService.addBlog({ content: content, title: "New Blog", describe: "describe" }).then((res) => {
              let blogId = res.data.data._id;
              toast.success('Thành công')
              history.push(`/admin/blog/${blogId}`);
            }).catch(() => { })
          }
          else {
            toast.warning('Vui lòng nhập nội dung!')
          }
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default EditorBlog;
