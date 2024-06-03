// components
import { PageHeader } from "../../components";
import { PieChart } from "@mui/x-charts";

const Pie = () => {
  return (
    <>
      <PageHeader title={"pie chart"} subTitle={"simple pie chart"} />
      <div
        className=" overflow-auto h-full [&_tspan]:fill-primary-text [&>*]:m-auto [&_.MuiPieArcLabel-root]:!fill-white
      [&_.MuiPieArcLabel-root]:!text-2xl"
      >
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 25, label: "series C" },
                { id: 3, value: 25, label: "series d" },
              ],
              innerRadius: 100,
              paddingAngle: 1,
              arcLabel: (item) => item.value.toString(),
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                color: "black",
                additionalRadius: -20,
                cornerRadius: 10,
                innerRadius: 150,
                paddingAngle: 4,
              },
            },
          ]}
          width={1050}
        />
      </div>
    </>
  );
};

export default Pie;
