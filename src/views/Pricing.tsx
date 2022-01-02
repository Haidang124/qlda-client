import React, { useEffect } from 'react';
// import { useHistory } from 'react-router';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../assets/scss/component/pricing.scss';
import { momoService } from '../services/momo/api';
import { Role, RoleValue } from './project/wrapperUpgrade/WrapperUpgrade';

const Pricing: React.FC<{
  state: boolean;
  setState: Function;
  role: Role;
}> = ({ state, setState, role }) => {
  useEffect(() => {}, []);
  // const history = useHistory();
  const payment = (amount) => {
    momoService.payment(amount, 'upgrade').then((res) => {
      window.location.replace(res.data.data.payUrl);
    });
  };
  return (
    <div className="">
      <Modal
        size="lg"
        style={{ maxWidth: '100vw', width: '100%' }}
        dialogClassName="my-modal "
        className="d-flex justify-content-center"
        isOpen={state}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody>
          <div className="pricing">
            <section className="pricing">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-5 mb-lg-0">
                      <div className="card-body">
                        <h5 className="card-title text-muted text-uppercase text-center">
                          Free
                        </h5>
                        <h6 className="card-price text-center">0 đ</h6>
                        <hr />
                        <ul className="fa-ul">
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Single User
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            5GB Storage
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Unlimited Public Projects
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Community Access
                          </li>
                          <li className="text-muted">
                            <span className="fa-li">
                              <i className="fas fa-times"></i>
                            </span>
                            Unlimited Private Projects
                          </li>
                          <li className="text-muted">
                            <span className="fa-li">
                              <i className="fas fa-times"></i>
                            </span>
                            Dedicated Phone Support
                          </li>
                          <li className="text-muted">
                            <span className="fa-li">
                              <i className="fas fa-times"></i>
                            </span>
                            Free Subdomain
                          </li>
                          <li className="text-muted">
                            <span className="fa-li">
                              <i className="fas fa-times"></i>
                            </span>
                            Monthly Status Reports
                          </li>
                        </ul>
                        {/* <div className="d-grid">
                          <p className="btn btn-primary text-uppercase">Buy</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card mb-5 mb-lg-0">
                      <div className="card-body">
                        <h5 className="card-title text-muted text-uppercase text-center">
                          Plus
                        </h5>
                        <h6 className="card-price text-center">
                          50.000 đ{/* <span className="period">/month</span> */}
                        </h6>
                        <hr />
                        <ul className="fa-ul">
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            <strong>5 Users</strong>
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            50GB Storage
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Unlimited Public Projects
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Community Access
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Unlimited Private Projects
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Dedicated Phone Support
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Free Subdomain
                          </li>
                          <li className="text-muted">
                            <span className="fa-li">
                              <i className="fas fa-times"></i>
                            </span>
                            Monthly Status Reports
                          </li>
                        </ul>
                        {RoleValue[role] < RoleValue[Role.MemberPlus] && (
                          <div className="d-grid">
                            <p
                              className="btn btn-primary text-uppercase"
                              onClick={() => payment(50000)}>
                              Buy
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title text-muted text-uppercase text-center">
                          Pro
                        </h5>
                        <h6 className="card-price text-center">
                          100.000 đ
                          {/* <span className="period">/month</span> */}
                        </h6>
                        <hr />
                        <ul className="fa-ul">
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            <strong>Unlimited Users</strong>
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            150GB Storage
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Unlimited Public Projects
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Community Access
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Unlimited Private Projects
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Dedicated Phone Support
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            <strong>Unlimited</strong> Free Subdomains
                          </li>
                          <li>
                            <span className="fa-li">
                              <i className="fas fa-check"></i>
                            </span>
                            Monthly Status Reports
                          </li>
                        </ul>
                        {RoleValue[role] < RoleValue[Role.MemberPro] && (
                          <div className="d-grid">
                            <p
                              className="btn btn-primary text-uppercase"
                              onClick={() => {
                                payment(100000);
                              }}>
                              Buy
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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

export default Pricing;
