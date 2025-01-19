import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from './ui/radio';

// create a type alternative usig

type Alternative = {
  id: number;
  letter: string;
  text: string;
  file: string | null;
  isCorrect: boolean;
  question_id: number;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
};


interface QuestionProps {
  question: {
    context: string;
    aternatives: Alternative[];
  };
  selectedOption: string;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionComponent = ({
  question,
  selectedOption,
  onAnswerChange,
  onNext,
  onPrevious,
}: QuestionProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      maxW="md"
      mx="auto"
      mt={8}
    >
      <Text fontSize="xl" mb={4} textAlign="center">
        {question.context}
      </Text>
      <RadioGroup
        value={selectedOption}
        onChange={(e) => onAnswerChange((e.target as HTMLInputElement).value)} // Ajuste aqui
      >
        <Stack direction="column">
          {question.alternatives.map(({letter, text, id}) => (
            <Radio key={id} value={letter}>
              {text}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={onPrevious} disabled={onPrevious == null}>
          Anterior
        </Button>
        <Button onClick={onNext} disabled={!selectedOption}>
          Próxima
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionComponent;
