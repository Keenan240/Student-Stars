'use client';
import React from 'react';

const logos = [
  '/schools/waterloo.png',
  '/schools/queens.png',
  '/schools/uoft.png',
  '/schools/mcmaster.png',
  '/schools/laurier.png',
  '/schools/uottawa.png',
  '/schools/guelph.png',
  '/schools/carleton.png',
  '/schools/ubc.png',
];

export default function LogoSlider() {
  return (
    <div style={{ overflow: 'hidden', padding: '40px 0', opacity: 0.7 }}>
      <div
        style={{
          display: 'flex',
          animation: 'scroll-left 40s linear infinite',
          width: 'max-content',
        }}
      >
        {logos.concat(logos).map((src, index) => (
          <img
            key={index}
            src={src}
            alt="University logo"
            style={{
              height: '200px',
              marginRight: '60px',
              objectFit: 'contain',
            }}
          />
        ))}
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
