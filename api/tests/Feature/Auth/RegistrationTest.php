<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Course;
use App\Models\User;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        // Criar cursos de teste
        $course1 = Course::create(['name' => 'Course 1']);
        $course2 = Course::create(['name' => 'Course 2']);
        $course3 = Course::create(['name' => 'Course 3']);

        $response = $this->post('/register', [
            'name' => 'Dayvid',
            'email' => 'dayvid@hotmail.com.br',
            'password' => 'Senha123',
            'password_confirmation' => 'Senha123',
            'courses' => [
                $course1->id,
                $course2->id,
                $course3->id,
            ],
        ]);
        var_dump($response->content());
        $response->assertStatus(201);

        // Verificar se o usuário foi autenticado
        // $this->assertAuthenticated();

        // Verificar se os cursos foram associados ao usuário
        // $user = User::where('email', 'dayvid@teste.com.br')->first();
        // $this->assertCount(3, $user->courses);
        // $this->assertTrue($user->courses->contains($course1));
        // $this->assertTrue($user->courses->contains($course2));
        // $this->assertTrue($user->courses->contains($course3));
    }
}