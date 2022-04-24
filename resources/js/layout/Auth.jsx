import PropTypes from 'prop-types';

import { Header } from '../components/auth/Header';
import { Sidebar } from '../components/auth/Sidebar';

export const AuthLayout = ({ children }) => (
  <div className="page-container">
    <Header />
    <div className="page-content">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  </div>
);
AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
