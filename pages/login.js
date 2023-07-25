import React from 'react'

const login = () => {
  return (
    <div class="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-black via-purple-900 to-violet-600">
    <div class=" md:w-auto w-[90%] p-8 rounded-xl  m-4 flex flex-col items-center shadow-lg border border-gray-400 opacity-90 ">
        <div class="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 ">
            <h1 class="font-semibold text-3xl text-gray-200 m-2">Log In</h1>
        </div>
        <div class="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
            <div class="">
                <div class="m-1 text-lg text-gray-200 text-semibold">Username</div>
                <input type="text" 
                    class="border-b border-gray-200 focus:outline-none  text-gray-200 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"/>
            </div>
            <div class="">
                <div class="m-1 text-lg text-gray-200 text-semibold">Password</div>
                <input type="password"
                    class="border-b border-gray-200 focus:outline-none  text-gray-200 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"/>
            </div>
           
        </div>
        <div class="text-center mt-7">
            <button
                class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-t from-stone-900 via-purple-900 to-violet-600  font-medium ">login</button>
        </div>
    </div>
    <div class="text-center my-6 flex flex-col">
        <a href="#" class="text-sm font-medium text-gray-400 hover:text-violet-500 m-1">Forgot
            Password ?</a>
        <a href="#" class="text-sm font-bold text-gray-400 hover:text-violet-500 m-1">
            Not a User? Create New Account</a>
    </div>

</div> 
  )
}

export default login