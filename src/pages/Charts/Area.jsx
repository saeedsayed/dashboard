// components
import { LineChart } from "@mui/x-charts";
import { PageHeader } from "../../components";
// data
import { lineChartData, lineChartYKey } from "../../data/dummy";

const Area = () => {
  return (
    <>
      <PageHeader title={"AreaChart"} subTitle={"simple Area chart"} />
      <div className="w-full overflow-auto h-full [&_tspan]:fill-primary-text [&_line]:!stroke-primary [&>*]:m-auto">
        <LineChart
          series={Object.keys(lineChartYKey).map((key) => ({
            dataKey: key,
            showMark: false,
            area: true,
            label: key,
            color: lineChartYKey[key],
            stack: "total",
          }))}
          xAxis={[{ dataKey: "year", scaleType: "point" }]}
          dataset={lineChartData}
          width={1100}
          sx={{
            ".MuiLineElement-root": {
              display: "none",
            },
          }}
        />
      </div>
    </>
  );
};

export default Area;
