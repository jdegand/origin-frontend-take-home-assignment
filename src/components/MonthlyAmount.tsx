import { useState, useEffect } from "react";

const MonthlyAmount = (props: any) => {
  //const [today] = useState<Date>(new Date());
  const [months, setMonths] = useState<number | null>(null);

  function differenceInMonths(date1: Date, date2: Date) {
    // reachDate first, then current date

    const monthDiff = date1.getMonth() - date2.getMonth();
    const yearDiff = date1.getFullYear() - date2.getFullYear();

    return monthDiff + yearDiff * 12;
  }

  useEffect(() => {
    const months = differenceInMonths(new Date(props.reachDate), props.today);
    setMonths(months);
  }, [props.today, props.reachDate]);

  return (
    <div className="monthly__amount">
      <div className="monthly__amount__top">
        <h3>Monthly amount</h3>
        {months ? (
          <span className="monthly__amount__total">
            <span>$</span>{" "}
            {Math.ceil(props.amount / months).toLocaleString("en-US")}
          </span>
        ) : (
          <span>0</span>
        )}
      </div>
      <div className="monthly__amount__bottom">
        <p>
          You're planning{" "}
          <span className="bolder">
            {months && months > 1
              ? `${months} monthly deposits`
              : `${months} monthly deposit`}
          </span>{" "}
          to reach your
          <span className="bolder">
            {" "}
            $
            {Number(props.amount).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>{" "}
          goal by{" "}
          <span className="bolder">
            {new Date(
              `${props.reachDate.split("-")[0]} ${Number(
                props.reachDate.split("-")[1]
              )}`
            ).toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default MonthlyAmount;
