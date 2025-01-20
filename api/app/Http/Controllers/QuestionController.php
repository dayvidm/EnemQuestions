<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function fetchRandom(Request $request)
    {
        $limit = $request->query('limit', 1);
        return Question::with('alternatives')
            ->with('questionFile')
            ->inRandomOrder()
            ->limit($limit)
            ->get();
    }
}
