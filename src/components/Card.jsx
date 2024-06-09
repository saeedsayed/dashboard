// components
import CountUp from "./CountUp";
import { Gauge } from "@mui/x-charts";
import { CardBody } from "./index";

const Card = ({ icon, title, subTitle, increase }) => {
  return (
    <div className="flex-1 min-w-48 md:w-[calc((100%-3rem)/4)] sm:w-[calc((100%-1rem)/2)] w-full  self-stretch ">
      <CardBody>
        <div
          className="flex justify-between items-center 
            capitalize"
        >
          <div>
            <div className="text-primary text-3xl">{icon}</div>
            <h2 className="text-primary-text text-2xl font-bold">
              {<CountUp endValue={title} duration={0.8} />}
            </h2>
            <h5 className="text-secondary text-lg">{subTitle}</h5>
          </div>
          <div className="flex flex-col items-end">
            <div
              className="[&_.MuiGauge-valueText]:hidden [&_.css-b9rdri-MuiGauge-referenceArc]:fill-primary
        [&_.css-p1sr87-MuiGauge-referenceArc]:fill-secondary text-end -me-3"
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
      </CardBody>
    </div>
  );
};

export default Card;
