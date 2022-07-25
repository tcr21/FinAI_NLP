function UserQuestions({ questionNumber }) {
  let contents;
  if (questionNumber === "1") {
    contents = (
      <>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
          1
        </div>
        <p class="block text-large font-medium text-indigo-500 py-2">
          What is your primary concern when it comes to finance?
        </p>
      </>
    );
  } else if (questionNumber === "2") {
    contents = (
      <>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
          2
        </div>
        <p class="block text-large font-medium text-indigo-500 py-2">
          How would you describe your financial needs?
        </p>
      </>
    );
  } else if (questionNumber === "3") {
    contents = (
      <>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
          3
        </div>
        <p class="block text-large font-medium text-indigo-500 py-2">
          What is your income?
        </p>
      </>
    );
  } else if (questionNumber === "4") {
    contents = (
      <>
        <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">
          4
        </div>
        <p class="block text-large font-medium text-indigo-500 py-2">
          What are your expenses?
        </p>
      </>
    );
  } else {
    contents = <p>Sorry, something went wrong. Please try again</p>;
  }
  return contents;
}

export default UserQuestions;
