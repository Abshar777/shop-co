"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  Mail,
  PackageOpen,
  Clock,
  Check,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import { ordersMockData, ordersMockDataDetails } from "@/constants/data";

// Mock data for orders (same as in Orders.tsx)

const OrderDetail = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const neworder = ordersMockDataDetails.find((order) => order.id === id);
    console.log(neworder);
    setOrder(neworder);
  }, [id]);

  if (!order) {
    return (
      <div className="container mx-auto md:px-10 px-4 py-16 flex-1 flex items-center justify-center">
        <div className="text-center">
          <PackageOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Button asChild>
            <Link href="/home/profile/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderSteps = [
    { icon: Clock, label: "Order Placed", date: order.date, completed: true },
    {
      icon: PackageOpen,
      label: "Processing",
      date: "May 2, 2025",
      completed: true,
    },
    { icon: Truck, label: "Shipped", date: "May 3, 2025", completed: true },
    { icon: Check, label: "Delivered", date: "May 5, 2025", completed: true },
  ];

  return (
    <div className="container mx-auto md:px-10 px-4 py-8 flex-1">
      {/* Breadcrumb */}
      <Breadcrumbs />

      <div className="mb-6 mt-6">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link href="/home/profile/orders" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Orders
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Order:{" "}
              <p className=" text-xl translate-y-0.5 font-bold">
                {order.id}
              </p>
              <Badge variant="outline" className="ml-2">
                {order.status}
              </Badge>
            </h1>
            <p className="text-gray-500">Placed on {order.date}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail size={16} className="mr-2" /> Contact Support
            </Button>
            <Button size="sm" asChild>
              <Link href={`/track/${order.id}`}>
                <Truck size={16} className="mr-2" /> Track Order
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Order Progress */}
      <Card className="p-6 mb-8 bg-muted-foreground/10">
        <h2 className="text-lg font-bold mb-6">Order Progress</h2>
        <div className="relative flex justify-between">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          {orderSteps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center w-1/4"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step.completed ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                <step.icon size={16} />
              </div>
              <p className="font-medium text-sm">{step.label}</p>
              <p className="text-gray-500 text-xs">{step.date}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="md:col-span-2">
          <Card className="p-6 mb-2 bg-muted-foreground/10">
            <h2 className="text-lg font-bold mb-1">Order Items</h2>
            <div className="w-full h-[1px] bg-primary/10"></div>

            <div className="space-y-6">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${(order.total - 10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${order.total >= 100 ? "0.00" : "10.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Details */}
        <div className="space-y-8">
          {/* Shipping Information */}
          <Card className="p-6 bg-muted-foreground/10">
            <div className="flex justify-between items-center mb-">
              <h2 className="text-lg font-bold">Shipping Information</h2>
              <MapPin size={18} />
            </div>
            <div className="w-full h-[1px] bg-primary/10"></div>

            <div className="space-y-1">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">Shipping Method</p>
              <p className="text-gray-500">{order.shippingMethod}</p>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">Tracking Number</p>
              <p className="text-blue-600 hover:underline cursor-pointer">
                {order.trackingNumber}
              </p>
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-6 bg-muted-foreground/10">
            <h2 className="text-lg font-bold ">Payment Information</h2>
            <div className="w-full h-[1px] bg-primary/10"></div>

            <div>
              <p className="font-medium">Payment Method</p>
              <p className="text-gray-500">{order.paymentMethod}</p>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">Billing Address</p>
              <p className="text-gray-500">Same as shipping address</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
