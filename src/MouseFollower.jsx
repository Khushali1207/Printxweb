import React, { useEffect, useState } from 'react';

export default function MouseFollower() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        
        a, button, input, select, textarea, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '14px',
          height: '14px',
          backgroundColor: '#371E30', /* Deep Plum */
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${position.x - 7}px, ${position.y - 7}px, 0)`,
          willChange: 'transform'
        }}
      />
    </>
  );
}
