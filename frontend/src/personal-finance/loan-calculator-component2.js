import { PieChart } from "react-minimal-pie-chart";

function LoanCalculatorOutputComponent2({
  timeToRepay,
  amountNeeded,
  totalCostOfLoan,
  totalAmountToRepay,
  currency,
  timeToRepayYears,
}) {
  let contents;

  contents = (
    <div>
      <h2 className="text-sm tracking-widest title-font mb-0 font-medium">
        Time needed to repay
      </h2>
      <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
        <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
          <span>
            {timeToRepayYears} years, {timeToRepay} months
          </span>
        </h1>
      </div>
      <div className="flex relative pb-10 py-5">
        <PieChart
          data={[
            {
              title: "Amount borrowed",
              value: Math.round(amountNeeded),
              color: "#22c55e",
            },
            {
              title: "Cost of loan",
              value: Math.round(totalCostOfLoan),
              color: "#dc2626",
            },
          ]}
          lineWidth={40}
        />
      </div>
      <div>
        <h2 className="text-sm tracking-widest title-font mb-0 font-medium">
          Amount borrowed
        </h2>
        <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
          <div className="w-4 h-4 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0"></div>
          <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
            <span>
              {Math.round(amountNeeded).toLocaleString("en-US")} {currency}
            </span>
          </h1>
        </div>
        <h2 className="text-sm tracking-widest title-font mb-0 font-medium">
          Cost of loan
        </h2>
        <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
          <div className="w-4 h-4 mr-3 inline-flex items-center justify-center rounded-full bg-red-600 text-white flex-shrink-0"></div>
          <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
            <span>
              {Math.round(totalCostOfLoan).toLocaleString("en-US")} {currency}
            </span>
          </h1>
        </div>
        <h2 className="text-sm tracking-widest title-font mb-0 font-medium">
          Total amount to repay
        </h2>
        <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
          <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
            <span>
              {Math.round(totalAmountToRepay).toLocaleString("en-US")}{" "}
              {currency}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
  return contents;
}

export default LoanCalculatorOutputComponent2;
