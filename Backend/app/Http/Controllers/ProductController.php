<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        return $product;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate incomming request
        $fields = $request->validate([
            'category'=>'required',
            'name'=>'required',
            'image'=>'required',
            'amount'=>'required',
            'quantity'=>'required',
            'description'=>'required',
           
        ]);
        
        // Resizing and storing image in serve
            $file = $request->file('image');
            $extention = $file->getClientOriginalExtension();
            $filename =time().'.'.$extention;
            Image::make($file)->resize(300, 200)->save('image/product/'. $filename, 100); 

        $product =Product::create([
            'category'=>$fields['category'],
             "name"=>$fields['name'],
             "amount"=>$fields['amount'],
             "quantity"=>$fields['quantity'],
            "description"=>$fields['description'],
            'image'=> 'image/product/'. $filename,
        ]);
 

        return response($product, 200); 
 
    }


 
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'category'=>'required',
            'name'=>'required',
            'image'=>'required',
            'amount'=>'required',
            'quantity'=>'required',
            'description'=>'required',
           
        ]);
            
            $file = $request->file('image');
            $extention = $file->getClientOriginalExtension();
            $filename =time().'.'.$extention;
            Image::make($file)->resize(300, 200)->save('image/product/'. $filename, 100); 
            $product =Product::find($id);
            $old_img =$product->image;
            if($old_img){
                unlink($old_img);
            }  
            $product->update([
            'category'=>$fields['category'],
             "name"=>$fields['name'],
             "amount"=>$fields['amount'],
             "quantity"=>$fields['quantity'],
            "description"=>$fields['description'],
            'image'=> 'image/product/'. $filename,
        ]);
 

        return response($product, 200); 
 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
     $product =Product::find($id);
     $old_img = $product->image;
     unlink($old_img);

     Product::find($id)->delete();
        
        return response("Product Deleted", 204);
    }
    public function show($id)
    {
     $product = Product::find($id);
     return response($product, 200);
    }
}