import { motion } from "framer-motion";

export default function Slide({
    children,
    direction="up",
    style,
    className,
    transition = {}
}) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ y: 50 * (direction == "up" ? 1 : -1), opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1,
                ...transition
            }}
        >
            {children}
        </motion.div>
    );
}