import * as React from "react";

import { PageHeader, Table } from "../components";

import { ordersGrid, ordersData } from "../data/dummy";

function Order() {
  let orderId = 1;
  ordersData.forEach((order) => {
    order.id = orderId;
    orderId++;
  });
  return (
    <>
      <PageHeader title={"order"} subTitle={"manage"} />
        <Table row={ordersData} columns={ordersGrid} /> 
    </>
  );
}
export default Order;
