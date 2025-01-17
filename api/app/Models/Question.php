<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['title', 'index', 'discipline', 'language', 'context', 'exam_id'];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function alternatives()
    {
        return $this->hasMany(Alternative::class);
    }
}

