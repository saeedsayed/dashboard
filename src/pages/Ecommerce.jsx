import React, { useEffect, useState } from "react";

// data
import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { Card, PageHeader } from "../components";

import { MdOutlineMailOutline } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaTrafficLight } from "react-icons/fa";
import { GiCoins } from "react-icons/gi";
import { MdOutlineDownload } from "react-icons/md";

const Ecommerce = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title={"Dashboard"}
          subTitle={"Welcome to your dashboard"}
        />
        <button className="flex items-center gap-1 hover:bg-primary text-white bg-secondary rounded-md px-3 py-2">
          <MdOutlineDownload /> download reports
        </button>
      </div>
      <div className="flex justify-stretch gap-4 flex-wrap">
        <Card
          title={12361}
          subTitle={"Emails Sent"}
          icon={<MdOutlineMailOutline />}
          increase={14}
        />
        <Card
          title={431225}
          subTitle={"Sales Obtained"}
          icon={<GiCoins />}
          increase={21}
        />
        <Card
          title={32441}
          subTitle={"New Clients"}
          icon={<IoPersonAddOutline />}
          increase={5}
        />
        <Card
          title={1325134}
          subTitle={"Traffic Received"}
          icon={<FaTrafficLight />}
          increase={43}
        />
      </div>
    </>
  );
};

export default Ecommerce;
