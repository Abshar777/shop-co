import React from 'react'
import {marqueItems} from "@/constants"
const Marque = () => {
  return (
    <div className="w-full min-h-10 py-5 bg-primary flex items-center md:justify-between justify-center gap-10 md:flex-nowrap flex-wrap   px-10">
      {marqueItems.map((item,index)=>(
        <div key={index} className="md:w-[10rem] w-[6rem]  overflow-hidden">
            <img src={item} alt="marque" className="w-full object-cover h-full" />
        </div>
      ))}
    </div>
  )
}

export default Marque
