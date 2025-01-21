import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
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
    alternativesIntroduction: string;
  };
  selectedOption: string;
  question_file: {
    id: number;
    file: string;
    question_id: number;
    created_at: string;
    updated_at: string;
  } | null;
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
      p={6}
      width="90%" // Ajustar a largura para 90% da tela
      maxW="800px" // Definir um máximo de largura
      mx="auto"
      mt={8}
      boxShadow="md"
    >
      <Text fontSize="md" mb={4} textAlign="center">
        {question.context}
      </Text>
      {question.question_file && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Image
            src={question.question_file.file}
            alt="Question Image"
            borderRadius="md"
            maxWidth="100%"
            maxHeight="400px"
            objectFit="contain"
          />
        </Box>
      )}
      <Text fontSize="lg" mb={4} textAlign="center">
        {question.alternativesIntroduction}
      </Text>
      <RadioGroup
        value={selectedOption}
        onChange={(e) => onAnswerChange((e.target as HTMLInputElement).value)} // Ajuste aqui
      >
        <Stack direction="column">
          {question.alternatives.map(({ letter, text, id, file }) => (
            <Radio key={id} value={letter}>
              <Box>
                {text && <Text mb={2}>{text}</Text>}
                {file && (
                  <Image
                    src={file}
                    alt={`Alternative ${letter}`}
                    borderRadius="md"
                    maxWidth="100%"
                    maxHeight="200px"
                    objectFit="contain"
                  />
                )}
              </Box>
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
