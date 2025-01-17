<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_languages_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesTable extends Migration
{
    public function up()
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('value');
            $table->foreignId('exam_id')->constrained('exams'); // Relacionamento com a tabela exams
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('languages');
    }
}
