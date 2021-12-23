import React from 'react';
import ApproveContent from './ApproveContent';
import ApproveWithdrawal from './ApproveWithdrawal';
const Administrators: React.FC = () => {
  return (
    <div className="administrators">
      <ApproveContent />
      <ApproveWithdrawal />
    </div>
  );
};

export default Administrators;
