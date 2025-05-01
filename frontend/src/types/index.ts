export interface IProduct {
    id: number;
    name: string;
    price: number;  
    originalPrice: number;
    rating: number;
    discount: number;
    image: string;
  };

 export interface Testimonial {
    id: number
    name: string
    stars: number
    text: string
    verified: boolean
  }