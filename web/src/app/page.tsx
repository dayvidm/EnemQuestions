import { Box, Heading, Link } from '@chakra-ui/react';
import styles from "./page.module.css";

export default function Home() {
  return (
    <Box className={styles.page} p={5}>
      <Heading>Home Page</Heading>
      <Link href="/auth/login" color="teal.500">Go to Login</Link>
    </Box>
  );
}
