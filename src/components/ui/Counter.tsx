import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Counter Component
export const Counter = ({ title, end }: { title: string; end: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
 
  return (
   <div ref={ref} className="text-center">
      <h3 className="text-4xl sm:text-5xl font-bold text-indigo-400">
        {inView ? <CountUp end={end} duration={2} /> : 0}+
      </h3>
      <p className="text-white/80 mt-2">{title}</p>
    </div>
  );
};

// Helper function for experience
export function calculateExperience() {
  const startYear = 2020; // replace with your first experience year
  const currentYear = new Date().getFullYear();
  return currentYear - startYear + 1; // +1 to include partial year
}
