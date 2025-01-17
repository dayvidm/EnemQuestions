<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExamController;

// Route::get('/test', function () {
//     return response()->json(['message' => 'API is working']);
// });


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Test route
Route::get('/test', function () {
    $questions = [
        [
            'textoPergunta' => 'Quanto é 1 + 1?',
            'opcoesPergunta' => ['2', '3', '4', '5'],
            'respostaCorreta' => '2',
        ],
        [
            'textoPergunta' => 'Quanto é 1 + 3?',
            'opcoesPergunta' => ['15', '20', '4', '55'],
            'respostaCorreta' => '4',
        ],
    ];

    return response()->json(['questions' => $questions]);
});


Route::get('/fetch-exams', [ExamController::class, 'fetchAndStoreExams']);
