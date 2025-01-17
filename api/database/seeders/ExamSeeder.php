<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\Discipline;
use App\Models\Language;
use App\Models\Question;
use App\Models\Alternative;

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

            // Aqui você adiciona a lógica para salvar as questões e alternativas
            foreach ($examData['questions'] as $questionData) {
                // Cria a questão associada ao exame
                $question = Question::create([
                    'title' => $questionData['title'],
                    'index' => $questionData['index'],
                    'discipline' => $questionData['discipline'],
                    'language' => $questionData['language'],
                    'context' => $questionData['context'],
                    'exam_id' => $exam->id,
                ]);

                // Salva as alternativas da questão
                foreach ($questionData['alternatives'] as $alternativeData) {
                    Alternative::create([
                        'letter' => $alternativeData['letter'],
                        'text' => $alternativeData['text'],
                        'isCorrect' => $alternativeData['isCorrect'],
                        'question_id' => $question->id,
                    ]);
                }
            }
        }
    }
}
