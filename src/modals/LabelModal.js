import React, { useRef, useState } from 'react';
import { getEditControlsSidePosition } from '../views/Card';
import { getAddBoardStyle } from '../utils/util';
// import { updateCard } from '../utils/board';
const colors = [
  ['#0079bf', false],
  ['#70b500', false],
  ['#ff9f1a', false],
  ['#eb5a46', false],
  ['#f2d600', false],
  ['#c377e0', false],
  ['#ff78cb', false],
  ['#00c2e0', false],
  ['#51e898', false],
  ['#c4c9cc', false],
];

const getLiContent = (data, selected) => {
  if (!data) return [];

  return data.map((label) => {
    const checked =
      selected.find((selectedLabel) => selectedLabel.id === label.id) !==
      undefined;
    return {
      ...label,
      style: {
        backgroundColor: `#${label.color}`,
      },
      checked,
    };
  });
};

const LabelModal = ({ list, card, cardElem, setShowModal }) => {
  //   const { board, setBoard } = useContext(globalContext);
  const [showCreateLabel, setShowCreateLabel] = useState(false);
  const labelElem = useRef(null);
  const [label, setLabel] = useState(null);
  const data = [
    [
      { id: 11, title: '', color: '4680ff' },
      { id: 12, title: '', color: '61bd4f' },
      { id: 13, title: '', color: 'ffab4a' },
      { id: 14, title: '', color: 'ff0000' },
      { id: 15, title: '', color: 'ffb64d' },
      { id: 16, title: '', color: 'c377e0' },
      { id: 17, title: '', color: 'ff80ce' },
      { id: 18, title: '', color: '00c2e0' },
      { id: 19, title: '', color: '51e898' },
      { id: 20, title: '', color: '42548e' },
    ],
  ];
  const liContent = getLiContent(data, card.labels);
  const toggleLabel = async (labelId) => {
    // const { data } = await authAxios.put(
    //   `${backendUrl}/boards/items/${card.id}/`,
    //   {
    //     title: card.title,
    //     labels: labelId,
    //   },
    // );
    // updateCard(board, setBoard)(list.id, data);
  };

  return (
    <>
      {showCreateLabel ? (
        <CreateLabel
          labelElem={labelElem}
          setShowCreateLabel={setShowCreateLabel}
          label={label}
          //   replaceItem={replaceItem}
        />
      ) : null}
      <div
        style={getEditControlsSidePosition(cardElem.current, 40)}
        className="label-modal"
        ref={labelElem}>
        <div className="label-modal__header">
          <p>Labels</p>
          <button onClick={() => setShowModal(false)}>
            <i className="fal fa-times"></i>
          </button>
        </div>
        <div>
          <ul className="label-modal__labels-block">
            {liContent.map((label, index) => {
              return (
                <li key={index} className="label-modal__label">
                  <p onClick={() => toggleLabel(label.id)} style={label.style}>
                    {label.title}
                    {label.checked ? (
                      <i
                        className="fal fa-check"
                        style={{
                          float: 'right',
                          marginRight: '0.6em',
                        }}></i>
                    ) : null}
                  </p>
                  <button
                    onClick={() => {
                      setLabel(label);
                      setShowCreateLabel(true);
                    }}
                    style={{ marginLeft: '1em' }}>
                    <i className="fal fa-pencil"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const CreateLabel = ({ labelElem, setShowCreateLabel, label, replaceItem }) => {
  const [title, setTitle] = useState(label.title);
  const [color, setColor] = useState(label.color);
  return (
    <div
      style={getEditControlsSidePosition(labelElem.current)}
      className="label-modal label-modal--create">
      <div className="label-modal__header">
        <button
          style={{ marginRight: 'auto', marginLeft: 0 }}
          onClick={() => setShowCreateLabel(false)}>
          <i className="fal fa-chevron-left"></i>
        </button>
        <p style={{ marginRight: 'auto', marginLeft: 0 }}>Create</p>
      </div>

      <div className="label-modal__content">
        <p className="label-modal__title">Name</p>
        <input
          className="label-modal__input"
          placeholder="Enter label name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <p className="label-modal__labels-head">Select a color</p>
        <ul className="label-modal__create-block">
          {colors.map((colorOption, index) => {
            return (
              <li key={index} className="label-modal__create-label">
                <button
                  className={
                    color === colorOption[0].substring(1)
                      ? 'label-modal__create-label--selected'
                      : ''
                  }
                  onClick={() => setColor(colorOption[0].substring(1))}
                  style={getAddBoardStyle(...colorOption)}>
                  {color === colorOption[0].substring(1) ? (
                    <i className="fal fa-check"></i>
                  ) : null}
                </button>
              </li>
            );
          })}
          <li className="label-modal__create-label"></li>
        </ul>
      </div>
      <button
        onClick={async () => {
          //   const { data } = await authAxios.put(
          //     `${backendUrl}/boards/labels/${label.id}/`,
          //     {
          //       title,
          //       color,
          //     },
          //   );
          //   replaceItem(data);
          setShowCreateLabel(false);
        }}
        className="btn label-modal__create-button">
        Save
      </button>
    </div>
  );
};

export default LabelModal;
