"use client";
import { useState } from "react";

interface GradeEntry {
  id: number;
  course: string;
  grade: string;
  locked: boolean;
}

export default function Top6CalcDropdown() {
  const [grade11, setGrade11] = useState<GradeEntry[]>([
    { id: 1, course: "", grade: "", locked: false },
  ]);
  const [grade12, setGrade12] = useState<GradeEntry[]>([
    { id: 1, course: "", grade: "", locked: false },
  ]);
  const [average, setAverage] = useState<number | null>(null);

  const calculateAverage = () => {
    const all = [...grade11, ...grade12].filter(
      (entry) => entry.course || entry.grade
    );

    const valid = all
      .map((entry) => ({
        ...entry,
        gradeNum: parseFloat(entry.grade),
      }))
      .filter((entry) => !isNaN(entry.gradeNum));

    const locked = valid.filter((entry) => entry.locked);
    const mustInclude = valid.filter(
      (entry) => entry.course[3] === "4" && !entry.locked
    );

    const rest = valid.filter(
      (entry) => !locked.includes(entry) && !mustInclude.includes(entry)
    );

    const combined = [...locked, ...mustInclude];

    // Fill up to 6 from rest by highest grades
    const remaining = rest
      .sort((a, b) => b.gradeNum - a.gradeNum)
      .slice(0, 6 - combined.length);

    const top6 = [...combined, ...remaining].slice(0, 6);

    if (top6.length === 0) {
      setAverage(null);
    } else {
      const avg =
        top6.reduce((acc, val) => acc + val.gradeNum, 0) / top6.length;
      setAverage(parseFloat(avg.toFixed(2)));
    }
  };

  const addRow = (setList: any, list: GradeEntry[]) => {
    const updated = [
      ...list,
      { id: Date.now(), course: "", grade: "", locked: false },
    ];
    setList(updated);
    setTimeout(() => calculateAverage(), 0);
  };

  const removeRow = (id: number, setList: any, list: GradeEntry[]) => {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
    setTimeout(() => calculateAverage(), 0);
  };

  const updateRow = (
    id: number,
    field: "course" | "grade",
    value: string,
    setList: any,
    list: GradeEntry[]
  ) => {
    const updated = list.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    setList(updated);
    setTimeout(() => calculateAverage(), 0);
  };

  const toggleLock = (id: number, setList: any, list: GradeEntry[]) => {
    const updated = list.map((entry) =>
      entry.id === id ? { ...entry, locked: !entry.locked } : entry
    );
    setList(updated);
    setTimeout(() => calculateAverage(), 0);
  };

  const inputStyle = {
    flex: 2,
    marginRight: "6px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    padding: "8px",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        right: "40px",
        width: "350px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <button
          style={{
            backgroundColor: "#C51C41",
            color: "white",
            padding: "5px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Round 1
        </button>
        <button
          style={{
            marginLeft: "10px",
            padding: "5px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Round 2
        </button>
        <button
          style={{
            marginLeft: "10px",
            padding: "5px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Round 3
        </button>
      </div>

      {average !== null && (
        <div
          style={{
            fontWeight: 700,
            fontSize: "48px",
            textAlign: "center",
            color: "#C51C41",
          }}
        >
          {average}%
        </div>
      )}

      <h4 style={{ fontWeight: 500, marginTop: 50 }}>Grade 11 Final Marks</h4>
      {grade11.map((entry) => (
        <div
          key={entry.id}
          style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}
        >
          <input
            value={entry.course}
            onChange={(e) =>
              updateRow(entry.id, "course", e.target.value, setGrade11, grade11)
            }
            placeholder="Course"
            style={inputStyle}
          />
          <input
            value={entry.grade}
            onChange={(e) =>
              updateRow(entry.id, "grade", e.target.value, setGrade11, grade11)
            }
            placeholder="%"
            style={{
              width: "60px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              padding: "8px",
            }}
          />
          <button
            onClick={() => toggleLock(entry.id, setGrade11, grade11)}
            style={{ marginLeft: "6px", border: "none", background: "none", cursor: "pointer" }}
          >
            {entry.locked ? "🔒" : "🔓"}
          </button>
          <button
            onClick={() => removeRow(entry.id, setGrade11, grade11)}
            style={{ marginLeft: "4px", border: "none", background: "none", cursor: "pointer"}}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => addRow(setGrade11, grade11)}
        style={{
          marginBottom: "16px",
          padding: "5px 20px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",

        }}
      >
        + Add Course
      </button>

      <h4 style={{ fontWeight: 500 }}>Grade 12 Sem 1 Midterm</h4>
      {grade12.map((entry) => (
        <div
          key={entry.id}
          style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}
        >
          <input
            value={entry.course}
            onChange={(e) =>
              updateRow(entry.id, "course", e.target.value, setGrade12, grade12)
            }
            placeholder="Course"
            style={inputStyle}
          />
          <input
            value={entry.grade}
            onChange={(e) =>
              updateRow(entry.id, "grade", e.target.value, setGrade12, grade12)
            }
            placeholder="%"
            style={{
              width: "60px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              padding: "8px",
            }}
          />
          <button
            onClick={() => toggleLock(entry.id, setGrade12, grade12)}
            style={{ marginLeft: "6px", border: "none", background: "none", cursor: "pointer"}}
          >
            {entry.locked ? "🔒" : "🔓"}
          </button>
          <button
            onClick={() => removeRow(entry.id, setGrade12, grade12)}
            style={{ marginLeft: "4px", border: "none", background: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => addRow(setGrade12, grade12)}
        style={{
          marginBottom: "16px",
          padding: "5px 20px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",

        }}
      >
        + Add Course
      </button>

      <p style={{ color: "grey" }}>beta v1.0</p>
    </div>
  );
}
