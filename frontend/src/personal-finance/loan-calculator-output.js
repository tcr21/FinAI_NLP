import ErrorMessage from "../common/error-message";
import { PieChart } from "react-minimal-pie-chart";

function LoanCalculatorOutput({
  inputType,
  amountBorrowed,
  loanTerm,
  interestRate,
  fees,
  apr,
  currency,
}) {
  console.log("Input type", inputType);
  console.log("Currency", currency);

  // Functions
  const calcTotalCostOfLoan = (
    amountBorrowedFlt,
    loanTermMonths,
    interestOrAprFlt
  ) => {
    let remainderCapitalToRepay = amountBorrowedFlt;
    let totalCostOfLoan = 0;
    let monthlyCapitalRepayment = amountBorrowedFlt / loanTermMonths;
    for (let i = 0; i < loanTermMonths; i++) {
      totalCostOfLoan += (1 / 12) * interestOrAprFlt * remainderCapitalToRepay;
      remainderCapitalToRepay -= monthlyCapitalRepayment;
    }
    return totalCostOfLoan;
  };

  const calcTotalAmountToRepay = (totalCostOfLoan, amountBorrowedFlt) => {
    let totalAmountToRepay = totalCostOfLoan + amountBorrowedFlt;
    return totalAmountToRepay;
  };

  const calcTotalMonthlyRepayment = (totalAmountToRepay, loanTermMonths) => {
    let totalMonthlyRepayment = totalAmountToRepay / loanTermMonths;
    return totalMonthlyRepayment;
  };

  let contents;

  // Scenario 1: I have a loan------------------------------------------------------
  if (inputType === "Amount borrowed") {
    // Common
    let amountBorrowedFlt = parseFloat(amountBorrowed);
    let loanTermMonths = parseInt(loanTerm);
    let interestRateFlt = parseFloat(interestRate) / 100;
    let feesFlt = parseFloat(fees);
    let aprFlt = parseFloat(apr) / 100;

    let totalCostOfLoan;
    let totalAmountToRepay;
    let totalMonthlyRepayment;

    let missingFees = false;
    let missingInterestRate = false;

    // Set missing inputs (NaN) to 0
    if (isNaN(amountBorrowedFlt)) {
      amountBorrowedFlt = 0;
    }
    if (isNaN(loanTermMonths)) {
      loanTermMonths = 0;
    }
    if (isNaN(interestRateFlt)) {
      interestRateFlt = 0;
    }
    if (isNaN(feesFlt)) {
      feesFlt = 0;
    }
    if (isNaN(aprFlt)) {
      aprFlt = 0;
    }

    console.log("Amount borrowed", amountBorrowedFlt);
    console.log("Loan term", loanTermMonths);
    console.log("Interest rate", interestRateFlt);
    console.log("Fees", feesFlt);
    console.log("APR", aprFlt);

    // Handle missing essential inputs: loan amount or missing costs or missing loan term
    // TO DO: FIX FORMAT
    if (
      amountBorrowedFlt === 0 ||
      loanTermMonths === 0 ||
      (interestRateFlt === 0 && feesFlt === 0 && aprFlt === 0)
    ) {
      return (
        <div>
          <PieChart
            data={[
              {
                title: "Missing key inputs",
                value: 100,
                color: "#A9A9A9",
              },
            ]}
            lineWidth={40}
          />
          <br></br>
          <p class="text-red-700 text-sm italic">
            Please input 1 and 2, and at least one of 3, 4 or 5 on the left hand
            side.
          </p>
        </div>
      );
    }

    // Handle cost calculation scenarios
    if (interestRateFlt !== 0 && feesFlt !== 0 && aprFlt === 0) {
      console.log("Test interest & fees condition");
      // Interest & fees
      totalCostOfLoan = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        interestRateFlt
      );
      totalCostOfLoan += feesFlt;
    } else if (interestRateFlt !== 0 && feesFlt === 0 && aprFlt === 0) {
      // Interest only
      totalCostOfLoan = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        interestRateFlt
      );
      missingFees = true;
    } else if (interestRateFlt === 0 && feesFlt !== 0 && aprFlt === 0) {
      // Fees only
      totalCostOfLoan = feesFlt;
      missingInterestRate = true;
    } else if ((interestRateFlt === 0 || feesFlt === 0) && aprFlt !== 0) {
      // Apr (if one of interest or fees are missing, apr takes precedence)
      totalCostOfLoan = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        aprFlt
      );
    } else if (interestRateFlt !== 0 && feesFlt !== 0 && aprFlt !== 0) {
      // All of APR, interest and fees are there
      // Interest & fees option
      let totalCostOfLoanInterest = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        interestRateFlt
      );
      totalCostOfLoanInterest += feesFlt;
      // Apr option
      let totalCostOfLoanApr = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        aprFlt
      );
      // Compare and choose highest cost
      totalCostOfLoan = Math.max(totalCostOfLoanInterest, totalCostOfLoanApr);
    }

    // Common to all cost calculation scenarios
    totalAmountToRepay = calcTotalAmountToRepay(
      totalCostOfLoan,
      amountBorrowedFlt
    );
    totalMonthlyRepayment = calcTotalMonthlyRepayment(
      totalAmountToRepay,
      loanTermMonths
    );

    // Set contents and handle warnings if missing interest or fees
    if (missingFees === true) {
      // TO DO: FIX FORMAT
      contents = (
        <div>
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

          <p>Amount borrowed: {Math.round(amountBorrowedFlt)}</p>
          <p>Total cost of loan: {Math.round(totalCostOfLoan)}</p>
          <p>Total amount to repay: {Math.round(totalAmountToRepay)}</p>
          <p>Total monthly repayment: {Math.round(totalMonthlyRepayment)}</p>
          <p class="italic">Note: You have not included fees.</p>
        </div>
      );
    } else if (missingInterestRate === true) {
      // TO DO: FIX FORMAT
      contents = (
        <div>
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

          <p>Amount borrowed: {Math.round(amountBorrowedFlt)}</p>
          <p>Total cost of loan: {Math.round(totalCostOfLoan)}</p>
          <p>Total amount to repay: {Math.round(totalAmountToRepay)}</p>
          <p>Total monthly repayment: {Math.round(totalMonthlyRepayment)}</p>
          <p class="italic">Note: You have not included interest</p>
        </div>
      );
    } else {
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
                  {Math.round(amountBorrowedFlt).toLocaleString("en-US")}{" "}
                  {currency}
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
                  {Math.round(totalCostOfLoan).toLocaleString("en-US")}{" "}
                  {currency}
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
    }
    // Scenario 2: I want a loan------------------------------------------------------
  } else if (inputType === "Monthly amount you can repay") {
    contents = <></>;
  } else {
    contents = (
      <ErrorMessage>
        Sorry, something went wrong. Please try again.
      </ErrorMessage>
    );
  }

  return contents;
}

export default LoanCalculatorOutput;
