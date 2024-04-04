import React from "react";

const PageHeader = ({ title, subTitle }) => {
  return (
    <div className="mt-9 mb-7">
      <h2 className="font-bold text-primary-text text-3xl uppercase">
        {title}
      </h2>
      <p className="text-xl capitalize text-primary">{subTitle}</p>
    </div>
  );
};

export default PageHeader;
