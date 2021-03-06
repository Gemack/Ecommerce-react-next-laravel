<?php

namespace App\Http\Controllers;
use Intervention\Image\Facades\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // 
    public function register(Request $request)
    {
        // Validate the incomming request
       $fields = $request->validate([
           'name'=>'required',
           'email'=>'required',
           'username'=>'required',
           'phone'=>'required',
           'password'=>'required|confirmed',
       ]);

    
       $user =User::create([
            "name"=>$fields['name'],
            "email"=>$fields['email'],
            "username"=>$fields['username'],
            "phone"=>$fields['phone'],
            "password"=>bcrypt($fields['password']),
       ]);

    //    Create access token
       $token = $user->createToken($user['email'])->plainTextToken;

       $response =[
            "user"=>$user,
            "token"=>$token
       ];

       return response($response, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'=>'required',
            'password'=>'required'
        ]);
        // check Email
        $user = User::where('email', $fields['email'])->first();
        // check if users is null
        if(is_null($user)){
            $response=[
                "msg"=>"User Cannot be Found"
            ];
            return response($response, 400);
        }
        // check password
        if(!Hash::check($fields['password'], $user->password)){
            $response=[
                "msg"=>"Wrong Password"
            ];
            return response($response, 400);
        }
        $token = $user->createToken($user['email'])->plainTextToken;

        $response =[
             "user"=>$user,
             "token"=>$token
        ];
        return response($response, 200);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Delete current user token
    auth()->user()->tokens()->delete();
    $response =[
        "message"=>'Logged out completed'
   ];
   return response($response, 200);
   
    }


    public function update(Request $request, $id)
    {

        // validate incomming request
        
        $fields = $request->validate([
            'name'=>'required',
            'email'=>'required',
            'username'=>'required',
            'phone'=>'required',
            'password'=>'required|confirmed',
        ]);

        // Check if the user has a profile picture, resize and save picture in server
        if($request->hasFile('profile')){
            $file = $request->file('profile');
            $extention = $file->getClientOriginalExtension();
            $filename =time().'.'.$extention;
            Image::make($file)->resize(300, 200)->save('image/profile/'. $filename, 100);
           

            // Find and delete update picture 
            $user =User::find($id);
            $old_img =$user->profile;
         
            if($old_img){
                unlink($old_img);
            }     
            
            // update user with the new profile picture if there is a new profile picture
            $user->update([
                "name"=>$fields['name'],
                "email"=>$fields['email'],
                "profile"=> 'image/profile/'. $filename,
                "username"=>$fields['username'],
                "phone"=>$fields['phone'],
                "password"=>bcrypt($fields['password']),
           ]);
        }


        //  Update user without profile picture
        $user =User::find($id);
        $user->update([
            "name"=>$fields['name'],
            "email"=>$fields['email'],
            "username"=>$fields['username'],
            "phone"=>$fields['phone'],
            "password"=>bcrypt($fields['password']),
       ]);
        return $user;
        
    }
}