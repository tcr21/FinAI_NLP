import { useState } from "react";

function SpeakForm() {
  const [message, setMessage] = useState("");
  const [rate, setRate] = useState(1);

  // Change event handler. It gets a event for the triggered change.
  //   const onMessageChange = (event) => {
  //     console.log("change!");
  //     console.log(event.target);
  //     console.log(event.target.value);
  //     const newMessage = event.target.value;
  //     setMessage(newMessage);
  //   };
  // Shorter version of above
  const onMessageChange = (e) => setMessage(e.target.value);

  const onRateChange = (event) => {
    const newRate = parseFloat(event.target.value);
    setRate(newRate);
  };

  const speak = () => {
    // alert(message);
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 1;
    utterance.rate = rate;
    // Could add pitch slider if we want etc.
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <div>
        <label htmlFor="message">Message:</label>
        <input
          id="message"
          type="text"
          value={message}
          onChange={onMessageChange}
        />
      </div>
      <div>
        <label htmlFor="rate">Rate:</label>
        {/* Values taken from doc on Speech Synthesis API */}
        <input
          id="rate"
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={rate}
          onChange={onRateChange}
        ></input>
      </div>

      <button onClick={speak}>Speak 🔉</button>
    </div>
  );
}

export default SpeakForm;
