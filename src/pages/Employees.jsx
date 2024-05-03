// components
import { PageHeader, Table } from "../components";
// data
import { employeesGrid, employeesData } from "../data/dummy";

function Employees() {
  employeesData.forEach((employee) => {
    employee.id = crypto.randomUUID().slice(0, 6);
  });
  return (
    <>
      <PageHeader title={"employees"} subTitle={"mange"} />

      <Table row={employeesData} columns={employeesGrid} />
    </>
  );
}
export default Employees;
