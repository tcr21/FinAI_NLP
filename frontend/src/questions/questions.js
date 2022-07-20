function UserQuestions({ questionNumber }) {
  let contents;
  if (questionNumber === "1") {
    contents = <p>1. What is your primary concern when it comes to finance?</p>;
  } else if (questionNumber === "2") {
    contents = <p>2. How would you describe your financial needs?</p>;
  } else if (questionNumber === "3") {
    contents = <p>3. Please describe your personal situation.</p>;
  }
  return contents;
}

export default UserQuestions;
