import './Checkbox.css';

function Checkbox({ state = 'default', onChange, disabled }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled && onChange) onChange();
  };

  return (
    <div className={`checkbox checkbox--${state} ${disabled ? 'checkbox--disabled' : ''}`} onClick={handleClick}>
      {state === 'checked' && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M8.74109 2.97439C8.96229 2.62435 9.42514 2.51997 9.77527 2.741C10.1254 2.96221 10.2298 3.425 10.0087 3.77518L6.14929 9.88553C6.0276 10.078 5.82479 10.204 5.59851 10.2293C5.37205 10.2545 5.14541 10.1765 4.98425 10.0154L1.98523 7.01541C1.69238 6.72256 1.69247 6.24777 1.98523 5.95486C2.27813 5.6621 2.75293 5.66201 3.04578 5.95486L5.38171 8.29178L8.74109 2.97439Z"
            fill="white"
          />
        </svg>
      )}
      {state === 'partial' && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6C2 6.41421 2.33579 6.75 2.75 6.75H9.25C9.66421 6.75 10 6.41421 10 6C10 5.58579 9.66421 5.25 9.25 5.25H2.75C2.33579 5.25 2 5.58579 2 6Z"
            fill="white"
          />
        </svg>
      )}
    </div>
  );
}

export default Checkbox;
