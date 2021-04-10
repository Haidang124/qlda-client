import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../assets/scss/component/modalcreate.scss';

const ModalInvite: React.FC<{ state: boolean; setState: Function }> = ({
  state,
  setState,
}) => {
  return (
    <div className="modal-create">
      <Modal
        size="lg"
        style={{ maxWidth: '1500px', width: '80%' }}
        dialogClassName="my-modal"
        isOpen={state}
        className="modal-create-toptic"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody>
          <div className="_3okPZ1UgyOorbL">
            <div className="_1f6hQ1rpgO5o-J">
              <form className="_2vrbr9OyhcQOwQ">
                <span className="_3Iqnw8HlCKvcSz">Let's build a Workspace</span>
                <span className="_3O-nh6hx6HTp9W">
                  Boost your productivity by making it easier for everyone to
                  access boards in one location.
                </span>
                <label>
                  <b>Project name</b>
                </label>
                <input
                  id="1618037716343-create-team-org-display-name"
                  data-test-id="header-create-team-name-input"
                  type="text"
                  className="_1CLyNodCAa-vQi"
                  placeholder="Taco's Co."
                  value=""
                />
                <span className="_2ukuek1N8-13Iw">
                  This is the name of your company, team or organization.
                </span>
                <label>
                  <b> Project description </b>
                  <span className="_1bvaK5JF03W_82">Optional</span>
                </label>
                <textarea
                  id="1618037716343-create-team-org-description"
                  className="_15aIJYNKhrO4vB"
                  style={{ height: '100px' }}
                  placeholder="Our team organizes everything here."></textarea>
                <span className="_2ukuek1N8-13Iw">
                  Get your members on board with a few words about your
                  Workspace.
                </span>
                <footer className="_1aS0LdGertk5P7">
                  <Button color="primary"> Create</Button>
                </footer>
              </form>
            </div>
            <div className="_1wRFJUvIaoq-sR">
              <div className="_3lKk_kIqYLGIyx">
                <div className="_3qyYZ_ffqe5APT">
                  <img
                    width="342"
                    height="256"
                    src="https://a.trellocdn.com/prgb/dist/images/organization/empty-board.d1f066971350650d3346.svg"
                    alt=""
                    role="presentation"
                  />
                  <div className="">
                    <img
                      className="_2RcUIa4UOzSlM6"
                      src="https://a.trellocdn.com/prgb/dist/images/organization/green-face.1a4590e4c12ebbbd161a.svg"
                      alt=""
                      role="presentation"
                    />
                    <img
                      className="_2AfucOdcPC0oXo"
                      src="https://a.trellocdn.com/prgb/dist/images/organization/red-face.38df5b8182a69e1e98c7.svg"
                      alt=""
                      role="presentation"
                    />
                    <img
                      className="_3mOaNaiDiY3qs_"
                      src="https://a.trellocdn.com/prgb/dist/images/organization/blue-face.3644a080c0c1fc8ab4b6.svg"
                      alt=""
                      role="presentation"
                    />
                    <img
                      className="_1ZDrdsuKzdWg_4"
                      src="https://a.trellocdn.com/prgb/dist/images/organization/purple-face.24f3616b6ae9196090b1.svg"
                      alt=""
                      role="presentation"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <button
              className="qb90FI2uVIybRy _2b_HpRl1Tyl1YK"
              aria-label="Close">
              <span className="nch-icon _2_Q6rrYCFblD3M _1fXLS4oRrPeaIC">
                <span
                  className="sc-bdVaJa ifeHxY"
                  role="img"
                  aria-label="CloseIcon">
                  <svg
                    width="24"
                    height="24"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
              </span>
            </button> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary mr-3" onClick={() => setState(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInvite;
