"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, IndianRupee, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "../globalButton";
import { useManageOrder, useUpdateOrderStatus } from "@/hooks/useOrder";
import { IOrder } from "@/types/IOrder";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { IUser, Roles } from "@/types/api";
import { MdDeliveryDining } from "react-icons/md";

interface OrderDetailsModalProps {
  order: IOrder;
}

const OrderInfo = ({ order }: OrderDetailsModalProps) => {
  const [status, setStatus] = useState(order.orderStatus);
  const { data: session } = useSession();

  // "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  const statusOptions = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

  const handleStatusChange = (
    newStatus: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => {
    setStatus(newStatus);
    updateStatus({
      id: order._id,
      status: newStatus,
    });
  };

  const { mutate: updateStatus, isPending: statusPending } =
    useUpdateOrderStatus();

  const { mutate: mangeOrder, isPending: orderManagePendding } =
    useManageOrder();

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

  return (
    <ScrollArea className="max-h-[600px] w-full  space-y-4">
      <div className="relative cursor-grab  overflow-hidden md:w-[90%] w-full">
        <Carousel
          className=" w-full"
          opts={{
            align: "start",
            // loop: true,
          }}
        >
          <CarouselContent>
            {order.products.map((product) => (
              <CarouselItem
                key={product.product._id}
                className=" w-full shrink-0 "
              >
                <div className="flex gap-4">
                  <Avatar className="w-32 h-32 object-cover relative  rounded-lg">
                    <AvatarImage
                      className="object-cover"
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.product.images[0]}`}
                      alt={product.product.name}
                    />
                    <AvatarFallback>
                      {product.product.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-lg font-semibold">
                      {product.product.name}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      {product.price}
                      INR
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                    <p className="font-semibold flex items-center gap-2">
                      <Calendar size={16} /> Order Created On:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-semibold flex items-center gap-2">
                      <MdDeliveryDining size={16} /> Delivery Boy:{" "}
                      {order.deliveryBoy
                        ? (order.deliveryBoy as any).name
                        : "not asseigned"}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex md:flex-row  flex-col mb-2 mt-2 md:items-center justify-between gap-4 py-4 px-4 bg-muted/20 rounded-lg">
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>{(order.userId as any).name}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{order.userId.name}</p>
            <p className="text-gray-600">{order.userId.email}</p>
          </div>
        </div>
        <AnimatedButton
          size={"sm"}
          type="button"
          text="accept the order"
          loadingText=""
          className={cn(
            "px-4 w-min ",
            (order.deliveryBoy || session.user.role == Roles.ADMIN) && "hidden"
          )}
          onClick={() => {
            mangeOrder({ id: order._id });
          }}
          isLoading={orderManagePendding}
          disabled={orderManagePendding}
        />
        {order.deliveryBoy &&
          (order.deliveryBoy as unknown as IUser)._id.toLowerCase() ==
            session.user.id.toLowerCase() && (
            <div className="flex items-center gap-2 mt-2">
              <Truck size={16} />
              <Select
                disabled={statusPending}
                onValueChange={handleStatusChange}
                defaultValue={status}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue
                    placeholder={
                      <Badge
                        className={`${getStatusColor(
                          order.orderStatus
                        )} text-white`}
                      >
                        {order.orderStatus}
                      </Badge>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      <Badge
                        className={`${getStatusColor(option)} text-white `}
                      >
                        {option}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
      </div>

      <div className="p-4 mb-2  bg-muted/20 rounded-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin size={16} /> Shipping Address
        </h3>
        <p className="px-1 text-muted-foreground">
          {order.address.address}, {order.address.postalCode}
        </p>
      </div>

      <p className="font-semibold text-lg flex items-center gap-1">
        Grand Total: {order.totalAmount} INR
      </p>
    </ScrollArea>
  );
};

export default OrderInfo;
