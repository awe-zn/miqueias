import PropTypes from 'prop-types';

import { Header } from '../components/auth/Header';
import { Sidebar } from '../components/auth/Sidebar';

export const AuthLayout = ({ children }) => (
  <div className="page-container">
    <Header />
    <div className="page-content">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
