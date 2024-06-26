// data
import { TransactionsList } from "../data/dummy";
// components
import { Button, Card, CountUp, LineChartComponent, PageHeader } from "../components";
// icons
import { MdOutlineMailOutline } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { GiCoins } from "react-icons/gi";
import { MdOutlineDownload } from "react-icons/md";
import { CardBody } from "../components/index";

const cardInfo = [
  {
    title: "Emails Sent",
    value: 12361,
    icon: <MdOutlineMailOutline />,
    increase: 14,
  },
  {
    title: "Sales Obtained",
    value: 431225,
    icon: <GiCoins />,
    increase: 21,
  },
  {
    title: "Downloads",
    value: 6235,
    icon: <MdOutlineDownload />,
    increase: 30,
  },
  {
    title: "New Clients",
    value: 32441,
    icon: <IoPersonAddOutline />,
    increase: 5,
  },
];

const Ecommerce = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title={"Dashboard"}
          subTitle={"Welcome to your dashboard"}
        />
        <Button 
        // className="flex items-center gap-1 hover:bg-primary text-white bg-secondary rounded-md px-3 py-2"
        variant={'primary'}
        >
          <MdOutlineDownload /> download reports
        </Button>
      </div>
      {/* --------- row 1 ---------- */}
      <div className="flex justify-stretch gap-4 flex-wrap">
        {cardInfo.map((card) => (
          <Card
            key={card.value}
            title={card.value}
            subTitle={card.title}
            icon={card.icon}
            increase={card.increase}
          />
        ))}
      </div>
      {/* --------- row 2 ---------- */}
      <div className="flex justify-center flex-wrap gap-4 pt-4">
        {/* --------- row 2 (col 1) ---------- */}
        <div className="md:w-[66%] w-full flex-1 capitalize">
          <CardBody>
            <h3>Revenue Generated</h3>
            <h3 className="text-secondary text-lg">
              <CountUp
                endValue={59342.32}
                duration={1}
                isDecimal
                decimalCount={2}
              />
            </h3>
            <div className="h-72">
              <LineChartComponent />
            </div>
          </CardBody>
        </div>
        {/* ---------- row 2 (col 2) ------------ */}
        <div className="min-w-[260px] flex-1">
          <CardBody>
            <div className="overflow-auto h-[390px] -me-5 pe-5">
              <h3 className="p-3 border-b-4 border-b-main-bg">
                Recent Transaction
              </h3>
              {TransactionsList.map((Transaction) => (
                <div
                  key={Transaction.txId}
                  className="flex justify-start text-sm last:border-none items-center border-b-4 border-b-main-bg p-3"
                >
                  <div className="w-32 truncate">
                    <h4 className="text-secondary">{Transaction.txId}</h4>
                    <h4>{Transaction.user}</h4>
                  </div>
                  <p className="text-xs w-24">{Transaction.date}</p>
                  <p className="ms-auto bg-secondary py-1 w-16 text-center text-white px-2 rounded-md">
                    $
                    <CountUp
                      endValue={Transaction.cost}
                      isDecimal
                      decimalCount={2}
                    />
                  </p>
                </div>
              ))}
            </div>
          </CardBody>
        </div>
      </div>
    </>
  );
};

export default Ecommerce;
