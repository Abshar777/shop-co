import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils";

interface GlobalCardProps {
//   id: string
  name: string
  description?: string
  price?: number
//   rating: number
  imageUrl: string;
  onClick?:Function;
  className?:string;
}

export default function ProductCard({  imageUrl ,onClick,className,name,description,price}: GlobalCardProps) {
  return (
    <div onClick={()=>onClick&&onClick()} className={cn(className,"bg-muted/20 mx-2 h-full  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[.95]")}>
      <div className="relative h-48 w-full overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={""}  className="w-full h-full object-cover"/>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold capit mb-2">{name}</h2>
        {/* <p className=" text-sm mb-4 line-clamp-2">{description}</p> */}
        {/* <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">{price}</span>
        </div> */}
      </div>
    </div>
  )
}

