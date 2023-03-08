import { SetStateAction, useState } from "react";
import NavBar from "./components/NavBar";
import house from "./assets/buy-a-house.svg";
import MonthlyAmount from "./components/MonthlyAmount";
import { DebounceInput } from "react-debounce-input";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(25000);
  const [reachDate, setReachDate] = useState("2024-01");
  const [today] = useState<Date>(new Date());

  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const handleChangeReachDate = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setReachDate(event.target.value);
  };

  return (
    <>
      <NavBar />
      <h1 className="app__heading">
        Let's plan your <span>savings goal</span>.
      </h1>
      <main className="app">
        <section>
          <div className="app__saving__goal">
            <div>
              <img className="app__saving__goal__img" src={house} alt="" />
            </div>
            <div className="app__saving__goal__div">
              <h2>Buy a house</h2>
              <p>Saving goal</p>
            </div>
          </div>
          <form>
            <div className="form__div">
              <label htmlFor="amount">Total amount</label>
              <DebounceInput
                data-testid="amount"
                id="amount"
                type="number"
                name="amount"
                value={amount}
                pattern="^\d*(\.\d{0,2})?$"
                debounceTimeout={300}
                onChange={handleChangeAmount}
                onKeyDown={(event) =>
                  ["e", "E", "+", "-"].includes(event.key) &&
                  event.preventDefault()
                }
                inputMode="numeric"
                required={true}
              />
            </div>
            <div className="form__div">
              <label htmlFor="reachDate">Reach goal by</label>
              <input
                data-testid="reachDate"
                id="reachDate"
                type="month"
                name="reachDate"
                min={`${today.getFullYear()}-${
                  today.getMonth() == 11
                    ? 12
                    : today.getMonth() + 2 < 10
                    ? `0${today.getMonth() + 2}`
                    : `${today.getMonth() + 2}`
                }`}
                value={reachDate}
                onChange={handleChangeReachDate}
                required={true}
              />
            </div>
          </form>
          <MonthlyAmount amount={amount} reachDate={reachDate} today={today} />
          <button className="app__button">Confirm</button>
        </section>
      </main>
    </>
  );
}

export default App;
