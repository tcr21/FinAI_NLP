import "./end-screen.css";

function EndStat({ label, value }) {
  return (
    <div className="end-screen__stat">
      <div className="end-screen__stat-label">{label}</div>
      <div className="end-screen__stat-value">{value}</div>
    </div>
  );
}

/**
 * EndScreen renders final game stats
 *
 */

function EndScreen({ score, bestScore, onRetryClick }) {
  return (
    <div className="end-screen">
      <h1>Quiz complete!</h1>
      <div className="end-screen__trophy">🏆</div>
      <EndStat label="Score" value={score} />
      <EndStat label="Best score" value={bestScore} />
      <button className="end-screen__button" onClick={onRetryClick}>
        Try again
      </button>
    </div>
  );
}

export default EndScreen;
