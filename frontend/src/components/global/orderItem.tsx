"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderItemProps {
  order: {
    id: string;
    date: string;
    total: number;
    status: string;
    items: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }[];
  };
}

const OrderItem = ({ order }: OrderItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-0">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-gray-500" />
            <span className="font-medium">{order.id}</span>
          </div>
          <Separator orientation="vertical" className="hidden sm:block h-6" />
          <span className="text-gray-500 text-sm">{order.date}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Badge variant="outline" className={`${getStatusColor(order.status)} border-0 whitespace-nowrap`}>
            {order.status}
          </Badge>
          <span className="font-medium">${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </span>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500 hover:text-gray-900"
            >
              {expanded ? (
                <>
                  <span className="text-sm mr-1">Hide Details</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span className="text-sm mr-1">View Details</span>
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
            
            <Button size="sm" asChild>
              <Link href={`/home/profile/orders/${order.id}`}>View Order</Link>
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="font-medium">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;