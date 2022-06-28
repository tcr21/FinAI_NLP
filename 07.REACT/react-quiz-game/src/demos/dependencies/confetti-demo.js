import { useState } from "react";
import Confetti from "react-confetti";

function ConfettiDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [numParticles, setNumParticles] = useState(200);

  const toggleConfetti = () => setIsRunning(!isRunning);
  const onParticlesChange = (event) => {
    //   parseInt takes in second param = base of number
    const newNumParticles = parseInt(event.target.value, 10);
    setNumParticles(newNumParticles);
  };

  const buttonText = isRunning ? "Turn Confetti Off" : "Turn Confetti On";

  return (
    <div>
      <div>
        <label htmlFor="num-particles">Num Particles:</label>
        <input
          type="range"
          id="num-particles"
          min="1"
          max="3000"
          step="1"
          value={numParticles}
          onChange={onParticlesChange}
        ></input>
      </div>
      <div>
        <button onClick={toggleConfetti}>{buttonText}</button>
      </div>
      <Confetti
        numberOfPieces={numParticles}
        gravity={0.2}
        wind={0.05}
        run={isRunning}
      />
    </div>
  );
}

export default ConfettiDemo;
