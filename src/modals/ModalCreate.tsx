import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../assets/scss/component/modalcreate.scss';

const ModalInvite: React.FC<{
  state: boolean;
  setState: Function;
  createProject: Function;
}> = ({ state, setState, createProject }) => {
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
                  id="name"
                  data-test-id="header-create-team-name-input"
                  type="text"
                  className="_1CLyNodCAa-vQi"
                  placeholder="Please enter project name"
                  // value=""
                />
                <span className="_2ukuek1N8-13Iw">
                  This is the name of your company, team or organization.
                </span>
                <label>
                  <b> Project description </b>
                  <span className="_1bvaK5JF03W_82">Optional</span>
                </label>
                <textarea
                  id="description"
                  className="_15aIJYNKhrO4vB"
                  style={{ height: '100px' }}
                  placeholder="Please enter project description"></textarea>
                <span className="_2ukuek1N8-13Iw">
                  Get your members on board with a few words about your
                  Workspace.
                </span>
                <footer className="_1aS0LdGertk5P7">
                  <Button
                    color="primary"
                    onClick={() => {
                      let name = (document.getElementById(
                        'name',
                      ) as HTMLInputElement).value;
                      let description = (document.getElementById(
                        'description',
                      ) as HTMLInputElement).value;
                      let avatar =
                        'https://tuoitredoisong.net/wp-content/uploads/2019/10/dich-Project-la-gi-trong-tieng-viet.jpg';
                      createProject(name, description, avatar);
                    }}>
                    {' '}
                    Create
                  </Button>
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
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger mr-3" onClick={() => setState(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalInvite;
