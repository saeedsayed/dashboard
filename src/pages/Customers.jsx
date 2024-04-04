import * as React from "react";

import { PageHeader, Table } from "../components";
import { customersData, customersGrid } from "../data/dummy";

function Customers() {
  let customerId = 1;
  customersData.forEach((employee) => {
    employee.id = customerId;
    customerId++;
  });
  return (
    <>
      <PageHeader title={"customer"} subTitle={"mange"} />
      <Table row={customersData} columns={customersGrid} />
    </>
  );
}
export default Customers;
