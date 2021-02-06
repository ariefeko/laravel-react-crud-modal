<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('tasks', [TaskController::class,'index'])->name('task.list');
Route::get('tasks/{id}', [TaskController::class,'show'])->name('task.show');
Route::post('tasks', [TaskController::class,'store'])->name('task.store');
Route::put('tasks/{id}', [TaskController::class,'update'])->name('task.update');
Route::delete('tasks/{id}', [TaskController::class,'delete'])->name('task.delete');