import PropTypes from 'prop-types';

export const Input = ({
  name,
  type,
  label,
  value,
  handleSetValue,
  placeholder,
}) => {
  const handleChange = ({ target: { value: newValue } }) => {
    handleSetValue(name, newValue);
  };

  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-control"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number', 'text', 'email', 'date', 'datetime-local'])
    .isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleSetValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
Input.defaultProps = {
  placeholder: undefined,
};
