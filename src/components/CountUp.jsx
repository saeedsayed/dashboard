import React, { useEffect, useState } from "react";

const CountUp = ({
  endValue = 120,
  duration = 2,
  isDecimal = false,
  decimalCount = 1,
}) => {
  const [count, setCount] = useState(0);
  endValue = Number(endValue);

  useEffect(() => {
    let a = 0;
    const intervalId = setInterval(() => {
      const increment = (endValue - (a - 1)) / (duration * 30);
      a += increment;
      setCount((prevCount) => prevCount + increment);
      if (a >= endValue - 0.001) {
        clearInterval(intervalId);
        isDecimal && setCount(endValue);
      }
    }, 16.66);
    return () => clearInterval(intervalId);
  }, [endValue, duration]);
  return (isDecimal
    ? count.toFixed(decimalCount)
    : Math.trunc(count)
        .toString())
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default CountUp;
