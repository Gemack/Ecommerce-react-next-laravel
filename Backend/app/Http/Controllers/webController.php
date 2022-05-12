<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Hot;

class webController extends Controller
{
  public function getAllHot()
  {
    $product = Hot::all();
    return $product;
  }

  public function getlatestProduct(){
    $product= Product::all()->take(9);
    return $product;
  }
}