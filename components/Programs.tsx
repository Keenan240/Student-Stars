'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ProgramCard from './ProgramCard';

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

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Program[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    fetch('/programs_name.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsed = result.data as any[];
            const cleaned = parsed.map((row) => ({
              name: row['Program Name'],
              school: row['School'],
              tuition: row['Tuition'],
              prerequisites: row['Prerequisites'],
              cutoff: row['Predicted Grade Cutoff'],
              range: row['Admission Range'],
              description: row['Description'],
              coop: row['Co-Op status'],
              suppApp: row['Supp app requirement status'],
              logoUrl: row['Logo URL'],
            }));
            setPrograms(cleaned);
          },
        });
      });
  }, []);

  const handleSelect = (program: Program) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.name === program.name && p.school === program.school);
      if (exists) return prev.filter((p) => p !== exists);
      if (prev.length >= 3) return prev;
      return [...prev, program];
    });
  };

  const filtered = programs.filter((p) =>
    `${p.name} ${p.school}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', width: '100%', fontFamily: 'Inter, sans-serif', zIndex: 1, marginBottom: '160px' }}>
      <h1 style={{ fontSize: '94px', fontWeight: 600, textAlign: 'center', marginBottom: '40px' }}>
        EXPLORE UNIVERSITY PROGRAMS
      </h1>

      <div style={{
        position: 'absolute',
        top: 70,
        left: 0,
        width: '100%',
        height: '1666px',
        minHeight: '100%',
        backgroundColor: 'rgba(244, 244, 245, 0.6)',
        backdropFilter: 'blur(5px)',
        zIndex: 0,
      }} />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', position: 'relative', zIndex: 2 }}>
        <input
          type="text"
          placeholder="Search for programs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '737px',
            height: '56px',
            border: '1px solid #e5e5e5',
            borderRadius: '24px',
            padding: '0 24px',
            fontSize: '18px',
          }}
        />
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            justifyContent: 'center',
            padding: '0 40px',
          }}
        >
          {filtered.map((program, index) => (
            <ProgramCard
              key={index}
              program={program}
              onSelect={() => handleSelect(program)}
              isSelected={selected.includes(program)}
            />
          ))}
        </div>
      </div>

      {/* 🔽 Slide-up Compare Tray */}
      {selected.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: compareOpen ? 0 : '-600px',
            left: 0,
            width: '100%',
            transition: 'bottom 0.3s ease-in-out',
            zIndex: 100,
          }}
        >
          {/* Handle */}
          <div
            onClick={() => setCompareOpen(!compareOpen)}
            style={{
              height: '30px',
              padding: '20px',
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(5px)',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
            }}
          >
            {compareOpen ? '▼ Hide Comparison' : '▲ Compare Programs'}
          </div>

          {/* Tray Content */}
          <div
            style={{
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
              gap: '20px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
              minHeight: '575px',
              overflowX: 'auto',
            }}
          >
            {selected.map((program, idx) => (
              <ProgramCard
                key={idx}
                program={program}
                onSelect={() => handleSelect(program)}
                isSelected
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
