import { LineChart } from "@mui/x-charts";
import React from "react";

import { lineChartData, lineChartYKey } from "../../data/dummy";
import { PageHeader } from "../../components";

const Line = () => {
  return (
    <>
      <PageHeader title={"lineChart"} subTitle={"lineChart"} />
      <LineChart
        xAxis={[
          {
            id: "years",
            dataKey: "year",
            scaleType: "point",
          },
        ]}
        series={lineChartYKey.map((key) => ({
          dataKey: key,
          label: key,
        }))}
        dataset={lineChartData}
      />
    </>
  );
};

export default Line;
