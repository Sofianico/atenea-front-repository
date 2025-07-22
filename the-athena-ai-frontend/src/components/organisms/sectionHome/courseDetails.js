import { useEffect, useState } from "react";

const courseDetails = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token"); // Asegurate de tener el token guardado
        const response = await fetch(`http://localhost:3000/api/details/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener el curso");

        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {/* Agregá más campos según tu backend */}
    </div>
  );
};

export default CourseDetails;
