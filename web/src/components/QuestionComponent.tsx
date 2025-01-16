import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from './ui/radio';

interface QuestionProps {
  question: {
    textoPergunta: string;
    opcoesPergunta: string[];
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
        {question.textoPergunta}
      </Text>
      <RadioGroup
        value={selectedOption}
        onChange={(e) => onAnswerChange((e.target as HTMLInputElement).value)} // Ajuste aqui
      >
        <Stack direction="column">
          {question.opcoesPergunta.map((opcao, index) => (
            <Radio key={index} value={opcao}>
              {opcao}
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
