"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { orderColumns as columns } from "./columns";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useOrders } from "@/hooks/useOrder";

interface Props {}

const OrdersList = (props: Props) => {
  

  const { data, isPending } = useOrders();

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const orders = data.orders || [];
    return <DataTable search={"orderId"} data={orders} columns={columns} />;
  }
  return null;
};

export default OrdersList;
