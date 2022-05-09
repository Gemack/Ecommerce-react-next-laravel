<?php

namespace App\Http\Controllers;

use App\Models\Hot;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class HotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Hot::all();
        return $product;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'name'=>'required',
            'image'=>'required',
            'amount'=>'required',
            'quantity'=>'required',
            'description'=>'required',
           
        ]);
            
            $file = $request->file('image');
            $extention = $file->getClientOriginalExtension();
            $filename =time().'.'.$extention;
            Image::make($file)->resize(300, 200)->save('image/hot/'. $filename, 100); 
            $product =Hot::find($id);
            $old_img =$product->image;
            if($old_img){
                unlink($old_img);
            }  
            $product->update([
             "name"=>$fields['name'],
             "amount"=>$fields['amount'],
             "quantity"=>$fields['quantity'],
            "description"=>$fields['description'],
            'image'=> 'image/hot/'. $filename,
        ]);
 

        return response($product, 200); 
 
    }


    
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name'=>'required',
            'image'=>'required',
            'amount'=>'required',
            'quantity'=>'required',
            'description'=>'required',
           
        ]);
        
            $file = $request->file('image');
            $extention = $file->getClientOriginalExtension();
            $filename =time().'.'.$extention;
            Image::make($file)->resize(300, 200)->save('image/hot/'. $filename, 100); 

        $product =Hot::create([
             "name"=>$fields['name'],
             "amount"=>$fields['amount'],
             "quantity"=>$fields['quantity'],
            "description"=>$fields['description'],
            'image'=> 'image/hot/'. $filename,
        ]);
 

        return response($product, 200); 
 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Hot  $hot
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
     $product =Hot::find($id);
     $old_img = $product->image;
     unlink($old_img);

     Hot::find($id)->delete();
        
        return response("Product Deleted", 204);
    }
    public function show($id)
    {
     $product = Hot::find($id);
     return response($product, 200);
    }
}