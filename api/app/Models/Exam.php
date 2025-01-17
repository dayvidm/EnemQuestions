<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = ['title', 'year'];

    public function disciplines()
    {
        return $this->hasMany(Discipline::class);
    }

    public function languages()
    {
        return $this->hasMany(Language::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}

