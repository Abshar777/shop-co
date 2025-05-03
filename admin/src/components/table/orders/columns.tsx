"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CellAction } from "@/components/global/cell-actions"; // optional
import { toast } from "sonner"; // or any toast library
import { Button } from "@/components/ui/button";

import type { IOrder } from "@/types/IOrder"; // adjust path if needed
import { cn } from "@/lib/utils";
import OrderInfo from "@/components/global/orderInfo";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-yellow-500/20 border-yellow-500/40 hover:bg-yellow-500/30 cursor-pointer";
    case "SHIPPED":
      return "bg-purple-500/20 border-purple-500/40 hover:bg-purple-500/40 cursor-pointer";
    case "DELIVERED":
      return "bg-green-500/20 border-green-500/40 hover:bg-green-500/40 cursor-pointer";
    case "CANCELLED":
      return "bg-red-500/20 border-red-500/40 hover:bg-red-500/40 cursor-pointer";
    default:
      return "bg-gray-500/20 border-gray-500/40 hover:bg-gray-500/40 cursor-pointer";
  }
};

export const orderColumns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "orderId",
    header: "id",

    cell: ({ row }) => (
      <div>
        ORD-{" "}
        {row.original._id.split("").reverse().splice(0, 4).reverse().join("")}
      </div>
    ),
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.userId as any;
      return <div>{typeof user === "object" ? user.name : user}</div>;
    },
  },
  {
    accessorKey: "deliveryBoy",
    header: "Delivery Boy",
    cell: ({ row }) => {
      const deliveryBoy = row.original.deliveryBoy as any;
      return (
        <Badge
          className={cn(
            !!deliveryBoy
              ? "bg-primary/20 border-primary/30 border"
              : "bg-red-600/20 border-red-600/40 border"
          )}
          variant={!!deliveryBoy ? "default" : "destructive"}
        >
          {!!deliveryBoy ? "asigned " : "not"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.original.products;
      return <div className="max-w-[200px] truncate">{products.length}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => <div>₹{row.original.totalAmount}</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.paymentMethod}</Badge>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <Badge
          variant={
            status === "PAID"
              ? "default"
              : status === "FAILED"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={getStatusColor(row.original.orderStatus)}
      >
        {row.original.orderStatus}
      </Badge>
    ),
  },
  {
    accessorKey: "address",
    header: "City",
    cell: ({ row }) => <div>{row.original.address.city}</div>,
  },
  {
    accessorKey: "fullAddress",
    header: "Address",
    cell: ({ row }) => <div>{row.original.address.address}</div>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellAction
        info={<OrderInfo order={row.original as any} />}
        id={(row.original as any)._id}
      />
    ),
  },
];
