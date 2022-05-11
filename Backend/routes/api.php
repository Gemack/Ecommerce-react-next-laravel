<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HotController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\webController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::post('/user/{id}', [AuthController::class, 'update']);
    Route::resource('product', ProductController::class);
    Route::post('product/{id}', [ProductController::class, 'update']);
    Route::post('/register',[AuthController::class, 'register']);
    Route::resource('hot', HotController::class);
    Route::post('hot/{id}', [HotController::class, 'update']);
    Route::post('/logout',[AuthController::class, 'logout']);
});


Route::post('/login',[AuthController::class, 'login']);

Route::get('webhot',[webController::class,'getAllHot']);
Route::get('latest',[webController::class,'getlatestProduct']);