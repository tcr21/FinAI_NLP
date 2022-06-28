const jsOutputDiv = document.querySelector("#js-output");
// console.log(jsOutputDiv); // Return null if no element found

jsOutputDiv.insertAdjacentHTML(
  "beforeend",
  `<p>Howdy, I'm coming from JS! </p>
  <p>I am inside of the main element, hooray! </p>`
);

// Adding button
const clickButton = document.querySelector("#click-button");
let numClicks = 0;
function onButtonClick() {
  numClicks += 1;
  console.log(`You've clicked ${numClicks} times!`);
  clickButton.textContent = `You've clicked ${numClicks} times!`;
  const hue = Math.random() * 360;
  console.log(hue);
  clickButton.style.backgroundColor = `hsl(${hue}, 100%, 25%)`;
  clickButton.style.color = "white";
}
clickButton.addEventListener("click", onButtonClick);

const speakButton = document.querySelector("#speak-button");
const speakInput = document.querySelector("#speak-input");
speakButton.addEventListener("click", () => {
  const text = speakInput.value; // returns value of element
  if (text !== "") {
    // Speech synthesis API
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 10;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  }
});
