import PropTypes from 'prop-types';

import logo from '../../images/logo.png';

export default function UnAuthLayout({ children }) {
  return (
    <main>
      <section>
        <div className="container">
          <div className="row justify-content-center min-vh-100 align-items-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="p-awe-32 bg-white rounded shadow d-flex flex-column">
                <img
                  src={logo}
                  alt="Miqueias Costa"
                  className="img-fluid logo-login mx-auto mb-4 img-logo"
                />
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
UnAuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
