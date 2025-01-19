<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\Discipline;
use App\Models\Language;
use App\Models\Question;
use App\Models\Alternative;
use App\Models\QuestionFile;

class ExamSeeder extends Seeder
{
    public function run()
    {
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.enem.dev/v1/exams",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
        ]);

        $response = curl_exec($curl);
        curl_close($curl);

        $data = json_decode($response, true);

        foreach ($data as $examData) {
            // Cria o exame
            $exam = Exam::create([
                'title' => $examData['title'],
                'year' => $examData['year'],
            ]);

            // Salva as disciplinas
            foreach ($examData['disciplines'] as $discipline) {
                Discipline::create([
                    'label' => $discipline['label'],
                    'value' => $discipline['value'],
                    'exam_id' => $exam->id,
                ]);
            }

            // Salva os idiomas
            foreach ($examData['languages'] as $language) {
                Language::create([
                    'label' => $language['label'],
                    'value' => $language['value'],
                    'exam_id' => $exam->id,
                ]);
            }


            $year = $examData['year'];
            $offset = 0;
            do {
                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_URL => "https://api.enem.dev/v1/exams/{$year}/questions?limit=50&offset={$offset}",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "GET",
                ]);
                $response = curl_exec($curl);
                curl_close($curl);
                $questions = json_decode($response, true);
                $hasDone = $questions['metadata']['hasMore'];

                // Salva as questões
                foreach ($questions['questions'] as $questionData) {

                    $question = Question::create([
                        'title' => $questionData['title'],
                        'index' => $questionData['index'],
                        'discipline' => $questionData['discipline'],
                        'language' => $questionData['language'],
                        'context' => $questionData['context'],
                        'exam_id' => $exam->id,
                    ]);

                    if (count($questionData['files']) > 0) {
                        foreach ($questionData['files'] as $file) {
                            QuestionFile::create([
                                'file' => $file,
                                'question_id' => $question->id,
                            ]);
                        }
                    }

                    // Salva as alternativas da questão
                    foreach ($questionData['alternatives'] as $alternativeData) {
                        Alternative::create([
                            'letter' => $alternativeData['letter'],
                            'text' => $alternativeData['text'],
                            'isCorrect' => $alternativeData['isCorrect'],
                            'file' => $alternativeData['file'],
                            'question_id' => $question->id,
                        ]);
                    }
                }
                $offset += 50;
            } while ($hasDone == true);
        }
    }
}
