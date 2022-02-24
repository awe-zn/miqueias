import PropTypes from 'prop-types';

export const Title = ({ label }) => (
  <h1 className="text-blue-first fw-bold fz-24 m-0">{label}</h1>
);

Title.propTypes = {
  label: PropTypes.string.isRequired,
};
