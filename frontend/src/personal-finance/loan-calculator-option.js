function LoanCalculatorOption({ type }) {
  let contents;
  if (type === "Amount borrowed") {
    contents = (
      <div class="flex flex-col text-center w-full mb-0">
        <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6 divide-x-2 divide-solid divide-indigo-500">
          <button
            onClick={() => setInputType()}
            class="py-1 px-4 bg-indigo-500 text-white text-sm focus:outline-none border-0 hover:bg-indigo-500 hover:text-white"
          >
            I have a loan
          </button>
          <button class="py-1 px-4 bg-white text-gray-900 text-sm focus:outline-none border-0 hover:bg-gray-200 hover:text-white">
            I want a loan
          </button>
        </div>
      </div>
    );
  } else if (type === "Monthly amound you can repay") {
  }

  return contents;
}

export default LoanCalculatorOption;

// focus:bg-indigo-500 focus:text-white
