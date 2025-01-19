<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionFile extends Model
{
    protected $fillable = ['file', 'question_id'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}

