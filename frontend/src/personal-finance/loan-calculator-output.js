import ErrorMessage from "../common/error-message";

function LoanCalculatorOutput({
  inputType,
  amountBorrowed,
  loanTerm,
  interestRate,
  fees,
  apr,
}) {
  console.log("Input type", inputType);

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

  if (inputType === "Amount borrowed") {
    // Common
    let amountBorrowedFlt = parseFloat(amountBorrowed);
    let loanTermMonths = parseInt(loanTerm);
    let interestRateFlt = parseFloat(interestRate) / 100;
    let feesFlt = parseFloat(fees);
    let aprFlt = parseFloat(apr) / 100;

    console.log("Amount borrowed", amountBorrowedFlt);
    console.log("Loan term", loanTermMonths);
    console.log("Interest rate", interestRateFlt);
    console.log("Fees", feesFlt);
    console.log("APR", aprFlt);

    let totalCostOfLoan;
    let totalAmountToRepay;
    let totalMonthlyRepayment;
    let missingFees;

    if (
      isNaN(interestRateFlt) === false &&
      isNaN(feesFlt) === false &&
      isNaN(aprFlt) === true
    ) {
      console.log("Test interest & fees condition");
      // Interest & fees
      totalCostOfLoan = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        interestRateFlt
      );
      totalCostOfLoan += feesFlt;
    } else if (
      isNaN(interestRateFlt) === false &&
      isNaN(feesFlt) === true &&
      isNaN(aprFlt) === true
    ) {
      // Interest only
      totalCostOfLoan = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        interestRateFlt
      );
      missingFees = true;
    } else if (
      (isNaN(interestRateFlt) === true || isNaN(feesFlt) === true) &&
      isNaN(aprFlt) === false
    ) {
      // Apr
      totalCostOfLoan = calcTotalCostOfLoan(
        amountBorrowedFlt,
        loanTermMonths,
        aprFlt
      );
    } else if (
      isNaN(interestRateFlt) === false &&
      isNaN(feesFlt) === false &&
      isNaN(aprFlt) === false
    ) {
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
      // Compare
      totalCostOfLoan = Math.max(totalCostOfLoanInterest, totalCostOfLoanApr);
    } else {
      return (
        <ErrorMessage>
          Please make sure you have input at least one of interest rate or APR.
        </ErrorMessage>
      );
    }
    // Common
    totalAmountToRepay = calcTotalAmountToRepay(
      totalCostOfLoan,
      amountBorrowedFlt
    );

    totalMonthlyRepayment = calcTotalMonthlyRepayment(
      totalAmountToRepay,
      loanTermMonths
    );

    contents = (
      <div>
        <p>Amount borrowed: {Math.round(amountBorrowedFlt)}</p>
        <p>Total cost of loan: {Math.round(totalCostOfLoan)}</p>
        <p>Total amount to repay: {Math.round(totalAmountToRepay)}</p>
        <p>Total monthly repayment: {Math.round(totalMonthlyRepayment)}</p>
      </div>
    );
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
