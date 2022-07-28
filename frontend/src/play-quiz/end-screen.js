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
    <div className="p-3 lg:w-1/1">
      <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
          Quiz complete!
        </h1>
        <motion.div
          className="end-screen__trophy"
          initial={{ rotate: 0, originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          🏆
        </motion.div>
        <EndStat label="Score" value={score} />
        <br></br>
        <br></br>
        <button
          className="mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-8 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          onClick={onRetryClick}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
