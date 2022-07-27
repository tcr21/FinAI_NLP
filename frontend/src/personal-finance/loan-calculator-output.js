import ErrorMessage from "../common/error-message";
import LoanCalculatorOutputComponent1 from "./loan-calculator-component1";
import LoanCalculatorOutputComponent1NoInput from "./loan-calculator-component1-no-input";
import LoanCalculatorOutputComponent2 from "./loan-calculator-component2";
import LoanCalculatorOutputComponent2NoInput from "./loan-calculator-component2-no-input";

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

  // Common functions
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

  // Scenario 1 functions
  const calcTotalMonthlyRepayment = (totalAmountToRepay, loanTermMonths) => {
    let totalMonthlyRepayment = totalAmountToRepay / loanTermMonths;
    return totalMonthlyRepayment;
  };

  // Scenario 2 functions
  const calcTimeToRepay = (
    amountNeeded,
    monthlyAmountCanPay,
    interestOrAprFlt,
    feesFlt
  ) => {
    let timeToRepayMonths = 1;
    // Set 10 year limit
    while (timeToRepayMonths < 120) {
      // Calc total amount can pay
      let totalAmountCanPay = monthlyAmountCanPay * timeToRepayMonths;

      // Calc cost of loan
      let remainderCapitalToRepay = amountNeeded;
      let totalCostOfLoan = 0;
      let monthlyCapitalRepayment = amountNeeded / timeToRepayMonths;
      for (let i = 0; i < timeToRepayMonths; i++) {
        totalCostOfLoan +=
          (1 / 12) * interestOrAprFlt * remainderCapitalToRepay;
        remainderCapitalToRepay -= monthlyCapitalRepayment;
      }
      totalCostOfLoan += feesFlt;
      // Calc total amount to pay
      let totalAmountToPay = amountNeeded + totalCostOfLoan;

      // Compare amount can pay vs amount to pay
      if (totalAmountCanPay >= totalAmountToPay) {
        return timeToRepayMonths;
      } else {
        timeToRepayMonths++;
      }
    }
    return "Time limit exceeded";
  };

  let contents;

  // Scenario 1: I have a loan------------------------------------------------------
  if (inputType === "Amount borrowed") {
    // Common
    let amountBorrowedFlt = Math.abs(parseFloat(amountBorrowed));
    let loanTermMonths = Math.abs(parseInt(loanTerm));
    let interestRateFlt = Math.abs(parseFloat(interestRate) / 100);
    let feesFlt = Math.abs(parseFloat(fees));
    let aprFlt = Math.abs(parseFloat(apr) / 100);

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
    if (
      amountBorrowedFlt === 0 ||
      loanTermMonths === 0 ||
      (interestRateFlt === 0 && feesFlt === 0 && aprFlt === 0)
    ) {
      return (
        <div>
          <p className="text-red-700 text-sm italic">
            Please input 1 and 2, and at least one of 3, 4 or 5 on the left hand
            side to get results below.
          </p>
          <br></br>
          <LoanCalculatorOutputComponent1NoInput
            totalMonthlyRepayment={0}
            amountBorrowedFlt={0}
            totalCostOfLoan={0}
            totalAmountToRepay={0}
            currency={currency}
          ></LoanCalculatorOutputComponent1NoInput>
        </div>
      );
    }

    // Handle cost calculation scenarios
    if (interestRateFlt !== 0 && feesFlt !== 0 && aprFlt === 0) {
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
      contents = (
        <div>
          <LoanCalculatorOutputComponent1
            totalMonthlyRepayment={totalMonthlyRepayment}
            amountBorrowedFlt={amountBorrowedFlt}
            totalCostOfLoan={totalCostOfLoan}
            totalAmountToRepay={totalAmountToRepay}
            currency={currency}
          ></LoanCalculatorOutputComponent1>
          <p className="italic text-red-700 text-sm">
            Note: You have not included any fees
          </p>
        </div>
      );
    } else if (missingInterestRate === true) {
      contents = (
        <div>
          <LoanCalculatorOutputComponent1
            totalMonthlyRepayment={totalMonthlyRepayment}
            amountBorrowedFlt={amountBorrowedFlt}
            totalCostOfLoan={totalCostOfLoan}
            totalAmountToRepay={totalAmountToRepay}
            currency={currency}
          ></LoanCalculatorOutputComponent1>
          <p className="italic text-red-700 text-sm">
            Note: You have not included interest, which is unusual
          </p>
        </div>
      );
    } else {
      contents = (
        <LoanCalculatorOutputComponent1
          totalMonthlyRepayment={totalMonthlyRepayment}
          amountBorrowedFlt={amountBorrowedFlt}
          totalCostOfLoan={totalCostOfLoan}
          totalAmountToRepay={totalAmountToRepay}
          currency={currency}
        ></LoanCalculatorOutputComponent1>
      );
    }
    // Scenario 2: I want a loan------------------------------------------------------
  } else if (inputType === "Monthly amount you can repay") {
    // Common
    // Note: param names reflect names for scenario 1, hence renaming (+ parsing) below
    let amountNeeded = Math.abs(parseFloat(amountBorrowed));
    let monthlyAmountCanPay = Math.abs(parseFloat(loanTerm));
    let interestRateFlt = Math.abs(parseFloat(interestRate) / 100);
    let feesFlt = Math.abs(parseFloat(fees));
    let aprFlt = Math.abs(parseFloat(apr) / 100);

    let timeToRepay;
    let totalCostOfLoan;
    let totalAmountToRepay;

    let missingFees = false;
    let missingInterestRate = false;

    // Set missing inputs (NaN) to 0
    if (isNaN(monthlyAmountCanPay)) {
      monthlyAmountCanPay = 0;
    }
    if (isNaN(amountNeeded)) {
      amountNeeded = 0;
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

    console.log("Monthly amount can pay", monthlyAmountCanPay);
    console.log("Amount needed", amountNeeded);
    console.log("Interest rate", interestRateFlt);
    console.log("Fees", feesFlt);
    console.log("APR", aprFlt);

    // Handle missing essential inputs: loan amount or missing costs or missing loan term
    if (
      monthlyAmountCanPay === 0 ||
      amountNeeded === 0 ||
      (interestRateFlt === 0 && feesFlt === 0 && aprFlt === 0)
    ) {
      return (
        <div>
          <p className="text-red-700 text-sm italic">
            Please input 1 and 2, and at least one of 3, 4 or 5 on the left hand
            side to get results below.
          </p>
          <br></br>
          <LoanCalculatorOutputComponent2NoInput
            timeToRepay={0}
            amountNeeded={0}
            totalCostOfLoan={0}
            totalAmountToRepay={0}
            currency={currency}
            timeToRepayYears={0}
          ></LoanCalculatorOutputComponent2NoInput>
        </div>
      );
    }

    // Handle cost calculation scenarios
    if ((interestRateFlt !== 0 || feesFlt !== 0) && aprFlt === 0) {
      // Interest & fees OR Interest only OR Fees only
      timeToRepay = calcTimeToRepay(
        amountNeeded,
        monthlyAmountCanPay,
        interestRateFlt,
        feesFlt
      );
      if (timeToRepay !== "Time limit exceeded") {
        totalCostOfLoan = calcTotalCostOfLoan(
          amountNeeded,
          timeToRepay,
          interestRateFlt
        );
        totalCostOfLoan += feesFlt;

        totalAmountToRepay = calcTotalAmountToRepay(
          totalCostOfLoan,
          amountNeeded
        );
      }
      if (interestRateFlt !== 0 && feesFlt === 0) {
        // Interest only
        missingFees = true;
      } else if (interestRateFlt === 0 && feesFlt !== 0) {
        // Fees only
        missingInterestRate = true;
      }
    } else if ((interestRateFlt === 0 || feesFlt === 0) && aprFlt !== 0) {
      // Apr (if one of interest or fees are missing, apr takes precedence)
      timeToRepay = calcTimeToRepay(
        amountNeeded,
        monthlyAmountCanPay,
        aprFlt,
        0 // Don't take fees into account
      );
      if (timeToRepay !== "Time limit exceeded") {
        totalCostOfLoan = calcTotalCostOfLoan(
          amountNeeded,
          timeToRepay,
          aprFlt
        );

        totalAmountToRepay = calcTotalAmountToRepay(
          totalCostOfLoan,
          amountNeeded
        );
      }
    } else if (interestRateFlt !== 0 && feesFlt !== 0 && aprFlt !== 0) {
      // All of APR, interest and fees are there
      // Interest & fees option------
      let timeToRepayInterest = calcTimeToRepay(
        amountNeeded,
        monthlyAmountCanPay,
        interestRateFlt,
        feesFlt
      );
      let totalCostOfLoanInterest;
      let totalAmountToRepayInterest;
      if (timeToRepayInterest !== "Time limit exceeded") {
        totalCostOfLoanInterest = calcTotalCostOfLoan(
          amountNeeded,
          timeToRepayInterest,
          interestRateFlt
        );
        totalCostOfLoanInterest += feesFlt;

        totalAmountToRepayInterest = calcTotalAmountToRepay(
          totalCostOfLoanInterest,
          amountNeeded
        );
      }
      // Apr option-------
      let timeToRepayApr = calcTimeToRepay(
        amountNeeded,
        monthlyAmountCanPay,
        aprFlt,
        0 // Don't take fees into account
      );
      let totalCostOfLoanApr;
      let totalAmountToRepayApr;
      if (timeToRepayApr !== "Time limit exceeded") {
        totalCostOfLoanApr = calcTotalCostOfLoan(
          amountNeeded,
          timeToRepayApr,
          aprFlt
        );

        totalAmountToRepayApr = calcTotalAmountToRepay(
          totalCostOfLoanApr,
          amountNeeded
        );
      }
      // Compare and choose highest cost (incl. if time limit exceeded: user needs to know worst case anyhow)------
      if (
        // Apr option is worst so display that
        totalCostOfLoanApr >= totalCostOfLoanInterest
      ) {
        timeToRepay = timeToRepayApr;
        totalCostOfLoan = totalCostOfLoanApr;
        totalAmountToRepay = totalAmountToRepayApr;
      } else {
        // Interest option is worst so display that
        timeToRepay = timeToRepayInterest;
        totalCostOfLoan = totalCostOfLoanInterest;
        totalAmountToRepay = totalAmountToRepayInterest;
      }
    }

    // Convert time to repay to years if more than 12 months
    let timeToRepayYears = 0;
    if (timeToRepay >= 12) {
      timeToRepayYears = Math.floor(timeToRepay / 12);
      timeToRepay = timeToRepay % 12;
    }
    console.log("years", timeToRepayYears);

    // Set contents and handle warnings if missing interest or fees OR time limit exceeded
    if (timeToRepay === "Time limit exceeded") {
      contents = (
        <>
          <p className="text-red-700 text-sm">
            Your loan would take more than 10 years to repay!
          </p>
          <br></br>
          <ul>
            <li className="text-red-700 text-sm italic mb-2">
              Could you lower the amount you need?
            </li>
            <li className="text-red-700 text-sm italic mb-2">
              Increase the amount you can repay each month?
            </li>
            <li className="text-red-700 text-sm italic mb-2">
              Negotiate the rates to lower amounts?
            </li>
          </ul>
        </>
      );
    } else if (missingFees === true) {
      contents = (
        <div>
          <LoanCalculatorOutputComponent2
            timeToRepay={timeToRepay}
            amountNeeded={amountNeeded}
            totalCostOfLoan={totalCostOfLoan}
            totalAmountToRepay={totalAmountToRepay}
            currency={currency}
            timeToRepayYears={timeToRepayYears}
          ></LoanCalculatorOutputComponent2>
          <p className="italic text-red-700 text-sm">
            Note: You have not included any fees
          </p>
        </div>
      );
    } else if (missingInterestRate === true) {
      contents = (
        <div>
          <LoanCalculatorOutputComponent2
            timeToRepay={timeToRepay}
            amountNeeded={amountNeeded}
            totalCostOfLoan={totalCostOfLoan}
            totalAmountToRepay={totalAmountToRepay}
            currency={currency}
            timeToRepayYears={timeToRepayYears}
          ></LoanCalculatorOutputComponent2>
          <p className="italic text-red-700 text-sm">
            Note: You have not included interest, which is unusual
          </p>
        </div>
      );
    } else {
      contents = (
        <LoanCalculatorOutputComponent2
          timeToRepay={timeToRepay}
          amountNeeded={amountNeeded}
          totalCostOfLoan={totalCostOfLoan}
          totalAmountToRepay={totalAmountToRepay}
          currency={currency}
          timeToRepayYears={timeToRepayYears}
        ></LoanCalculatorOutputComponent2>
      );
    }

    // Neither scenario: means error------------------------------------------------------
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
