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

const orderCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(ordersMockData);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  return (
    <div className="w-full md:col-span-3 bg-gray-300/10 rounded-lg border-input border-1 py-4 mt-4 ">
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Breadcrumb */}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}

          {/* Main content */}
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
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <OrderItem key={order.id} order={order} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">No orders found</h3>
                      <p className="text-gray-500 mt-2">
                        {searchTerm
                          ? "Try a different search term or clear your search"
                          : "You haven't placed any orders yet"}
                      </p>
                      {!searchTerm && (
                        <Button asChild className="mt-4">
                          <Link href="/">Start Shopping</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="processing">
                  <div className="text-center py-12">
                    <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">
                      No processing orders
                    </h3>
                    <p className="text-gray-500 mt-2">
                      You don't have any orders being processed right now
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="shipped">
                  <div className="text-center py-12">
                    <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No shipped orders</h3>
                    <p className="text-gray-500 mt-2">
                      You don't have any orders being shipped right now
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="delivered">
                  {filteredOrders.filter(
                    (order) => order.status === "Delivered"
                  ).length > 0 ? (
                    filteredOrders
                      .filter((order) => order.status === "Delivered")
                      .map((order) => (
                        <OrderItem key={order.id} order={order} />
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">
                        No delivered orders
                      </h3>
                      <p className="text-gray-500 mt-2">
                        You don't have any delivered orders yet
                      </p>
                    </div>
                  )}
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
