import React from 'react';

const Labels = ({ labels }) => {
  if (typeof labels === 'undefined') return null;
  return (
    <div className="labels">
      {labels.map((label, index) => (
        <p
          className={`labels__label`}
          key={index}
          style={{ color: `#${label.color}` }}>
          ___
        </p>
      ))}
    </div>
  );
};

export default Labels;
