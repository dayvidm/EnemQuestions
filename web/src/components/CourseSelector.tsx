"use client";

import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import SelectComponent from './SelectComponent';

interface CourseSelectorProps {
  onChange: (selectedCourses: string[]) => void;
}

const CourseSelector = ({ onChange }: CourseSelectorProps) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses');
        const courseOptions = response.data.map((course) => ({
          value: course.id,
          label: course.name,
        }));
        setCourses(courseOptions);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSelectChange = (selectedValues: string[]) => {
    setSelectedCourses(selectedValues);
    onChange(selectedValues);
  };

  const selectedCourseNames = Array.isArray(selectedCourses) ? selectedCourses.map((id) => {
    const course = courses.find((course) => course.value === id);
    return course ? course.label : null;
  }).filter(Boolean) : [];

  return (
    <div>
      <SelectComponent
        label="Cursos"
        options={courses}
        placeholder="Selecione os cursos"
        multiple
        value={selectedCourses}
        onChange={handleSelectChange}
        limit={4}
      />
      <div>
        Selecionados: {selectedCourseNames.join(', ')}
      </div>
    </div>
  );
};

export default CourseSelector;
