import "./about-page.css";
import animationImage from "../images/SRProtest.png";

function AboutPage() {
  return (
    <main>
      <h1>About</h1>

      <h2>Sri Lanka</h2>
      <p>
        We're learning about financial literacy <em>together</em>!
      </p>

      <p>Some things we are learning about are</p>

      <ul className="emoji-list">
        <li>Interest rates</li>
        <li>Formal finance</li>
        <li>Budgeting & saving</li>
      </ul>
      <p>The language I will be using is</p>
      <ul className="emoji-list">
        <li>English</li>
      </ul>
      <p>
        User list:
        <ul>
          <li>Women</li>
          <li>Rural inhabitants</li>
          <li>Ages 16-60</li>
        </ul>
      </p>

      <p>
        An app I use daily is{" "}
        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noreferrer"
          title="Software recommendation"
        >
          Whatsapp
        </a>
      </p>

      <img
        src={animationImage}
        alt="Women's protest in Sri Lanka"
        width="600"
      />
    </main>
  );
}

export default AboutPage;
