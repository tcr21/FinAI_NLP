import { motion } from "framer-motion";

function FramerMotionDemos() {
  return (
    <div>
      <motion.div animate={{ x: 100, y: 10 }}>Moving XY</motion.div>
    </div>
  );
}

export default FramerMotionDemos;
