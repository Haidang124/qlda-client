import React from 'react';
import { useRouteMatch } from 'react-router';
import { Col, Row } from 'reactstrap';
import Sidebar from '../../components/Sidebar/Sidebar';
import routes from '../../routes';
import HeadProject from './HeadProject';
const WrapperProject: React.FC<any> = (props: any) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  return (
    <div className="wrapper-project w-100" style={{ overflowX: 'hidden' }}>
      <Row>
        <Col>
          <Sidebar
            {...props}
            routes={[...routes]}
            logo={{
              innerLink: '/admin/index',
              imgSrc: require('../../assets/img/brand/kahoot-logo.png'),
              imgAlt: '...',
            }}
          />
        </Col>
        <Col md={10}>
          <HeadProject projectId={projectId} />
          {props.children}
        </Col>
      </Row>
    </div>
  );
};
export default WrapperProject;
