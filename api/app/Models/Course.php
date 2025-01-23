<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'category',
    ];

    /**
     * Get the users interested in this course.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_courses');
    }
}
