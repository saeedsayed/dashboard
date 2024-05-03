// components
import { PageHeader, Table } from "../components";
// data
import { customersData, customersGrid } from "../data/dummy";

function Customers() {
  customersData.forEach((employee) => {
    employee.id = crypto.randomUUID().slice(0, 6);
  });
  return (
    <>
      <PageHeader title={"customer"} subTitle={"mange"} />
      <Table row={customersData} columns={customersGrid} />
    </>
  );
}
export default Customers;
