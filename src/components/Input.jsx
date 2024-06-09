import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({ label, id, validRef, type, err, errMes, social, ...rest }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="relative md:my-3 my-1 flex-1 [&:has(:disabled)]:opacity-40">
      <label
        className="inline-block text-md mb-2 first-letter:capitalize text-primary-text"
        htmlFor={id}
      >
        {label} <span className="text-red-700 font-bold">{errMes}</span>
      </label>
      <div className="relative">
        <input
          className={`border-2 relative focus:border-primary  bg-section-bg border-secondary focus:outline-none
          text-primary-text rounded-md  py-2 px-3 w-full ${
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
            className={`absolute right-3 top-1/2 p-2 -translate-y-1/2`}
          >
            {isShow ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
