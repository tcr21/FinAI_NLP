import { useState } from "react";
import ErrorMessage from "../common/error-message";
import LoanCalculatorOutput from "./loan-calculator-output";

function LoanCalculatorPage() {
  const [inputType, setInputType] = useState("Amount borrowed");

  // Note: "Amount borrowed" variable used for both input types (ie amount borrowed or amount I can borrow)
  const [amountBorrowed, setAmountBorrowed] = useState("");
  const [loanTerm, setLoanTerm] = useState("0");
  const [interestRate, setInterestRate] = useState("");
  const [fees, setFees] = useState("");
  const [apr, setApr] = useState("");

  const onAmountBorrowedChange = (e) => setAmountBorrowed(e.target.value);
  const onLoanTermChange = (e) => setLoanTerm(e.target.value);
  const onInterestRateChange = (e) => setInterestRate(e.target.value);
  const onFeesChange = (e) => setFees(e.target.value);
  const onAprChange = (e) => setApr(e.target.value);

  let contents;
  if (inputType === "Amount borrowed") {
    contents = (
      <>
        {/* INPUT TYPE */}
        <div className="flex flex-col text-center w-full mb-0 py-10">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            LOAN CALCULATOR
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Find out what a loan means for you
          </h1>
        </div>
        <div className="flex flex-col text-center w-full mb-0">
          <div className="mb-3 flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6 divide-x-2 divide-solid divide-indigo-500">
            <button className="py-0 px-4 bg-indigo-500 text-white text-sm focus:outline-none border-0 hover:bg-indigo-500 hover:text-white">
              I have a loan
            </button>
            <button
              onClick={() => setInputType("Monthly amount you can repay")}
              className="py-1 px-4 bg-white text-gray-900 text-sm focus:outline-none border-0 hover:bg-gray-200 hover:text-white"
            >
              I want a loan
            </button>
          </div>
          <p className="text-gray-900 text-sm italic">
            Please input amounts for all fields, or fields 1-4, or fields 1-2
            and 5.
          </p>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-0 mx-auto flex flex-wrap bg-gray-100 rounded-lg">
            <div className="flex flex-wrap w-full">
              {/* INPUT */}
              <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    1
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      {inputType.toUpperCase()}
                    </h2>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="amount-borrowed"
                          id="amount-borrowed"
                          value={amountBorrowed}
                          onChange={onAmountBorrowedChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-0 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>Rs</option>
                            <option>USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    2
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      LOAN TERM
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Months to repay loan
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="loan-term"
                          id="loan-term"
                          value={loanTerm}
                          onChange={onLoanTermChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <div
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            months
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    3
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      ANNUAL INTEREST RATE
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Simple interest as % of amount borrowed
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="interest-rate"
                          id="interest-rate"
                          value={interestRate}
                          onChange={onInterestRateChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <div
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    4
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      ADDITIONAL FEES
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Any additional absolute amounts charged
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="fees"
                          id="fees"
                          value={fees}
                          onChange={onFeesChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-0 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>Rs</option>
                            <option>USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    5
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      APR
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Interest + fees as % of amount borrowed
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="interest-rate"
                          id="interest-rate"
                          value={apr}
                          onChange={onAprChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <div
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* OUTPUT */}
              <LoanCalculatorOutput
                inputType={inputType}
                amountBorrowed={amountBorrowed}
                loanTerm={loanTerm}
                interestRate={interestRate}
                fees={fees}
                apr={apr}
              />
            </div>
          </div>
        </section>
      </>
    );
    // ===================================================================================
  } else if (inputType === "Monthly amount you can repay") {
    contents = (
      <>
        {/* INPUT TYPE - TO UPDATE */}
        <div className="flex flex-col text-center w-full mb-0">
          <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6 divide-x-2 divide-solid divide-indigo-500">
            <button
              onClick={() => setInputType("Amount borrowed")}
              className="py-1 px-4 bg-white text-gray-900 text-sm focus:outline-none border-0 hover:bg-gray-200 hover:text-white"
            >
              I have a loan
            </button>
            <button className="py-1 px-4 bg-indigo-500 text-white text-sm focus:outline-none border-0 hover:bg-indigo-500 hover:text-white">
              I want a loan
            </button>
          </div>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto flex flex-wrap">
            <div className="flex flex-wrap w-full">
              {/* INPUT - SAME AS ABOVE - TO UPDATE */}
              <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    1
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      {inputType.toUpperCase()}
                    </h2>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="amount-borrowed"
                          id="amount-borrowed"
                          value={amountBorrowed}
                          onChange={onAmountBorrowedChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-0 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>Rs</option>
                            <option>USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    2
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      LOAN TERM
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Months to repay loan
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="loan-term"
                          id="loan-term"
                          value={loanTerm}
                          onChange={onLoanTermChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <div
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            months
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    3
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      ANNUAL INTEREST RATE
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Simple interest as % of amount borrowed
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="interest-rate"
                          id="interest-rate"
                          value={interestRate}
                          onChange={onInterestRateChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <div
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    4
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      ADDITIONAL FEES
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Any additional absolute amounts charged
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="fees"
                          id="fees"
                          value={fees}
                          onChange={onFeesChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-0 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>Rs</option>
                            <option>USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                    5
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                      APR
                    </h2>
                    <p className="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
                      Interest + fees as % of amount borrowed
                    </p>
                    <br></br>
                    <div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          name="interest-rate"
                          id="interest-rate"
                          value={apr}
                          onChange={onAprChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <div
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* OUTPUT */}
              <LoanCalculatorOutput
                inputType={inputType}
                amountBorrowed={amountBorrowed}
                loanTerm={loanTerm}
                interestRate={interestRate}
                fees={fees}
                apr={apr}
              />
            </div>
          </div>
        </section>
      </>
    );
  } else {
    <ErrorMessage>Something went wrong, please reload the page.</ErrorMessage>;
  }

  return contents;
}

export default LoanCalculatorPage;
