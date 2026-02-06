import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { cn } from "@/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({
  children,
  className,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      <Card className={cn("overflow-hidden", className)}>{children}</Card>
    </motion.div>
  );
}
