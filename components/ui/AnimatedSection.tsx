
import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Полная очистка IntersectionObserver для предотвращения утечки памяти
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${className} ${
        isVisible ? 'fade-in-up' : 'opacity-0'
      }`}
      // Отключаем интерактивность для невидимых элементов:
      // - aria-hidden: скрывает от screen readers
      // - inert: блокирует клики и фокус (HTML5)
      // - pointer-events: none и user-select: none применены через .opacity-0 в CSS
      aria-hidden={!isVisible}
      {...(!isVisible && { inert: '' as any })}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
