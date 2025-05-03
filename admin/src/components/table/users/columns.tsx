"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/global/cell-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// import { useDeleteUser } from "@/hooks/useUser"; // optional hook for deletion

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: Roles;
  password: string;
  avatar: string;
  verified: boolean;
}

export enum Roles {
  CLIENT = "client",
  ADMIN = "admin",
  DELIVERY_BOY = "delivery_boy",
}

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar className="h-8 w-8">
        <AvatarImage src={row.original.avatar} alt={row.original.name} />
        <AvatarFallback>{row.original.name[0]}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
    enableResizing: true,
    size: 10,
    meta: {
      hideOnMobile: true,
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize">
        {row.original.role}
      </Badge>
    ),
    
  },

];
