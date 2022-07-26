import { useState } from "react";
import LoanCalculatorInput from "./loan-calculator-input";
import LoanCalculatorOption from "./loan-calculator-option";

function LoanCalculatorPage() {
  const [inputType, setInputType] = useState("Amount borrowed");

  let contents;
  contents = (
    <>
      <LoanCalculatorOption type={inputType}></LoanCalculatorOption>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto flex flex-wrap">
          <div class="flex flex-wrap w-full">
            <LoanCalculatorInput type={inputType} />
            <img
              class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
              src="https://dummyimage.com/1200x500"
              alt="step"
            />
          </div>
        </div>
      </section>
    </>
  );

  return contents;
}

export default LoanCalculatorPage;
