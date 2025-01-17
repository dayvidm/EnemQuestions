<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Discipline;
use App\Models\Language;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function fetchAndStoreExams()
    {
        // Fazer a requisição à API
        $response = file_get_contents("https://api.enem.dev/v1/exams");
        $data = json_decode($response, true);

        // Iniciar transação
        \DB::beginTransaction();

        try {
            foreach ($data as $examData) {
                // Armazenar o exame
                $exam = Exam::create([
                    'title' => $examData['title'],
                    'year' => $examData['year'],
                ]);

                // Armazenar as disciplinas
                foreach ($examData['disciplines'] as $disciplineData) {
                    Discipline::create([
                        'exam_id' => $exam->id,
                        'label' => $disciplineData['label'],
                        'value' => $disciplineData['value'],
                    ]);
                }

                // Armazenar os idiomas
                foreach ($examData['languages'] as $languageData) {
                    Language::create([
                        'exam_id' => $exam->id,
                        'label' => $languageData['label'],
                        'value' => $languageData['value'],
                    ]);
                }
            }

            // Commitar transação
            \DB::commit();

            return response()->json(['message' => 'Exams and data stored successfully'], 200);
        } catch (\Exception $e) {
            // Rollback em caso de erro
            \DB::rollBack();
            return response()->json(['message' => 'Failed to store data', 'error' => $e->getMessage()], 500);
        }
    }
}
