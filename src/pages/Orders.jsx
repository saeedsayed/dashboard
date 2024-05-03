// components
import { PageHeader, Table } from "../components";
// data
import { ordersGrid, ordersData } from "../data/dummy";

function Order() {
  ordersData.forEach((order) => {
    order.id = crypto.randomUUID().slice(0, 6);
  });
  return (
    <>
      <PageHeader title={"order"} subTitle={"manage"} />
      <Table row={ordersData} columns={ordersGrid} />
    </>
  );
}
export default Order;
