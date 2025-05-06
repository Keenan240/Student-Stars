import React from 'react';

interface Program {
  name: string;
  school: string;
  tuition: string;
  prerequisites: string;
  cutoff: string;
  range: string;
  description: string;
  coop: string;
  suppApp: string;
  logoUrl?: string;
}

interface ProgramCardProps {
  program: Program;
  onSelect?: () => void;
  isSelected?: boolean;
}

export default function ProgramCard({ program, onSelect, isSelected }: ProgramCardProps) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        width: '320px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        position: 'relative',
      }}
    >
      {/* School Logo */}
      {program.logoUrl ? (
        <img
          src={program.logoUrl}
          alt={`${program.school} logo`}
          style={{
            width: '86px',
            height: '86px',
            borderRadius: '8px',
            objectFit: 'cover',
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        />
      ) : (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            backgroundColor: '#e5e5e5',
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        />
      )}

      {/* Card Content */}
      <div style={{ paddingTop: '60px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '50px' }}>{program.name}</h2>
        <p style={{ margin: '4px 0', color: '#666' }}>{program.school}</p>
        <p><strong>Tuition:</strong> {program.tuition}</p>
        <p><strong>Prereqs:</strong> {program.prerequisites}</p>
        <p><strong>Cutoff:</strong> {program.cutoff}</p>
        <p><strong>Range:</strong> {program.range}</p>
        <p><strong>Co-Op:</strong> {program.coop}</p>
        <p><strong>Supplementary App:</strong> {program.suppApp}</p>
        <p style={{ marginTop: '8px', marginBottom:'40px' }}>{program.description}</p>
      </div>

      {/* Compare Button */}
      {onSelect && (
        <button
          onClick={onSelect}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            backgroundColor: isSelected ? '#C51C41' : '#f4f4f5',
            color: isSelected ? 'white' : '#333',
            border: 'none',
            borderRadius: '16px',
            padding: '6px 12px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {isSelected ? '✓ Added' : 'Compare'}
        </button>
      )}
    </div>
  );
}
