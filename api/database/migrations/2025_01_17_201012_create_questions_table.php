<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('index');
            $table->string('discipline');
            $table->string('language')->nullable();
            $table->text('context')->nullable(); //é o enunciado da questão
            $table->text('alternativesIntroduction')->nullable(); //é a introdução das alternativas
            $table->foreignId('exam_id')->constrained('exams'); // Relacionamento com a tabela exams
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
