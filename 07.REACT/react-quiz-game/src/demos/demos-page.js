import ConfettiDemo from "./dependencies/confetti-demo";
import MusicalButton from "./dependencies/musical-button";
import SpeakForm from "./state/speak-form";
import ClickButton from "./state/click-button";
import WelcomeMessage from "./props/welcome-message";
import SpeakButton from "./props/speak-button";
import ChatMessage from "./props/chat-message";

function DemosPage() {
  return (
    <main>
      <h1>Financial Literacy App</h1>

      <h2>Confetti Demo</h2>
      <ConfettiDemo></ConfettiDemo>

      <h2>Tone.js Music</h2>
      <MusicalButton>Play some beats 🎧</MusicalButton>

      <h2>Speak Form</h2>
      <SpeakForm></SpeakForm>

      <h2>Stateful Buttons</h2>
      <ClickButton></ClickButton>

      <h2>Welcome</h2>
      {/* TR: Each welcome message shows up twice for some reason in console (when console log props above)
        Warning in console that ReactDOM.render is no longer supported in React 18
        Name and greeting become properties on an object passed into Welcome message */}
      <WelcomeMessage name="Anandha" greeting="Hello" />
      <WelcomeMessage name="Tiph" greeting="Hey there" />
      <WelcomeMessage name="Class" greeting="Welcome" />

      <h2>Buttons</h2>
      {/* Values for properties can be any JS expression */}
      <SpeakButton message="Hello there!" rate={1} pitch={1} />
      <SpeakButton message="Let's talk finance!" />

      <h2>Chat</h2>
      <ChatMessage
        message="How are you today?"
        userName="Tiph22"
        date="23/06/2022"
      />
      <ChatMessage
        message="I think it's going well!"
        userName="Anandha22"
        date="24/06/2022"
      />
      <ChatMessage message="Great!" userName="Tiph22" date="26/06/2022" />
      <ChatMessage message="Yeah!" userName="Anandha22" date="27/06/2022" />
    </main>
  );
}

export default DemosPage;
