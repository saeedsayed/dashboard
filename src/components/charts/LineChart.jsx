import { LineChart } from "@mui/x-charts";
import React from "react";

import { lineChartData, lineChartYKey } from "../../data/dummy";

const LineChartComponent = () => {
  return (
    <>
      <div className="w-full overflow-auto h-full [&_tspan]:fill-primary-text [&_line]:!stroke-primary [&>*]:m-auto">
        <LineChart
          xAxis={[
            {
              id: "years",
              dataKey: "year",
              scaleType: "point",
            },
          ]}
          series={Object.keys(lineChartYKey).map((key) => ({
            dataKey: key,
            label: key,
            color: lineChartYKey[key],
          }))}
          dataset={lineChartData}
          width={1100}
        />
      </div>
    </>
  );
};

export default LineChartComponent;
