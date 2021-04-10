import React from 'react';
import '../assets/scss/component/headproject.scss';
import ChooseList from './ChooseList';
const HeadProject: React.FC<{}> = ({}) => {
  return (
    <div className="tabbed-pane-header">
      <div className="tabbed-pane-header-wrapper u-clearfix">
        <div className="tabbed-pane-header-content">
          <div className="org-profile-avatar">
            <img
              src="https://images.unsplash.com/photo-1617383071787-372a8ce621da?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
              alt="project"
              className="avatar-project"
              height="100"
              width="100"
            />
          </div>
          <div className="tabbed-pane-header-details">
            <div className="js-current-details">
              <div className="js-react-root">
                <div className="_2hi4s2OzteKICe">
                  <h1 className="JX8b51ZEI29lut mr-3">scarpe</h1>
                  <span className="_37JehxUAzJjB-5">
                    <span className="nch-icon _2_Q6rrYCFblD3M z53beXNiDPJAy2 _1JXRz7Mz2bV-wN">
                      <span
                        className="sc-bdVaJa ckeJVZ"
                        role="img"
                        aria-label="PrivateIcon">
                        <svg
                          width="24"
                          height="24"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 3C9.79536 3 8 4.79192 8 7.00237V9H7C5.89543 9 5 9.89543 5 11V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V11C19 9.89543 18.1046 9 17 9H16V7.00237C16 4.79182 14.2091 3 12 3ZM14 11H16H17V19H7V11H8H10H14ZM14 9V7.00237C14 5.89617 13.1043 5 12 5C10.8983 5 10 5.89813 10 7.00237V9H14ZM14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z"
                            fill="currentColor"></path>
                        </svg>
                      </span>
                    </span>
                    Private
                  </span>
                </div>
                <div></div>
                <button
                  className="_2DZdmHnY2Nw7gI voB8NatlbuEme5"
                  type="button">
                  <span className="nch-icon _2_Q6rrYCFblD3M z53beXNiDPJAy2 _1b9YOgEMKmdR1d">
                    <span
                      className="sc-bdVaJa jKipYA mr-2"
                      role="img"
                      aria-label="EditIcon">
                      <svg
                        width="24"
                        height="24"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                          fill="currentColor"></path>
                      </svg>
                    </span>
                  </span>
                  Edit Workspace details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChooseList />
    </div>
  );
};
export default HeadProject;
