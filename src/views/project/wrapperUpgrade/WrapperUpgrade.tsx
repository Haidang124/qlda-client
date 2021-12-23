/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../../services/user/api';
import ModalUpgrade from './ModalUpgrade';
import { useHistory } from 'react-router';
interface Props {
  roleRequire: Role;
  isPageAdmin?: boolean;
}
export enum Role {
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
  Admin = 'Admin',
}
export enum RoleValue {
  'Member',
  'MemberPlus',
  'MemberPro',
  'Admin',
}

const WrapperUpgrade: React.FC<Props> = (props: Props) => {
  const [role, setRole] = useState<Role>(null);
  const [showModal, setShowModal] = useState<boolean>(true);
  const history = useHistory();
  const pageAdmin = () => {
    toast.error('Bạn không phải là quản trị viên.');
    history.push('/admin/index');
    return <></>;
  };
  useEffect(() => {
    userService
      .getUserCurrent()
      .then((res) => {
        setRole(res.data.data.role);
        if (
          RoleValue[res.data.data.role as string] >=
          RoleValue[props.roleRequire]
        ) {
          setShowModal(false);
        } else {
          setShowModal(true);
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'Không xác định được người dùng',
        );
      });
  }, []);

  return (
    <>
      {role === null ? (
        <></>
      ) : RoleValue[role] >= RoleValue[props.roleRequire] ? (
        (props as any).children
      ) : props.isPageAdmin ? (
        pageAdmin()
      ) : (
        <ModalUpgrade
          show={{
            status: showModal,
            setStatus: (status) => setShowModal(status),
          }}
          roleCurrent={role}
          roleRequire={props.roleRequire}
        />
      )}
    </>
  );
};
export default WrapperUpgrade;
