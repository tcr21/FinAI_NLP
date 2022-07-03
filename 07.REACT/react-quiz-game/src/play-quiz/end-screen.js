import { motion } from "framer-motion";
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
      <motion.div
        className="end-screen__trophy"
        initial={{ rotate: 0, originX: 0.5, originY: 0.5 }}
        animate={{ rotate: 360 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      >
        🏆
      </motion.div>
      <EndStat label="Score" value={score} />
      <EndStat label="Best score" value={bestScore} />
      <button className="end-screen__button" onClick={onRetryClick}>
        Try again
      </button>
    </div>
  );
}

export default EndScreen;
