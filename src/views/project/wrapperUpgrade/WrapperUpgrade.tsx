/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../../services/user/api';
import ModalUpgrade from './ModalUpgrade';

interface Props {
  roleRequire: Role;
}
export enum Role {
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}
export enum RoleValue {
  'Member',
  'MemberPlus',
  'MemberPro',
}
const WrapperUpgrade: React.FC<Props> = (props: Props) => {
  const [role, setRole] = useState<Role>(null);
  const [showModal, setShowModal] = useState<boolean>(true);

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
