import React from 'react';
import '../../assets/scss/component/itemnotification.scss';
const ItemNotification: React.FC<any> = (props: any) => {
  return (
    <div className="item-notification w-100">
      <a href="#!" className="list-group-item list-group-item-action">
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              alt="Image placeholder"
              src="https://demos.creative-tim.com/argon-dashboard-pro-react/static/media/team-1.fa5a7ac2.jpg"
              className="avatar rounded-circle"
            />
          </div>
          <div className="col ml--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 text-sm">John Snow</h4>
              </div>
              <div className="text-right text-muted">
                <small>2 hrs ago</small>
              </div>
            </div>
            <p className="text-sm mb-0">{props.message}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ItemNotification;
