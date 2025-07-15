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
    setIsVisible(true);
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <h1 
        className={cn(
          "text-display font-helvetica font-light text-gianni-text-primary tracking-tight opacity-0",
          isVisible && "animate-title-reveal"
        )}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block animate-char-reveal opacity-0"
            style={{ 
              animationDelay: `${0.8 + index * 0.05}s`,
              animationFillMode: 'forwards'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      
      {subtitle && (
        <p 
          className={cn(
            "text-lg text-gianni-text-secondary font-helvetica font-light opacity-0",
            isVisible && "animate-fade-in-delay-2"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}