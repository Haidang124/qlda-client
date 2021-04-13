import React from 'react';
import { useRouteMatch } from 'react-router';
// import '../assets/scss/component/memberproject.scss';
import HeadProject from './HeadProject';
const TaskProject: React.FC<{}> = ({}) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  return (
    <div>
      <HeadProject projectId={projectId}/>
    </div>
  );
};
export default TaskProject;
