function LoanCalculatorInput({ type }) {
  let contents;
  contents = (
    <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          1
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
            AMOUNT BORROWED
          </h2>
          <br></br>
          <div>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="amount-borrowed"
                id="amount-borrowed"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <label for="currency" class="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-0 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  <option>Rs</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          2
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
            LOAN TERM
          </h2>
          <p class="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
            Years to repay loan
          </p>
          <br></br>
          <div>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="loan-term"
                id="loan-term"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <div
                  id="currency"
                  name="currency"
                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          3
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
            INTEREST RATE
          </h2>
          <p class="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
            As % of amount borrowed
          </p>
          <br></br>
          <div>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="interest-rate"
                id="interest-rate"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <div
                  id="currency"
                  name="currency"
                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          4
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
            FEES
          </h2>
          <p class="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
            As absolute or % of amount borrowed
          </p>
          <br></br>
          <div>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="fees"
                id="fees"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <label for="currency" class="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-0 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  <option>Rs</option>
                  <option>USD</option>
                  <option>%</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex relative">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          5
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-indigo-500 mb-1 tracking-wider">
            APR
          </h2>
          <p class="font-medium title-font text-xs text-indigo-500 mb-1 tracking-wider italic">
            Interest + fees as % of amount borrowed
          </p>
          <br></br>
          <div>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="interest-rate"
                id="interest-rate"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-1 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <div
                  id="currency"
                  name="currency"
                  class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return contents;
}

export default LoanCalculatorInput;
