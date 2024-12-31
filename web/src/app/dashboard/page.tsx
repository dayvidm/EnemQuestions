"use client";

import { Radio, RadioGroup } from "@/components/ui/radio";
import { HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/auth';

const Dashboard = () => {
  const [value, setValue] = useState("1");
  const { user } = useAuth({ middleware: 'auth' });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <RadioGroup value={value} onValueChange={(e) => setValue(e.value)}>
      <HStack gap="6">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>        
      </HStack>
    </RadioGroup>
  );
};

export default Dashboard;