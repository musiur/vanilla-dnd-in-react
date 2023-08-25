// eslint-disable-next-line react/prop-types
const Errors = ({ message }) => {
  return message ? <span className="text-destructive">{message}</span> : null;
};

export default Errors;
