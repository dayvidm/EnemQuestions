<?php

use App\Http\Controllers\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;


Route::get('/courses', [CourseController::class, 'index']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::group(['prefix' => 'questions'], function () {
        Route::get('/random', [QuestionController::class, 'fetchRandom']);
    });
});

Route::get('/fetch-exams', [ExamController::class, 'fetchAndStoreExams']);
