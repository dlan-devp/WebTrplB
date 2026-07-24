import React from 'react';

interface GridGradientBackgroundProps {
  children?: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  gradientColor?: string;
}

export const GridGradientBackground: React.FC<GridGradientBackgroundProps> = ({
  children,
  gridSize = 40,
  gridColor = "var(--color-purple)",
  gradientColor = "var(--color-purple-dim)",
}) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full overflow-hidden flex flex-col justify-center items-center">
      
      {/* 1. Lapisan Grid Base */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* 2. Efek Vignette (Makin gelap ke arah pinggiran layar) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          background: "radial-gradient(circle, transparent 30%, var(--color-bg) 70%)",
        }}
      />

      {/* 3. Lapisan Glow Tengah (Sorotan Lampu) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none select-none opacity-60"
        style={{
          background: `radial-gradient(circle 500px at center, ${gradientColor}, transparent 100%)`,
        }}
      />

      {/* 4. Lapisan Konten */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        {children}
      </div>
    </div>
  );
};

export default GridGradientBackground;
