<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExamController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello from Laravel!']);
});

// Rota para listar provas do ENEM
Route::get('/exams', [ExamController::class, 'index']);

// Rota para recuperar uma prova específica do ENEM por ano
Route::get('/exams/{year}', [ExamController::class, 'show']);

// Rota para recuperar questões de uma prova específica do ENEM por ano
Route::get('/exams/{year}/questions', [ExamController::class, 'questions']);

// Rota para recuperar uma questão específica de uma prova do ENEM por ano e índice
Route::get('/exams/{year}/questions/{index}', [ExamController::class, 'question']);