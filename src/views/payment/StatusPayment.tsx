/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../../assets/scss/component/statuspayment.scss';
import { momoService } from '../../services/momo/api';
const StatusPayment: React.FC = () => {
  const url = window.location.href;
  useEffect(() => {
    let params = new URLSearchParams(url);
    console.log(
      params.get('message'),
      params.get('amount'),
      params.get('resultCode'),
    );
    momoService
      .checkPayment({
        amount: params.get('amount'),
        message: params.get('message'),
        resultCode: params.get('resultCode'),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {});
  }, []);
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
              <a className="btn-solid-lg mr-3" href="/admin/index">
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
