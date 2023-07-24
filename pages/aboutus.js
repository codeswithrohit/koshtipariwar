import React from 'react'

const aboutus = () => {
  return (
    <div className='container m-auto min-h-screen mt-20' >
       <div className="relative block max-w-300 max-h-320 bg-gradient-to-b from-blue-200 to-blue-400 rounded-md p-8 my-12 overflow-hidden transition-transform hover:scale-110 transform-gpu">
  <p className="text-xl font-bold mb-2 text-blue-900">Product Name</p>
  <p className="text-sm text-blue-800">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
    veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio
    officia deleniti. Expedita iste et illum, quaerat pariatur consequatur
    eum nihil itaque!
  </p>
  <div className="flex items-center justify-center absolute top-0 right-0 w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-700 rounded-bl-md">
    <div className="text-white font-mono transform-gpu rotate-45">→</div>
  </div>
</div>



        </div>
  )
}

export default aboutus