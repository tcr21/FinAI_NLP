import "./stats.css";

function Stat({ label, value }) {
  return (
    <div className="xl:w-1/2 md:w-1/2 p-3">
      <div className="border border-indigo-500 p-1 rounded-lg bg-gray-100">
        <p className="text-indigo-500 text-s mb-0">{label}</p>
        <p className="text-indigo-500 text-s mb-0">{value}</p>
      </div>
    </div>

    // <li className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
    //   <div className="stats__stat-label">{label}:</div>
    //   <div className="stats__stat-value">{value}</div>
    // </li>
  );
}

/**
 * Stats renders score and current question number
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.questionNumber
 * @param {number} props.totalQuestions
 */

function Stats({ score, questionNumber, totalQuestions }) {
  return (
    <section className="text-gray-600 body-font center p-3">
      <div className="container px-5 py-0 mx-auto text-center">
        <div className="flex flex-wrap -m-4">
          <Stat label="SCORE" value={score} />
          <Stat
            label="QUESTION"
            value={`${questionNumber} / ${totalQuestions}`}
          />
        </div>
      </div>
    </section>
  );
}

export default Stats;
