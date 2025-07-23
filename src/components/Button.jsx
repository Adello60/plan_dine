const Button = ({ className, text, hasIcon, hasImage, disabled, ...rest }) => {
  return (
    <button
      {...rest}
      className={`flex items-center  text-center ${className} rounded-[7px]`}
      disabled={disabled}
    >
      {hasIcon ? (
        hasIcon
      ) : hasImage ? (
        <img src={hasImage} alt="" className={`${className}`} />
      ) : null}
      {text && <p>{text}</p>}
    </button>
  );
};
export default Button;
