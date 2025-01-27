"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../utils/axios';
import { Box, Button, Input, Text, Link } from '@chakra-ui/react';
import InputError from '@/components/InputError';
import CourseSelector from '@/components/CourseSelector';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [errors, setErrors] = useState({});

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        courses: selectedCourses,
      });
      router.push('/login');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error registering:', error);
      }
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleRegister}>
        <Box mb={4}>
          <Text>Name</Text>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputError messages={errors.name} className="mt-2" />
        </Box>
        <Box mb={4}>
          <Text>Email</Text>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputError messages={errors.email} className="mt-2" />
        </Box>
        <Box mb={4}>
          <Text>Password</Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputError messages={errors.password} className="mt-2" />
        </Box>
        <Box mb={4}>
          <Text>Confirm Password</Text>
          <Input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <InputError messages={errors.password_confirmation} className="mt-2" />
        </Box>
        <CourseSelector onChange={setSelectedCourses} />
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
          <Link href="/login" color="teal.500">
            Already registered?
          </Link>
          <Button type="submit" colorScheme="teal" ml={4}>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;