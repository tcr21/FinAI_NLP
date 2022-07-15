import { motion } from "framer-motion";

function FramerMotionDemos() {
  return (
    <div>
      {/* Moves from initial css settings to the animate property settings */}
      <motion.div animate={{ x: 100, y: 10 }}>Moving XY</motion.div>
      {/* Control transition properties of animation via "transition" */}
      <motion.div
        animate={{ scale: 0.5 }}
        transition={{ duration: 1, repeat: 2, repeatType: "reverse" }}
      >
        Scaling
      </motion.div>

      {/* We can control the starting state using initial */}
      <motion.div
        initial={{ rotate: 180, originX: 0, originY: 0 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      >
        Rotating
      </motion.div>

      {/* We can animate any HTML element */}
      <div>
        This is{" "}
        <motion.span
          initial={{ color: "rgb(0, 0, 255)" }}
          animate={{ color: "rgb(0, 255, 0)" }}
          transition={{ repeat: Infinity, repeatType: "reverse" }}
        >
          FANCY
        </motion.span>
      </div>
    </div>
  );
}

export default FramerMotionDemos;
