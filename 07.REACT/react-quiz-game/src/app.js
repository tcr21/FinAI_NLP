import ConfettiDemo from "./demos/dependencies/confetti-demo";
import MusicalButton from "./demos/dependencies/musical-button";
import ChatMessage from "./demos/props/chat-message";
import SpeakButton from "./demos/props/speak-button";
import WelcomeMessage from "./demos/props/welcome-message";
import ClickButton from "./demos/state/click-button";
import SpeakForm from "./demos/state/speak-form";

// TR: Replaced Switch by Routes based on online update
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./home/home-page";
import QuizPage from "./quiz/quiz-page";
import DemosPage from "./demos/demos-page";
import AboutPage from "./about/about-page";
import PageHeader from "./common/page-header";
import PageFooter from "./common/page-footer";

// TR: Had to create these because Routes (unlike Switch) doesn't accept any html elements like h1, so have to wrap in custom element

function Quiz() {
  return (
    <div>
      <h1>Quiz</h1>
      <p>This is the quiz page</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <h1>Demo</h1>
      <p>This is the demo page</p>
    </div>
  );
}

// Main app function
function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      {/* Switch (TR: replaced by Routes) enforces that only ONE route can be matched */}
      <Routes>
        {/* Route allows you to conditionally render children based on router's path
        Note: order matters. If 2 lines have same path, will only show first line
        TR: had to do element notation as opposed to usual within Route because HomePage not route component*/}
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/quiz" exact element={<QuizPage />}></Route>
        <Route path="/about" exact element={<AboutPage />}></Route>
        <Route path="/demos" exact element={<DemosPage />}></Route>
      </Routes>
      <PageFooter />
    </BrowserRouter>
  );
}

// Up to lesson 10 included
// App component: class components vs function ones. Using functional ones here
// Components must be PascalCase
// A functional component is just a JS function that returns JSX (markup)
// function App() {
//   return (

//   );
// }

export default App;
