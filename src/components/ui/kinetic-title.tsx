import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface KineticTitleProps {
  text: string;
  className?: string;
  subtitle?: string;
}

export function KineticTitle({ text, subtitle, className }: KineticTitleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Immediate visibility, no animation delay
    setIsVisible(true);
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <h1 
        className="text-6xl font-helvetica font-light text-gianni-text-primary tracking-tight"
      >
        {text}
      </h1>
      
      {subtitle && (
        <p className="text-lg text-gianni-text-secondary font-helvetica font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}