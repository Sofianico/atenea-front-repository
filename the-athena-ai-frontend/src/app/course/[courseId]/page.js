'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetch(`http://localhost:3001/api/courses/${courseId}`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => {
          console.error('Error al obtener curso:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  if (loading) return <p>Cargando...</p>;
  if (!course) return <p>No se encontró el curso</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <h2>Lecciones:</h2>
      <ul>
        {(course.lessons || []).map((lesson, idx) => (
          <li key={idx}>{lesson}</li>
        ))}
      </ul>
    </div>
  );
}
