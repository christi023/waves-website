import React from 'react';
// font awesome icons
// fas fa-compass, fas fa-phone, fas fa-clock, fas fa-envelope
const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Waves</div>

        <div className="wrapper">
          <div className="left">
            <h2> Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <div className="icon">
                  <i className=" fas fa-compass"></i>
                </div>
                <div className="nfo">
                  <div>Address</div>
                  <div>Nobel 23</div>
                </div>
              </div>
              <div className="tag">
                <div className="icon">
                  <i className=" fas fa-phone"></i>
                </div>
                <div className="nfo">
                  <div>Phone</div>
                  <div>0870764321</div>
                </div>
              </div>
              <div className="tag">
                <div className="icon">
                  <i className=" fas fa-clock"></i>
                </div>
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>Mon-Fri/ 9am-7pm</div>
                </div>
              </div>
              <div className="tag">
                <div className="icon">
                  <i className=" fas fa-envelope"></i>
                </div>
                <div className="nfo">
                  <div>Email</div>
                  <div>nfo@waves.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the latest information on events, sales and offers. You can't miss out
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
