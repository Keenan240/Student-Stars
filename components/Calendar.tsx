import React, { useMemo } from 'react';

const events = [
  { title: "Ontario University Fair Day 1", date: "2025-10-17", color: "#C51C41" },
  { title: "Ontario University Fair Day 2", date: "2025-10-18", color: "#C51C41" },
  { title: "OUAC Application Deadline", date: "2025-01-18", color: "#C51C41" },


  { title: "Queen's Student Experience Tour", date: "2025-03-21", color: "#2563eb" },
  { title: "OUAC Acceptance Deadline", date: "2025-06-10", color: "#C51C41" },
];

const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

function getDaysInMonth(month: string) {
  const monthNum = new Date(`1 ${month} 2025`).getMonth();
  return new Date(2025, monthNum + 1, 0).getDate();
}

export default function Calendar() {
  // Precompute a lookup map for quick access
  const eventMap = useMemo(() => {
    const map: Record<string, string> = {};
    events.forEach((ev) => {
      map[ev.date] = ev.color;
    });
    return map;
  }, []);

  return (
    <div style={{ display: 'flex', gap: '40px', marginTop: '275px', paddingLeft: '500px', marginBottom: '200px' }}>
      {/* LEFT SIDE: Title + Calendar */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            color: '#000',
            lineHeight: 1.1,
            marginBottom: '24px'
          }}
        >
          UPCOMING<br />EVENTS/DATES
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            border: '1px solid #E6E6E6',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          {months.map((month) => {
            const days = getDaysInMonth(month);
            return (
              <div key={month}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{month}</div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '4px'
                  }}
                >
                  {Array.from({ length: days }, (_, day) => {
                    const dayNum = day + 1;
                    const dateObj = new Date(`2025 ${month} ${dayNum}`);
                    const dateStr = dateObj.toISOString().split('T')[0]; // 'YYYY-MM-DD'
                    const color = eventMap[dateStr];

                    return (
                      <div
                        key={day}
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '1px solid #E6E6E6',
                          borderRadius: '5px',
                          backgroundColor: color || 'white',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: Event List */}
      <div
        style={{
          minWidth: '300px',
          border: '1px solid #e5e5e5',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <h3 style={{ marginBottom: '16px' }}>Upcoming Events</h3>
        {events.map((ev) => (
          <div
            key={ev.title}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px'
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: ev.color,
                marginRight: '8px',
              }}
            />
            <span>{ev.title} – {ev.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
