import Image from "next/image"
import { Star } from "lucide-react"

interface GlobalCardProps {
//   id: string
//   name: string
//   description: string
//   price: number
//   rating: number
  imageUrl: string;
  onClick?:Function;
}

export default function GlobalCard({  imageUrl ,onClick}: GlobalCardProps) {
  return (
    <div onClick={()=>onClick&&onClick()} className="bg-muted  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 w-full overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={""}  className="w-full h-full object-cover"/>
      </div>
      {/* <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div> */}
    </div>
  )
}

