import { PieChart } from "react-minimal-pie-chart";

function LoanCalculatorOutputComponent({
  totalMonthlyRepayment,
  amountBorrowedFlt,
  totalCostOfLoan,
  totalAmountToRepay,
  currency,
}) {
  let contents;
  contents = (
    <div>
      <h2 class="text-sm tracking-widest title-font mb-0 font-medium">
        Monthly repayment
      </h2>
      <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
        <h1 class="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
          <span>
            {Math.round(totalMonthlyRepayment).toLocaleString("en-US")}{" "}
            {currency}
          </span>
        </h1>
      </div>
      <div className="flex relative pb-10 py-5">
        <PieChart
          data={[
            {
              title: "Amount borrowed",
              value: Math.round(amountBorrowedFlt),
              color: "#32CD32",
            },
            {
              title: "Cost of loan",
              value: Math.round(totalCostOfLoan),
              color: "#DC143C",
            },
          ]}
          lineWidth={40}
        />
      </div>
      <div>
        <h2 class="text-sm tracking-widest title-font mb-0 font-medium">
          Amount borrowed
        </h2>
        <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
          <div className="w-4 h-4 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0"></div>
          <h1 class="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
            <span>
              {Math.round(amountBorrowedFlt).toLocaleString("en-US")} {currency}
            </span>
          </h1>
        </div>
        <h2 class="text-sm tracking-widest title-font mb-0 font-medium">
          Cost of loan
        </h2>
        <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
          <div className="w-4 h-4 mr-3 inline-flex items-center justify-center rounded-full bg-red-600 text-white flex-shrink-0"></div>
          <h1 class="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
            <span>
              {Math.round(totalCostOfLoan).toLocaleString("en-US")} {currency}
            </span>
          </h1>
        </div>
        <h2 class="text-sm tracking-widest title-font mb-0 font-medium">
          Total amount to repay
        </h2>
        <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
          <h1 class="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
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

export default LoanCalculatorOutputComponent;
