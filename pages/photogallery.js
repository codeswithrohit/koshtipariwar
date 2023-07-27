import Link from 'next/link'
import React from 'react'

const photogallery = () => {
  return (
    <div className='m-auto min-h-screen bg-white' >
       
<section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-pink-900 capitalize lg:text-3xl dark:text-white">Program
          Photo</h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-3">
          
        <Link href="/gallerydetails">
              
                <div
                  className="flex items-end overflow-hidden bg-cover rounded-lg h-96 cursor-pointer"
                  style={{
                    backgroundImage:
                      "url('https://www.k4fashion.com/wp-content/uploads/2022/09/The-Picture-Perfect-Family-Portrait-wedding-photos-750x460.jpg')",
                  }}
                >
                  <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                    <h2 className="mt-4 text-xl font-semibold text-pink-900 capitalize dark:text-white">
                      Mumbai
                    </h2>
                   
                  </div>
                </div>
             
            </Link>

            <Link href="/gallerydetails">
              
              <div
                className="flex items-end overflow-hidden bg-cover rounded-lg h-96 cursor-pointer"
                style={{
                  backgroundImage:
                    "url('https://www.ptaufiqphotography.com/wp-content/uploads/2018/10/Neha-Alman-Wedding-725-scaled.jpg')",
                }}
              >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-pink-900 capitalize dark:text-white">
                    Pune
                  </h2>
                  
                </div>
              </div>
           
          </Link>
          <Link href="/gallerydetails">
              
              <div
                className="flex items-end overflow-hidden bg-cover rounded-lg h-96 cursor-pointer"
                style={{
                  backgroundImage:
                    "url('https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/878/669/new_medium/DR_20190201_WED_2554.jpg?1558605075')",
                }}
              >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-pink-900 capitalize dark:text-white">
                    Kolkata
                  </h2>
                 
                </div>
              </div>
           
          </Link>

           

         
        </div>
    </div>
</section>

    </div>
  )
}

export default photogallery