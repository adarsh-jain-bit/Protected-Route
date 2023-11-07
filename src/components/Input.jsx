import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Input = ({
  placeholder,
  type,
  name,
  value,
  handleData,
  validate,
  error,
  show,
  onShowPassword,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        className="block border border-grey-light w-full p-2 outline-none rounded mb-1  focus:border-green-500"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleData(e)}
        onKeyUp={(e) => validate(e.target.name)}
      />
      {name === "password" ? (
        show ? (
          <VisibilityIcon
            className="absolute top-2 right-4"
            onClick={() => onShowPassword()}
          />
        ) : (
          <VisibilityOffIcon
            className="absolute top-2 right-4"
            onClick={() => onShowPassword()}
          />
        )
      ) : (
        ""
      )}
      <div className="text-red-500 text-[12px] font-semibold mb-2">{error}</div>
    </div>
  );
};

export default Input;
