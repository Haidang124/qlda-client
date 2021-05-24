import React, { useState, useRef, useEffect, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import useBlurSetState from '../hook/useBlurSetState';
import { mergeRefs } from '../utils/util';
import { updateList, addCard } from '../utils/board';

const getListStyle = (isDragging, defaultStyle) => {
  if (!isDragging) return defaultStyle;
  return {
    ...defaultStyle,
    transform: defaultStyle.transform + ' rotate(5deg)',
  };
};

const getListTitleStyle = (isDragging, defaultStyle) => {
  if (!isDragging)
    return {
      ...defaultStyle,
      cursor: 'pointer',
    };
  return {
    ...defaultStyle,
    cursor: 'grabbing',
  };
};

const List = ({ list, index }) => {
  const [board, setBoard] = useState({
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
  });
  const [addingCard, setAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);

  useBlurSetState('.list__add-card-form', addingCard, setAddingCard);
  useBlurSetState('.list__title-edit', editingTitle, setEditingTitle);

  const onAddCard = async (e) => {
    e.preventDefault();
    // if (cardTitle.trim() === '') return;
    // const { data } = await authAxios.post(`${backendUrl}/boards/items/`, {
    //   list: list.id,
    //   title: cardTitle,
    // });
    // setAddingCard(false);
    // addCard(board, setBoard)(list.id, data);
  };

  const listCards = useRef(null);
  useEffect(() => {
    if (addingCard)
      listCards.current.scrollTop = listCards.current.scrollHeight;
  }, [addingCard]);

  useEffect(() => {
    if (editingTitle) {
      const editListTitle = document.querySelector('.list__title-edit');
      editListTitle.focus();
      editListTitle.select();
    }
  }, [editingTitle]);

  return (
    <Draggable draggableId={'list' + list.id.toString()} index={index}>
      {(provided, snapshot) => {
        if (typeof provided.draggableProps.onTransitionEnd === 'function') {
          const anim = window?.requestAnimationFrame(() =>
            provided.draggableProps.onTransitionEnd({
              propertyName: 'transform',
            }),
          );
        }
        return (
          <div
            className="list"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getListStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}>
            <div
              className="list__title"
              {...provided.dragHandleProps}
              style={getListTitleStyle(
                snapshot.isDragging,
                provided.dragHandleProps.style,
              )}>
              {!editingTitle ? (
                <p onClick={() => setEditingTitle(true)}>{list.title}</p>
              ) : (
                <EditList list={list} setEditingTitle={setEditingTitle} />
              )}
              <i className="far fa-ellipsis-h"></i>
            </div>
            <Droppable droppableId={list.id.toString()} type="item">
              {(provided) => (
                <div
                  className="list__cards"
                  ref={mergeRefs(provided.innerRef, listCards)}
                  {...provided.droppableProps}>
                  {list.items.map((card, index) => (
                    <DraggableCard
                      card={card}
                      list={list}
                      index={index}
                      key={index}
                    />
                  ))}
                  {provided.placeholder}
                  {addingCard && (
                    <AddCard
                      onAddCard={onAddCard}
                      cardTitle={cardTitle}
                      setCardTitle={setCardTitle}
                    />
                  )}
                </div>
              )}
            </Droppable>
            {!addingCard ? (
              <button
                className="list__add-card"
                onClick={() => setAddingCard(true)}>
                Add card
              </button>
            ) : cardTitle.trim() !== '' ? (
              <button
                className="list__add-card list__add-card--active btn"
                onClick={onAddCard}>
                Add
              </button>
            ) : (
              <button
                className="list__add-card list__add-card--active btn btn--disabled"
                disabled>
                Add
              </button>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export default List;

const AddCard = ({ onAddCard, cardTitle, setCardTitle }) => (
  <form className="list__add-card-form" onSubmit={onAddCard}>
    <input
      type="text"
      name="title"
      value={cardTitle}
      placeholder="Enter card title..."
      onChange={(e) => setCardTitle(e.target.value)}
    />
  </form>
);

const EditList = ({ list, setEditingTitle }) => {
  const [board, setBoard] = useState({
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
  });
  const [listTitle, setListTitle] = useState(list.title);

  const onEditList = async (e) => {
    e.preventDefault();
    if (listTitle.trim() === '') return;
    // const { data } = await authAxios.put(
    //   `${backendUrl}/boards/lists/${list.id}/`,
    //   {
    //     title: listTitle,
    //   },
    // );
    // updateList(board, setBoard)(data);
    // setEditingTitle(false);
  };

  return (
    <form onSubmit={onEditList}>
      <input
        className="list__title-edit"
        type="text"
        name="title"
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}></input>
    </form>
  );
};
