import { motion, AnimatePresence } from "framer-motion";

/**
 * Wraps around FadeTransition. If want to enter and exit transitions, put FadeTransition into FadeWrapper
 * @param {object} props
 * @param {React.ReactNode} props.children
 */

function FadeWrapper({ children }) {
  return <AnimatePresence exitBeforeEnter={true}>{children}</AnimatePresence>;
}

/**
 * Wraps children in animated div fading in and out. Wrap this in FadeWrapper component and assign FadeTransition unique key
 * @param {object} props
 * @param {React.ReactNode} props.children
 */

function FadeTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 75, transition: { ease: "easeOut" } }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -75, transition: { ease: "easeIn" } }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export { FadeWrapper, FadeTransition };
