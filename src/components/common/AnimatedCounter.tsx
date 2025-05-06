"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "motion/react";
import { cn } from "@/lib/utils";

export default function AnimatedCounter({
  value,
  className,
  speed = 0.8,
}: {
  value: number;
  className?: string;
  speed?: number;
}) {
  if (value === 0) {
    return <div className={cn(className)}>???</div>;
  }
  return (
    <div className={cn(className)}>
      <Counter from={0} to={Number(value)} duration={speed} />
    </div>
  );
}

const Counter = ({
  from,
  to,
  duration,
}: {
  from: number;
  to: number;
  duration: number;
}) => {
  const nodeRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer to detect when the element is in the viewport
  useEffect(() => {
    const currentNode = nodeRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentNode) observer.observe(currentNode);

    return () => {
      if (currentNode) observer.unobserve(currentNode);
    };
  }, []);

  // Animate the counter when in view
  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate: (value) => {
          if (nodeRef.current) {
            (nodeRef.current as HTMLElement).textContent =
              Math.round(value).toString();
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <motion.p
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    />
  );
};