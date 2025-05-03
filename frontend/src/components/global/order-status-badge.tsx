import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusVariants = cva("font-medium", {
  variants: {
    variant: {
      PLACED: "bg-blue-100 text-blue-700 border-blue-200",
      SHIPPED: "bg-amber-100 text-amber-700 border-amber-200",
      DELIVERED: "bg-green-100 text-green-700 border-green-200",
      CANCELLED: "bg-red-100 text-red-700 border-red-200",
    },
  },
  defaultVariants: {
    variant: "PLACED",
  },
})

interface OrderStatusBadgeProps extends VariantProps<typeof statusVariants> {
  status: string
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(statusVariants({ variant: status as any }), className)}>
      {status}
    </Badge>
  )
}
