"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { userColumns as columns, IUser } from "./columns";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useUsers } from "@/hooks/useUsers";
import { ColumnDef } from "@tanstack/react-table";

interface Props {}

const UsersList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  const { data, isPending } = useUsers();

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const users = data.users || [];
    return <DataTable  search={"name"} data={users} columns={columns}  />;
  }
  return null;
};

export default UsersList;
