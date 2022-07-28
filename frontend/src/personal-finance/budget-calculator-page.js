import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

function BudgetCalculatorPage() {
  // COMMON VARIABLES-----------------------------------------------------------------
  // All currency input (taken from first income input)
  const [selectedCurrency, setSelectedCurrency] = useState("Rs");
  const onChangeCurrency = (e) => {
    setSelectedCurrency(e.target.value);
  };
  // INCOME VARIABLES-----------------------------------------------------------------
  // Income input fields
  const [mainIncome, setMainIncome] = useState("");
  const [spouseIncome, setSpouseIncome] = useState("");
  const [otherFamilyIncome, setOtherFamilyIncome] = useState("");
  const [maternityPay, setMaternityPay] = useState("");
  const [sickPay, setSickPay] = useState("");
  const [otherBenefits, setOtherBenefits] = useState("");
  const [anyOtherIncome, setAnyOtherIncome] = useState("");
  const onMainIncomeChange = (e) => setMainIncome(e.target.value);
  const onSpouseIncomeChange = (e) => setSpouseIncome(e.target.value);
  const onOtherFamilyIncomeChange = (e) => setOtherFamilyIncome(e.target.value);
  const onMaternityPayChange = (e) => setMaternityPay(e.target.value);
  const onSickPayChange = (e) => setSickPay(e.target.value);
  const onOtherBenefitsChange = (e) => setOtherBenefits(e.target.value);
  const onAnyOtherIncomeChange = (e) => setAnyOtherIncome(e.target.value);

  // Income input floats
  let mainIncomeFlt = Math.abs(parseFloat(mainIncome));
  let spouseIncomeFlt = Math.abs(parseFloat(spouseIncome));
  let otherFamilyIncomeFlt = Math.abs(parseFloat(otherFamilyIncome));
  let maternityPayFlt = Math.abs(parseFloat(maternityPay));
  let sickPayFlt = Math.abs(parseFloat(sickPay));
  let otherBenefitsFlt = Math.abs(parseFloat(otherBenefits));
  let anyOtherIncomeFlt = Math.abs(parseFloat(anyOtherIncome));
  // Income handle empty inputs
  if (isNaN(mainIncomeFlt)) {
    mainIncomeFlt = 0;
  }
  if (isNaN(spouseIncomeFlt)) {
    spouseIncomeFlt = 0;
  }
  if (isNaN(otherFamilyIncomeFlt)) {
    otherFamilyIncomeFlt = 0;
  }
  if (isNaN(maternityPayFlt)) {
    maternityPayFlt = 0;
  }
  if (isNaN(sickPayFlt)) {
    sickPayFlt = 0;
  }
  if (isNaN(otherBenefitsFlt)) {
    otherBenefitsFlt = 0;
  }
  if (isNaN(anyOtherIncomeFlt)) {
    anyOtherIncomeFlt = 0;
  }
  // Income pie chart categories
  let mainIncomeSum = mainIncomeFlt;
  let familyIncomeSum = spouseIncomeFlt + otherFamilyIncomeFlt;
  let benefitsSum = maternityPayFlt + sickPayFlt + otherBenefitsFlt;
  let anyOtherIncomeSum = anyOtherIncomeFlt;
  // Income total
  let totalIncome =
    mainIncomeSum + familyIncomeSum + benefitsSum + anyOtherIncomeSum;

  // EXPENSES VARIABLES-----------------------------------------------------------------
  // Expenses input fields
  // Household
  const [rentOrMortgage, setRentOrMortgage] = useState("");
  const [utilityBills, setUtilityBills] = useState("");
  const [otherHouseExpenses, setOtherHouseExpenses] = useState("");
  // Living costs
  const [foodAndDrink, setFoodAndDrink] = useState("");
  const [health, setHealth] = useState("");
  const [otherLivingCosts, setOtherLivingCosts] = useState("");
  // Family & friends
  const [children, setChildren] = useState("");
  const [spouse, setSpouse] = useState("");
  const [otherFamilyAndFriends, setOtherFamilyAndFriends] = useState("");
  // Transport
  const [gas, setGas] = useState("");
  const [personalTransport, setPersonalTransport] = useState("");
  const [publicTransport, setPublicTransport] = useState("");
  // Finance
  const [loanRepayment, setLoanRepayment] = useState("");
  const [savingTarget, setSavingTarget] = useState("");
  // Other
  const [anyOtherExpenses, setAnyOtherExpenses] = useState("");
  // OnChange functions
  // Household
  const onRentOrMortgageChange = (e) => setRentOrMortgage(e.target.value);
  const onUtilityBillsChange = (e) => setUtilityBills(e.target.value);
  const onOtherHouseExpensesChange = (e) =>
    setOtherHouseExpenses(e.target.value);
  // Living costs
  const onFoodAndDrinkChange = (e) => setFoodAndDrink(e.target.value);
  const onHealthChange = (e) => setHealth(e.target.value);
  const onOtherLivingCostsChange = (e) => setOtherLivingCosts(e.target.value);
  // Family & friends
  const onChildrenChange = (e) => setChildren(e.target.value);
  const onSpouseChange = (e) => setSpouse(e.target.value);
  const onOtherFamilyAndFriendsChange = (e) =>
    setOtherFamilyAndFriends(e.target.value);
  // Transport
  const onGasChange = (e) => setGas(e.target.value);
  const onPersonalTransportChange = (e) => setPersonalTransport(e.target.value);
  const onPublicTransportChange = (e) => setPublicTransport(e.target.value);
  // Finance
  const onLoanRepaymentChange = (e) => setLoanRepayment(e.target.value);
  const onSavingTargetChange = (e) => setSavingTarget(e.target.value);
  // Other
  const onAnyOtherExpensesChange = (e) => setAnyOtherExpenses(e.target.value);

  // Expenses input floats
  let rentOrMortgageFlt = Math.abs(parseFloat(rentOrMortgage));
  let utilityBillsFlt = Math.abs(parseFloat(utilityBills));
  let otherHouseExpensesFlt = Math.abs(parseFloat(otherHouseExpenses));
  let foodAndDrinkFlt = Math.abs(parseFloat(foodAndDrink));
  let healthFlt = Math.abs(parseFloat(health));
  let otherLivingCostsFlt = Math.abs(parseFloat(otherLivingCosts));
  let childrenFlt = Math.abs(parseFloat(children));
  let spouseFlt = Math.abs(parseFloat(spouse));
  let otherFamilyAndFriendsFlt = Math.abs(parseFloat(otherFamilyAndFriends));
  let gasFlt = Math.abs(parseFloat(gas));
  let personalTransportFlt = Math.abs(parseFloat(personalTransport));
  let publicTransportFlt = Math.abs(parseFloat(publicTransport));
  let loanRepaymentFlt = Math.abs(parseFloat(loanRepayment));
  let savingTargetFlt = Math.abs(parseFloat(savingTarget));
  let anyOtherExpensesFlt = Math.abs(parseFloat(anyOtherExpenses));

  // Income handle empty inputs
  if (isNaN(rentOrMortgageFlt)) {
    rentOrMortgageFlt = 0;
  }
  if (isNaN(utilityBillsFlt)) {
    utilityBillsFlt = 0;
  }
  if (isNaN(otherHouseExpensesFlt)) {
    otherHouseExpensesFlt = 0;
  }
  if (isNaN(foodAndDrinkFlt)) {
    foodAndDrinkFlt = 0;
  }
  if (isNaN(healthFlt)) {
    healthFlt = 0;
  }
  if (isNaN(otherLivingCostsFlt)) {
    otherLivingCostsFlt = 0;
  }
  if (isNaN(childrenFlt)) {
    childrenFlt = 0;
  }
  if (isNaN(spouseFlt)) {
    spouseFlt = 0;
  }
  if (isNaN(otherFamilyAndFriendsFlt)) {
    otherFamilyAndFriendsFlt = 0;
  }
  if (isNaN(gasFlt)) {
    gasFlt = 0;
  }
  if (isNaN(personalTransportFlt)) {
    personalTransportFlt = 0;
  }
  if (isNaN(publicTransportFlt)) {
    publicTransportFlt = 0;
  }
  if (isNaN(loanRepaymentFlt)) {
    loanRepaymentFlt = 0;
  }
  if (isNaN(savingTargetFlt)) {
    savingTargetFlt = 0;
  }
  if (isNaN(anyOtherExpensesFlt)) {
    anyOtherExpensesFlt = 0;
  }
  // Income pie chart categories
  let houseBillsSum =
    rentOrMortgageFlt + utilityBillsFlt + otherHouseExpensesFlt;
  let livingCostsSum = foodAndDrinkFlt + healthFlt + otherLivingCostsFlt;
  let familyAndFriendsSum = childrenFlt + spouseFlt + otherFamilyAndFriendsFlt;

  let transportSum = gasFlt + personalTransportFlt + publicTransportFlt;
  let financeSum = loanRepaymentFlt + savingTargetFlt;

  let otherExpensesSum = anyOtherExpensesFlt;

  // Expenses total TO DO: fix
  let totalExpenses =
    houseBillsSum +
    livingCostsSum +
    familyAndFriendsSum +
    transportSum +
    financeSum +
    otherExpensesSum;

  // DIFFERENCE VARIABLES-----------------------------------------------------------------
  let differenceIncomeExpenses = totalIncome - totalExpenses;
  let message = "";
  if (totalIncome === 0 && totalExpenses === 0) {
    message = "";
  } else if (differenceIncomeExpenses < 0) {
    message = "Could you reduce your expenses?";
  } else if (differenceIncomeExpenses > 0) {
    message = "You have extra, add this to your savings!";
  } else if (differenceIncomeExpenses === 0) {
    message = "You've got just enough.";
  }

  // CONTENTS ALL-----------------------------------------------------------------
  let contents;
  contents = (
    <>
      <div className="flex flex-col text-center w-full mb-0 py-10">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          BUDGET CALCULATOR
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Adjust your budget and expenses
        </h1>
      </div>
      <div className="flex flex-col text-center w-full mb-0">
        <p className="text-gray-900 text-sm italic mb-4">
          Please input amounts in the boxes below.
        </p>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-0 mx-auto flex flex-wrap bg-gray-100 rounded-lg">
          <div className="flex flex-col text-center items-center w-full mb-0">
            <h2 className="text-sm tracking-widest title-font mb-0 font-medium py-3">
              Difference between income & expenses
            </h2>
            <div className="flex mt-0 items-center pb-0 border-b-2 border-gray-100 mb-0">
              <h1
                className={
                  differenceIncomeExpenses >= 0
                    ? "text-2xl text-green-500 leading-none flex items-center pb-0 mb-0 border-b border-gray-200"
                    : "text-2xl text-red-500 leading-none flex items-center pb-0 mb-0 border-b border-gray-200"
                }
              >
                <span>
                  {differenceIncomeExpenses} {selectedCurrency}
                </span>
              </h1>
            </div>
            <p
              className={
                differenceIncomeExpenses >= 0
                  ? "text-green-500 text-sm italic mb-2"
                  : "text-red-500 text-sm italic mb-2"
              }
            >
              {message}
            </p>
          </div>

          <div className="flex flex-wrap w-full">
            <div className="lg:w-1/2 md:w-1/2 md:pr-5 md:pl-5 md:py-2 mb-10">
              {/* INCOME OUTPUT */}
              <h2 className="text-sm tracking-widest title-font mb-0 font-medium">
                Total monthly income
              </h2>
              <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
                <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
                  <span>
                    {Math.round(totalIncome).toLocaleString("en-US")}{" "}
                    {selectedCurrency}
                  </span>
                </h1>
              </div>
              <div className="flex relative pb-7 py-0 pl-5">
                <PieChart
                  data={[
                    {
                      title: "",
                      value: Math.round(totalIncome) === 0 ? 1 : 0,
                      color: "#A9A9A9",

                      displayLabel: "",
                    },
                    {
                      title: "Main",
                      value: Math.round(mainIncomeSum),
                      color: "#15803d",

                      displayLabel:
                        Math.round(mainIncomeSum) === 0
                          ? ""
                          : "Main \n" +
                            Math.round((mainIncomeSum / totalIncome) * 100) +
                            "%",
                    },
                    {
                      title: "Family",
                      value: Math.round(familyIncomeSum),
                      color: "#22c55e",
                      displayLabel:
                        Math.round(familyIncomeSum) === 0
                          ? ""
                          : "Family \n" +
                            Math.round((familyIncomeSum / totalIncome) * 100) +
                            "%",
                    },
                    {
                      title: "Benefits",
                      value: Math.round(benefitsSum),
                      color: "#bbf7d0",
                      displayLabel:
                        Math.round(benefitsSum) === 0
                          ? ""
                          : "Benefits \n" +
                            Math.round((benefitsSum / totalIncome) * 100) +
                            "%",
                    },
                    {
                      title: "Other",
                      value: Math.round(anyOtherIncomeSum),
                      color: "#5eead4",
                      displayLabel:
                        Math.round(anyOtherIncomeSum) === 0
                          ? ""
                          : "Other \n" +
                            Math.round(
                              (anyOtherIncomeSum / totalIncome) * 100
                            ) +
                            "%",
                    },
                  ]}
                  lineWidth={40}
                  labelPosition={65}
                  label={(data) => data.dataEntry.displayLabel}
                  labelStyle={{
                    fontSize: "6px",
                    fontColor: "FFFFFA",
                    fontWeight: "400",
                  }}
                />
              </div>
              {/* INCOME INPUT */}
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
                  1
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    MAIN INCOME
                  </h2>
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="main-income"
                        id="main-income"
                        value={mainIncome}
                        onChange={onMainIncomeChange}
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
                          onChange={onChangeCurrency}
                        >
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                  2
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    FAMILY INCOME
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Spouse income
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="spouse-income"
                        id="spouse-income"
                        value={spouseIncome}
                        onChange={onSpouseIncomeChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic mt-1">
                    Other family income
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="other-family-income"
                        id="other-family-income"
                        value={otherFamilyIncome}
                        onChange={onOtherFamilyIncomeChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 inline-flex items-center justify-center text-white relative z-10">
                  3
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    BENEFITS
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Maternity pay
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="maternity-pay"
                        id="maternity-pay"
                        value={maternityPay}
                        onChange={onMaternityPayChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic mt-1">
                    Sick pay
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="sick-pay"
                        id="sick-pay"
                        value={sickPay}
                        onChange={onSickPayChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic mt-1">
                    Other benefits
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="other-benefits"
                        id="other-benefits"
                        value={otherBenefits}
                        onChange={onOtherBenefitsChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-300 inline-flex items-center justify-center text-white relative z-10">
                  4
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    ANY OTHER INCOME
                  </h2>
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="any-other-income"
                        id="any-other-income"
                        value={anyOtherIncome}
                        onChange={onAnyOtherIncomeChange}
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
            </div>

            {/* EXPENSES TO DO */}
            <div className="lg:w-1/2 md:w-1/2 md:pr-5 md:pl-5 md:py-2 mb-10">
              {/* EXPENSES OUTPUT */}
              <h2 className="text-sm tracking-widest title-font mb-0 font-medium">
                Total monthly expenses
              </h2>
              <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-100 mb-0">
                <h1 className="text-2xl text-gray-900 leading-none flex items-center pb-0 mb-0 border-b border-gray-200">
                  <span>
                    {Math.round(totalExpenses).toLocaleString("en-US")}{" "}
                    {selectedCurrency}
                  </span>
                </h1>
              </div>
              <div className="flex relative pb-7 py-0 pl-5">
                <PieChart
                  data={[
                    {
                      title: "",
                      value: Math.round(totalExpenses) === 0 ? 1 : 0,
                      color: "#A9A9A9",
                      displayLabel: "",
                    },
                    {
                      title: "House",
                      value: Math.round(houseBillsSum),
                      color: "#7f1d1d",
                      displayLabel:
                        Math.round(houseBillsSum) === 0
                          ? ""
                          : "House \n" +
                            Math.round((houseBillsSum / totalExpenses) * 100) +
                            "%",
                    },
                    {
                      title: "Living costs",
                      value: Math.round(livingCostsSum),
                      color: "#dc2626",
                      displayLabel:
                        Math.round(livingCostsSum) === 0
                          ? ""
                          : "Living \n" +
                            Math.round((livingCostsSum / totalExpenses) * 100) +
                            "%",
                    },
                    {
                      title: "Family & friends",
                      value: Math.round(familyAndFriendsSum),
                      color: "#f87171",
                      displayLabel:
                        Math.round(familyAndFriendsSum) === 0
                          ? ""
                          : "Family \n" +
                            Math.round(
                              (familyAndFriendsSum / totalExpenses) * 100
                            ) +
                            "%",
                    },
                    {
                      title: "Transport",
                      value: Math.round(transportSum),
                      color: "#fecaca",
                      displayLabel:
                        Math.round(transportSum) === 0
                          ? ""
                          : "Transport \n" +
                            Math.round((transportSum / totalExpenses) * 100) +
                            "%",
                    },
                    {
                      title: "Finance",
                      value: Math.round(financeSum),
                      color: "#fed7aa",
                      displayLabel:
                        Math.round(financeSum) === 0
                          ? ""
                          : "Finance \n" +
                            Math.round((financeSum / totalExpenses) * 100) +
                            "%",
                    },
                    {
                      title: "Other",
                      value: Math.round(otherExpensesSum),
                      color: "#fb923c",
                      displayLabel:
                        Math.round(otherExpensesSum) === 0
                          ? ""
                          : "Other \n" +
                            Math.round(
                              (otherExpensesSum / totalExpenses) * 100
                            ) +
                            "%",
                    },
                  ]}
                  lineWidth={40}
                  labelPosition={65}
                  label={(data) => data.dataEntry.displayLabel}
                  labelStyle={{
                    fontSize: "6px",
                    fontColor: "FFFFFA",
                    fontWeight: "400",
                  }}
                />
              </div>
              {/* EXPENSES INPUT */}

              <div className="flex relative pb-5">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-900 inline-flex items-center justify-center text-white relative z-10">
                  1
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    HOUSEHOLD
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Rent or mortgage
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="rent-or-mortgage"
                        id="rent-or-mortgage"
                        value={rentOrMortgage}
                        onChange={onRentOrMortgageChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic mt-1">
                    Utility bills
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="utility-bills"
                        id="utility-bills"
                        value={utilityBills}
                        onChange={onUtilityBillsChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic mt-1">
                    Other house expenses
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="other-house-expenses"
                        id="other-house-expenses"
                        value={otherHouseExpenses}
                        onChange={onOtherHouseExpensesChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex relative pb-5">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 inline-flex items-center justify-center text-white relative z-10">
                  2
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    LIVING COSTS
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Food & drink
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="food-drink"
                        id="food-drink"
                        value={foodAndDrink}
                        onChange={onFoodAndDrinkChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Health
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="health"
                        id="health"
                        value={health}
                        onChange={onHealthChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Other living costs
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="other-living-costs"
                        id="other-living-costs"
                        value={otherLivingCosts}
                        onChange={onOtherLivingCostsChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex relative pb-5">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-400 inline-flex items-center justify-center text-white relative z-10">
                  3
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    FAMILY & FRIENDS
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Child expenses
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="child-expenses"
                        id="child-expenses"
                        value={children}
                        onChange={onChildrenChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Spouse expenses
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="spouse-expenses"
                        id="spouse-expenses"
                        value={spouse}
                        onChange={onSpouseChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Other relatives
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="other-family-friends-expenses"
                        id="other-family-friends-expenses"
                        value={otherFamilyAndFriends}
                        onChange={onOtherFamilyAndFriendsChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex relative pb-5">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-200 inline-flex items-center justify-center text-white relative z-10">
                  4
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    TRANSPORT
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Gas
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="gas"
                        id="gas"
                        value={gas}
                        onChange={onGasChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Personal transport
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="personal-transport"
                        id="personal-transport"
                        value={personalTransport}
                        onChange={onPersonalTransportChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Public transport
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="public-transport"
                        id="public-transport"
                        value={publicTransport}
                        onChange={onPublicTransportChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex relative pb-5">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-400 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-200 inline-flex items-center justify-center text-white relative z-10">
                  5
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    FINANCE
                  </h2>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 tracking-wider italic">
                    Loan repayment
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="loan-repayment"
                        id="loan-repayment"
                        value={loanRepayment}
                        onChange={onLoanRepaymentChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium title-font text-xs text-indigo-500 mb-0 mt-1 tracking-wider italic">
                    Savings target
                  </p>
                  <div>
                    <div className="mt-0 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="savings-target"
                        id="savings-target"
                        value={savingTarget}
                        onChange={onSavingTargetChange}
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
                          <option value="Rs">Rs</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-400 inline-flex items-center justify-center text-white relative z-10">
                  6
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
                    ANY OTHER EXPENSES
                  </h2>
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        name="any-other-expenses"
                        id="any-other-expenses"
                        value={anyOtherExpenses}
                        onChange={onAnyOtherExpensesChange}
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
            </div>
          </div>
        </div>
        {/* DISCLAIMER */}
        <div className="text-gray-900 text-sm italic mb-5 py-2 text-center">
          These figures are estimates and for illustrative purposes only.
        </div>
      </section>
    </>
  );
  return contents;
}

export default BudgetCalculatorPage;
