import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
import ModalInvite from '../modals/ModalInvite';
import { projectService } from '../services/projects/api';
import HeadProject from './HeadProject';
import socket from '../socketioClient';
import { userService } from '../services/user/api';
import { taskService } from '../services/task/api';
import ModalTrueFalse from './ModalTrueFalse';

const SettingProject: React.FC = () => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [showModal, setShowModal] = useState(false);
    return (
      <>
        <ModalTrueFalse
          show={showModal}
          data={{
            title: "You want delete Project",
            button_1: {
              title: 'No',
              backgroundColor: 'rgb(242,242,242)',
              color: 'black',
            },
            button_2: {
              title: 'Yes',
              backgroundColor: 'rgb(226,27,60)',
              color: 'white',
            },
          }}
          setClose={() => {
            setShowModal(false);
          }}
          funcButton_1={() => {}}
          funcButton_2={() => {}}
          funcOnHide={() => {}}
        ></ModalTrueFalse>
        <HeadProject projectId={projectId} />
        <Container className="mt-4" fluid>
          <Row>
          </Row>
        </Container>
      </>
        );
    };

export default SettingProject;
