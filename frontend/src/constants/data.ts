import { Testimonial } from "@/types";

export const products = [
    {
        id: 1,
        name: "T-shirt with Tape Details",
        price: 120,
        originalPrice: 120,
        rating: 4.5,
        image: "/jacket.webp",
        discount: 0,
    },
    {
        id: 2,
        name: "Skinny Fit Jeans",
        price: 240,
        originalPrice: 260,
        rating: 3.5,
        image: "/jacket.webp",
        discount: 20,
    },
    {
        id: 3,
        name: "Checkered Shirt",
        price: 180,
        originalPrice: 180,
        rating: 4.5,
        image: "/jacket.webp",
        discount: 0,
    },
    {
        id: 4,
        name: "Sleeve Striped T-shirt",
        price: 130,
        originalPrice: 160,
        rating: 4.5,
        image: "/jacket.webp",
        discount: 30,
    },
    {
        id: 5,
        name: "Denim Jacket",
        price: 220,
        originalPrice: 250,
        rating: 4,
        image: "/jacket.webp",
        discount: 12,
    },
    {
        id: 6,
        name: "Casual Hoodie",
        price: 150,
        originalPrice: 180,
        rating: 5,
        image: "/jacket.webp",
        discount: 17,
    },
];




export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah M.",
        stars: 5,
        text: "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\"",
        verified: true,
    },
    {
        id: 2,
        name: "Alex K.",
        stars: 5,
        text: '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
        verified: true,
    },
    {
        id: 3,
        name: "James L.",
        stars: 5,
        text: "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\"",
        verified: true,
    },
    {
        id: 4,
        name: "Moody S.",
        stars: 5,
        text: '"The customer service at Shop.co is exceptional! They went above and beyond to help me find the perfect outfit for a special event. I\'ll definitely be a returning customer."',
        verified: true,
    },
]




export interface ProductColor {
    id: string;
    name: string;
    value: string;
    className?: string;
}

export interface ProductSize {
    id: string;
    name: string;
}

export interface ProductImage {
    src: string;
    alt: string;
}

export interface IMockProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    maxRating?: number;
    colors: ProductColor[];
    sizes: ProductSize[];
    images: ProductImage[];
}

export const mockProduct: IMockProduct = {
    id: "one-life-graphic-tshirt",
    name: "ONE LIFE GRAPHIC T SHIRT",
    description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    price: 260,
    originalPrice: 300,
    discountPercentage: 40,
    rating: 4.5,
    maxRating: 5,
    colors: [
        {
            id: "olive",
            name: "Olive",
            value: "#5D4B35",
        },
        {
            id: "teal",
            name: "Teal",
            value: "#1D464E",
        },
        {
            id: "navy",
            name: "Navy",
            value: "#1F2937",
        }
    ],
    sizes: [
        {
            id: "small",
            name: "Small"
        },
        {
            id: "medium",
            name: "Medium"
        },
        {
            id: "large",
            name: "Large"
        },
        {
            id: "x-large",
            name: "X-Large"
        }
    ],
    images: [
        {
            src: "/jacket.webp",
            alt: "Front view of olive green t-shirt with ONE LIFE graphic"
        },
        {
            src: "https://images.pexels.com/photos/9558760/pexels-photo-9558760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            alt: "Back view of olive green t-shirt with ONE LIFE graphic"
        },
        {
            src: "https://images.pexels.com/photos/9558574/pexels-photo-9558574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            alt: "Close-up view of olive green t-shirt with ONE LIFE graphic being worn"
        }
    ]
};


export const cartItems = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        size: "M",
        quantity: 1,
        image: "/jacket.webp",
    },
    {
        id: 2,
        name: "Product 2",
        price: 200,
        size: "L",
        quantity: 1,
        image: "/jacket.webp",
    },
    {
        id: 3,
        name: "Product 3",
        price: 300,
        size: "XL",
        quantity: 1,
        image: "/jacket.webp",
    },
];


export const recentAddresses = [
    {
        id: 1,
        address: "123 Main St, Anytown, USA",
        city: "Anytown",
        country: "USA",
        postalCode: "12345",
        street: "123 Main St",
    },
   
]



export const profileLinks = [
   {
    id: 1,
    name: "Profile",
    href: "/home/profile",
   },
   {
    id: 2,
    name: "Orders",
    href: "/home/profile/orders",
   }
]


export const ordersMockData = [
    {
      id: "ORD-2387429",
      date: "May 1, 2025",
      total: 127.95,
      status: "Delivered",
      items: [
        {
          id: "1",
          name: "Wireless Headphones",
          price: 79.99,
          quantity: 1,
          image: "/jacket.webp"
        },
        {
          id: "2",
          name: "Phone Case",
          price: 19.99,
          quantity: 1,
          image: "/jacket.webp"
        },
        {
          id: "3",
          name: "USB-C Cable",
          price: 12.99,
          quantity: 2,
          image: "/jacket.webp"
        }
      ]
    },
    {
      id: "ORD-2345671",
      date: "April 15, 2025",
      total: 219.95,
      status: "Delivered",
      items: [
        {
          id: "4",
          name: "Smart Watch",
          price: 199.95,
          quantity: 1,
          image: "/jacket.webp"
        },
        {
          id: "5",
          name: "Watch Band",
          price: 19.99,
          quantity: 1,
          image: "/jacket.webp"
        }
      ]
    },
    {
      id: "ORD-2301456",
      date: "March 23, 2025",
      total: 54.97,
      status: "Delivered",
      items: [
        {
          id: "6",
          name: "T-Shirt",
          price: 24.99,
          quantity: 1,
          image: "/jacket.webp"
        },
        {
          id: "7",
          name: "Socks",
          price: 9.99,
          quantity: 3,
          image: "/jacket.webp"
        }
      ]
    }
  ];


 export const ordersMockDataDetails = [
    {
      id: "ORD-2387429",
      date: "May 1, 2025",
      total: 127.95,
      status: "Delivered",
      items: [
        {
          id: "1",
          name: "Wireless Headphones",
          price: 79.99,
          quantity: 1,
          image: "/jacket.webp",
        },
        {
          id: "2",
          name: "Phone Case",
          price: 19.99,
          quantity: 1,
          image: "/jacket.webp",
        },
        {
          id: "3",
          name: "USB-C Cable",
          price: 12.99,
          quantity: 2,
          image: "/jacket.webp",
        },
      ],
      shippingAddress: {
        name: "Alex Johnson",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      paymentMethod: "Credit Card (ending in 4567)",
      shippingMethod: "Standard Shipping",
      trackingNumber: "1Z999AA10123456789",
    },
    {
      id: "ORD-2345671",
      date: "April 15, 2025",
      total: 219.95,
      status: "Delivered",
      items: [
        {
          id: "4",
          name: "Smart Watch",
          price: 199.95,
          quantity: 1,
          image: "/jacket.webp",
        },
        {
          id: "5",
          name: "Watch Band",
          price: 19.99,
          quantity: 1,
          image: "/jacket.webp",
        },
      ],
      shippingAddress: {
        name: "Alex Johnson",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      paymentMethod: "Credit Card (ending in 4567)",
      shippingMethod: "Express Shipping",
      trackingNumber: "1Z999AA10123456790",
    },
    {
      id: "ORD-2301456",
      date: "March 23, 2025",
      total: 54.97,
      status: "Delivered",
      items: [
        {
          id: "6",
          name: "T-Shirt",
          price: 24.99,
          quantity: 1,
          image: "/jacket.webp",
        },
        {
          id: "7",
          name: "Socks",
          price: 9.99,
          quantity: 3,
          image: "/jacket.webp",
        },
      ],
      shippingAddress: {
        name: "Alex Johnson",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
      },
      paymentMethod: "PayPal",
      shippingMethod: "Standard Shipping",
      trackingNumber: "1Z999AA10123456791",
    },
  ];
  
