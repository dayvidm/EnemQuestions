// components/CourseSelector.tsx

import { useEffect, useState } from 'react';
import { Box, Text, Tag, TagLabel, TagCloseButton, TagRoot } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import { SelectRoot, SelectLabel, SelectTrigger, SelectValueText, SelectContent, SelectItem } from "@/components/ui/select";

const CourseSelector = ({ selectedCourses, setSelectedCourses }: any) => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        // Fetching the courses from the backend
        fetch('/api/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCourses(selectedOptions);
    };

    const removeCourse = (courseId: string) => {
        setSelectedCourses(selectedCourses.filter((id: string) => id !== courseId));
    };

    return (
        <Box mb={4}>
            <Text mb={2}>Select Courses</Text>
            <SelectRoot
                multiple
                value={selectedCourses}
                onChange={handleCourseChange}
            >
                <SelectLabel>Courses</SelectLabel>
                <SelectTrigger>
                    <SelectValueText placeholder="Select courses" />
                </SelectTrigger>
                <SelectContent>
                    {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                            {course.name} - {course.category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            <Box mt={4}>
                <Text mb={2}>Selected Courses:</Text>
                {selectedCourses.length > 0 ? (
                    <Box>
                        {selectedCourses.map((courseId: string) => {
                            const course = courses.find(c => c.id === courseId);
                            return (
                                <TagRoot key={courseId} asChild variant="solid">
                                    <button type="button">
                                        <Tag size="md" colorScheme="teal" mr={2} mb={2}>
                                            <TagLabel>{course?.name}</TagLabel>
                                            <LuCheck />
                                        </Tag>
                                        <TagCloseButton onClick={() => removeCourse(courseId)} />
                                    </button>
                                </TagRoot>
                            );
                        })}
                    </Box>
                ) : (
                    <Text>No courses selected</Text>
                )}
            </Box>
        </Box>
    );
};

export default CourseSelector;
