import React, { useEffect, useState } from 'react';
import { Task } from '../InterfaceTask';
import '../../../../assets/scss/component/board.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface Props {
  dataTasks: { data: any; setData: (data) => void };
  task: {
    task: Task;
    setTask: (task: Task) => void;
  };
  show;
  setShow: (value) => void;
}
export const TaskDetails: React.FC<Props> = (props: Props) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (props.show) {
      setRender(true);
    }
  }, [props.show]);
  const onAnimationEnd = () => {
    if (!props.show) {
      setRender(false);
    }
  };
  return (
    render && (
      <div
        className="p-2 task-details"
        style={{
          animation: `${
            props.show ? 'task-details-show 1s' : 'task-details-hide 1s'
          }`,
        }}
        onAnimationEnd={onAnimationEnd}>
        <div className="d-flex bd-highlight">
          <div className="mr-auto p-2 bd-highlight">
            {props.task.task.taskName}
          </div>
          <div className="p-2 bd-highlight pr-4 task-details-link">
            <FontAwesomeIcon icon={faLink} />
          </div>
        </div>
      </div>
    )
  );
};
