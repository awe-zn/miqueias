import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';

export const InputMask = ({
  name,
  mask,
  label,
  value,
  handleSetValue,
  placeholder,
  status,
}) => {
  const handleChange = ({ target: { value: newValue } }) => {
    handleSetValue(name, newValue);
  };

  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <ReactInputMask
        id={name}
        name={name}
        className={`form-control ${status}`.trim()}
        value={value}
        onChange={handleChange}
        mask={mask}
        placeholder={placeholder}
        type="text"
      />
    </>
  );
};
InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleSetValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  status: PropTypes.string.isRequired,
};
InputMask.defaultProps = {
  placeholder: '',
};
