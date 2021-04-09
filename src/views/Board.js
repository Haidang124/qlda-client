import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../assets/scss/component/board.scss';
// import List from './List';
import useBlurSetState from '../hook/useBlurSetState';
import useDocumentTitle from '../hook/useDocumentTitle';
import { onDragEnd } from '../utils/board';
import { handleBackgroundBrightness } from '../utils/util';
import List from './List';

// import globalContext from '../context/globalContext';

const getBoardStyle = (board) => {
  if (board.image || board.image_url)
    return {
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) ), url(${
        board.image || board.image_url
      })`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    };
  else if (board.color)
    return {
      backgroundColor: `#${board.color}`,
    };
};

const Board = (props) => {
  const { id } = props.match.params;
  const [addingList, setAddingList] = useState(false);
  const [board, setBoard] = useState(
    {
      color: '',
      created_at: '2021-04-08T15:28:09.656674Z',
      description: '',
      id: 2,
      image: null,
      image_url:
        'https://images.unsplash.com/photo-1617850136763-06bc0a9a089c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMjE1NzN8MHwxfGFsbHw0fHx8fHx8Mnx8MTYxNzg5NTY2Mg&ixlib=rb-1.2.1&q=85',
      is_starred: true,
      lists: [
        {
          created_at: '2021-04-08T17:08:59.636168Z',
          id: 4,
          items: [
            {
              assigned_to: [],
              attachments: [],
              color: '',
              created_at: '2021-04-08T18:07:28.985475Z',
              description: '',
              due_date: null,
              id: 4,
              image: null,
              image_url: '',
              labels: [],
              order: '65535.000000000000000',
              title: 'hello1',
            },
            {
              created_at: '2021-04-08T17:09:02.760503Z',
              id: 5,
              items: [
                {
                  assigned_to: [],
                  attachments: [],
                  color: '',
                  created_at: '2021-04-08T17:09:05.902016Z',
                  description: '',
                  due_date: null,
                  id: 3,
                  image: null,
                  image_url: '',
                  labels: [
                    { id: 11, title: '', color: '4680ff' },
                    { id: 18, title: '', color: '00c2e0' },
                  ],
                  order: '65535.000000000000000',
                  title: 'sss',
                },
              ],
              order: '131070.000000000000000',
              title: 'ss',
            },
          ],
          order: '65535.000000000000000',
          title: 'hello',
        },
      ],
      owner: { id: 1, title: '123123' },
      title: 'hello',
    },
    {
      color: '',
      created_at: '2021-04-08T15:28:09.656674Z',
      description: '',
      id: 1,
      image: null,
      image_url:
        'https://images.unsplash.com/photo-1617850136763-06bc0a9a089c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMjE1NzN8MHwxfGFsbHw0fHx8fHx8Mnx8MTYxNzg5NTY2Mg&ixlib=rb-1.2.1&q=85',
      is_starred: true,
      lists: [
        {
          created_at: '2021-04-08T17:08:59.636168Z',
          id: 4,
          items: [
            {
              assigned_to: [],
              attachments: [],
              color: '',
              created_at: '2021-04-08T18:07:28.985475Z',
              description: '',
              due_date: null,
              id: 4,
              image: null,
              image_url: '',
              labels: [],
              order: '65535.000000000000000',
              title: 'hello1',
            },
            {
              created_at: '2021-04-08T17:09:02.760503Z',
              id: 5,
              items: [
                {
                  assigned_to: [],
                  attachments: [],
                  color: '',
                  created_at: '2021-04-08T17:09:05.902016Z',
                  description: '',
                  due_date: null,
                  id: 3,
                  image: null,
                  image_url: '',
                  labels: [
                    { id: 11, title: '', color: '4680ff' },
                    { id: 18, title: '', color: '00c2e0' },
                  ],
                  order: '65535.000000000000000',
                  title: 'sss',
                },
              ],
              order: '131070.000000000000000',
              title: 'ss',
            },
          ],
          order: '65535.000000000000000',
          title: 'hello',
        },
      ],
      owner: { id: 1, title: '123123' },
      title: 'hello',
    },
  );
  //   const { data: board, setData: setBoard, loading } = useAxiosGet(
  //     `/boards/${id}/`,
  //   );

  //   const { setBoardContext } = useContext(globalContext);
  //   useEffect(() => {
  //     if (board) {
  //       setBoardContext(board, setBoard);
  //     }
  //   }, [board]);

  useDocumentTitle(board ? `${board.title} | Trello` : '');
  useBlurSetState('.board__create-list-form', addingList, setAddingList);
  const [editingTitle, setEditingTitle] = useState(false);
  useBlurSetState('.board__title-edit', editingTitle, setEditingTitle);

  const [isBackgroundDark, setIsBackgroundDark] = useState(false);
  useEffect(handleBackgroundBrightness(board, setIsBackgroundDark), [board]);

  //   if (!board && loading) return null;
  //   if (!board && !loading) return <Error404 />;
  return (
    <div className="board" style={getBoardStyle(board)}>
      {!editingTitle ? (
        <p
          className="board__title"
          onClick={() => setEditingTitle(true)}
          style={isBackgroundDark ? { color: 'white' } : null}>
          {board.title}
        </p>
      ) : (
        <EditBoard
          setEditingTitle={setEditingTitle}
          board={board}
          setBoard={setBoard}
        />
      )}
      <p className="board__subtitle">{board.owner.title}</p>
      <DragDropContext onDragEnd={onDragEnd(board, setBoard)}>
        <Droppable
          droppableId={'board' + board.id.toString()}
          direction="horizontal"
          type="list">
          {(provided) => (
            <div
              className="board__lists"
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {board.lists.map((list, index) => (
                <List list={list} index={index} key={index} />
              ))}
              {provided.placeholder}
              {addingList ? (
                <CreateList
                  board={board}
                  setBoard={setBoard}
                  setAddingList={setAddingList}
                />
              ) : (
                <button
                  className="btn board__create-list"
                  onClick={() => setAddingList(true)}
                  style={board.lists.length === 0 ? { marginLeft: 0 } : null}>
                  <i className="fal fa-plus"></i>
                  Add {board.lists.length === 0 ? 'a' : 'another'} list
                </button>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const CreateList = ({ board, setBoard, setAddingList }) => {
  const [title, setTitle] = useState('');

  const onAddList = async (e) => {
    e.preventDefault();
    // const { data } = await authAxios.post(`${backendUrl}/boards/lists/`, {
    //   board: board.id,
    //   title,
    // });
    // addList(board, setBoard)(data);
    // setAddingList(false);
  };

  return (
    <form className="board__create-list-form" onSubmit={onAddList}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        placeholder="Enter list title"
      />
      {title.trim() !== '' ? (
        <button type="submit" className="btn btn--small">
          Add List
        </button>
      ) : (
        <button type="submit" className="btn btn--small btn--disabled" disabled>
          Add List
        </button>
      )}
    </form>
  );
};

const EditBoard = ({ board, setBoard, setEditingTitle }) => {
  const [title, setTitle] = useState(board.title);

  const onEditTitle = async (e) => {
    e.preventDefault();
    // if (title.trim() === '') return;
    // const { data } = await authAxios.put(`${backendUrl}/boards/${board.id}/`, {
    //   title,
    // });
    // setBoard(data);
    // setEditingTitle(false);
  };

  return (
    <form onSubmit={onEditTitle}>
      <input
        className="board__title-edit"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        placeholder="Enter board title"
      />
    </form>
  );
};

export default Board;
