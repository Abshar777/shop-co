"use client";
import React, { useState } from "react";
import { PackageOpen, ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ordersMockData } from "@/constants/data";
import OrderItem from "../../global/orderItem";
import { useGetOrders } from "@/hooks/useOrder";
import MyOrdersSkeleton from "../../loading/MyOrdersSkeleton";
const orderCard = () => {
  const { filteredOrders, setSearchTerm, searchTerm, isLoading, data } =
    useGetOrders();

  if (isLoading) return <MyOrdersSkeleton />;
  const noOrder = (
    <div className="text-center py-12">
      <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium">No processing orders</h3>
      <p className="text-gray-500 mt-2">
        You don't have any orders being processed right now
      </p>
    </div>
  );

  const filterOrderByStatus = (status: string) => {
    return filteredOrders.filter((order) => order.orderStatus === status)
      .length > 0
      ? filteredOrders
          .filter((order) => order.orderStatus === status)
          .map((order) => <OrderItem key={order._id} order={order} />)
      : noOrder;
  };
  return (
    <div className="w-full md:col-span-3 bg-gray-300/10 rounded-lg border-input border-1 py-4 mt-4 ">
      <div className=" mx-auto px-4  flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">MY ORDERS</h1>
              <Link href="/" className="text-blue-600 hover:underline text-sm">
                Continue Shopping
              </Link>
            </div>

            <div className="mb-8">
              <div className="relative mb-4">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search orders by ID or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                  <TabsTrigger value="PLACED">Placed</TabsTrigger>
                  <TabsTrigger value="SHIPPED">Shipped</TabsTrigger>
                  <TabsTrigger value="DELIVERED">Delivered</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {filteredOrders.length > 0
                    ? filteredOrders.map((order) => (
                        <OrderItem key={order._id} order={order} />
                      ))
                    : noOrder}
                </TabsContent>

                <TabsContent value="PLACED" className="space-y-6">
                  {filterOrderByStatus("PLACED")}
                </TabsContent>

                <TabsContent value="SHIPPED" className="space-y-6">
                  {filterOrderByStatus("SHIPPED")}
                </TabsContent>

                <TabsContent value="DELIVERED" className="space-y-6">
                  {filterOrderByStatus("DELIVERED")}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderCard;
