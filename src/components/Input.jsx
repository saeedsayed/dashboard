import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({ label, id, validRef, type, err, errMes, ...rest }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="relative my-3">
      <label className="block text-md mb-2 capitalize" htmlFor={id}>
        {label} <span className="text-red-700 font-bold">{errMes}</span>
      </label>
      <input
        className={`border-2 relative bg-section-bg border-secondary focus:outline-none text-primary-text rounded-md py-2 px-3 w-full  ${
          !!err && "!border-red-500"
        }`}
        id={id}
        type={isShow ? "text" : type}
        {...rest}
        {...validRef}
      />
      {type == "password" && (
        <button
          onClick={(_) => setIsShow((p) => !p)}
          type="button"
          className="absolute right-3 top-1/2 p-2"
        >
          {isShow ? <FiEye /> : <FiEyeOff />}
        </button>
      )}
    </div>
  );
};

export default Input;
