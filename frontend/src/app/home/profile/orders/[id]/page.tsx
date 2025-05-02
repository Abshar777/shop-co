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
import { useGetOrderById } from "@/hooks/useOrder";
import OrderDetailsSkeleton from "@/components/loading/OrderDetailsSkeleton";
// Mock data for orders (same as in Orders.tsx)

const OrderDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetOrderById(id as string);
  const order = data?.order;

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (!order) {
    return (
      <div className=" mx-auto md:px-10 px-4 py-16 flex-1 flex items-center justify-center">
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
  const STATUS = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];
  const orderSteps = [
    {
      icon: Clock,
      label: "Order Placed",
      date: new Date(order.createdAt).toLocaleDateString(),
      completed: STATUS.indexOf(order.orderStatus) >= 0,
    },
    {
      icon: PackageOpen,
      label: "Processing",
      date: new Date(order.createdAt).toLocaleDateString(),
      completed: STATUS.indexOf(order.orderStatus) >= 1,
    },
    {
      icon: Truck,
      label: "Shipped",
      date: new Date(order.createdAt).toLocaleDateString(),
      completed: STATUS.indexOf(order.orderStatus) >= 2,
    },
    {
      icon: Check,
      label: "Delivered",
      date: new Date(order.createdAt).toLocaleDateString(),
      completed: STATUS.indexOf(order.orderStatus) >= 3,
    },
  ];

  return (
    <div className=" mx-auto md:px-10 px-4 py-8 flex-1">
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
                {`${order._id
                  .split("")
                  .reverse()
                  .slice(0, 6)
                  .reverse()
                  .join("")}`}
              </p>
              <Badge variant="outline" className="ml-2">
                {order.orderStatus}
              </Badge>
            </h1>
            <p className="text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail size={16} className="mr-2" /> Contact Support
            </Button>
            <Button size="sm" asChild>
              <Link href={`/home/profile/orders/${order._id}`}>
                <Truck size={16} className="mr-2" /> Track Order
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* orderStatus: 'PLACED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'; */}

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
              {order.products.map((item) => (
                <div key={item.product._id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        item.product.images[0]
                      }
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${item.product.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
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
              <p className="font-medium">{order.address.address}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.country}
              </p>
              <p>{order.address.country}</p>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">Shipping Method</p>
              <p className="text-gray-500">Free</p>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">Tracking Number</p>
              <p className="text-blue-600 hover:underline cursor-pointer">
                {`ORD-${order._id
                  .split("")
                  .reverse()
                  .slice(0, 6)
                  .reverse()
                  .join("")}`}
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
