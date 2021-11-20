import React from 'react';
import '../../assets/scss/component/statuspayment.scss';
const StatusPayment: React.FC = () => {
  return (
    <div className="status-payment header d-flex justify-content-center align-items-center w-100 ">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-5 d-flex ">
            <div className="text-container">
              <div className="section-title">Welcome to Zinc web agency</div>
              <h1 className="h1-large">Payment Success!</h1>
              <p className="p-large">
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Tài
                khoản đã nâng cấp thành công vui lòng kiểm tra lại. Xin cảm ơn!
              </p>
              <a className="btn-solid-lg mr-3" href="#services">
                Go to Home
              </a>
              <a className="quote" href="#contact">
                <i className="fas fa-paper-plane"></i>Profile
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7">
            <div className="image-container">
              <img
                className="img-fluid"
                src="https://inovatik.com/zinc/images/header-illustration.svg"
                alt="alternative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPayment;
