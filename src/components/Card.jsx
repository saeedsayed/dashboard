import React from "react";
import CountUp from "./CountUp";
import { Gauge } from "@mui/x-charts";

const Card = ({ icon, title, subTitle, increase }) => {
  return (
    <div className="flex justify-between items-center flex-1 min-w-48 md:w-[calc((100%-3rem)/4)] sm:w-[calc((100%-1rem)/2)] w-full  self-stretch   p-6 bg-section-bg capitalize">
      <div>
        <div className="text-secondary text-3xl">{icon}</div>
        <h2 className="text-primary-text text-2xl font-bold">
          {<CountUp endValue={title} duration={0.8} />}
        </h2>
        <h5 className="text-secondary text-lg">{subTitle}</h5>
      </div>
      <div className="flex flex-col items-end">
        <div
          className="[&_.MuiGauge-valueText]:hidden [&_.css-b9rdri-MuiGauge-referenceArc]:fill-secondary
        [&_.css-p1sr87-MuiGauge-referenceArc]:fill-main-bg text-end -me-3"
        >
          {" "}
          <Gauge
            width={70}
            height={70}
            value={increase}
            innerRadius="57%"
            outerRadius="100%"
          />
        </div>
        <p className="text-secondary text-lg">
          +{<CountUp endValue={increase} duration={2} />}%
        </p>
      </div>
    </div>
  );
};

export default Card;
