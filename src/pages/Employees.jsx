import * as React from "react";

import { PageHeader, Table } from "../components";
import { employeesGrid, employeesData } from "../data/dummy";

function Employees() {
  let employeeId = 1;
  employeesData.forEach((employee) => {
    employee.id = employeeId;
    employeeId++;
  });
  return (
    <>
      <PageHeader title={"employees"} subTitle={"mange"} />

        <Table row={employeesData} columns={employeesGrid}/>

    </>
  );
}
export default Employees;
