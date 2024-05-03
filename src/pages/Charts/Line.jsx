// components
import { PageHeader } from "../../components";
import { LineChartComponent } from "../../components/index";

const Line = () => {
  return (
    <>
      <PageHeader title={"lineChart"} subTitle={"Simple Line Chart"} />
      <LineChartComponent />
    </>
  );
};

export default Line;
