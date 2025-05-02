import { useSession } from "next-auth/react";
import { useMutationData } from "./useMutation";
import { addToCart, clearCart, getCart, removeFromCart } from "@/api/cart";
import { toast } from "sonner";
import { useQueryData } from "./useQueryData";
import { ICart } from "@/types/ICart";

export const useAddtoCart = (type?: "update") => {
    const { data: session } = useSession()
    const { mutate, isPending, isSuccess, error } = useMutationData(['cart'], (data: { productId: string, size: string, quantity: number }) => addToCart(data.productId, data.size, data.quantity, session?.user?.token || ""), ['cart'], () => {
        const message = type === "update" ? "Cart updated" : "Product added to cart"
        toast.success(message)
    })
    return { mutate, isPending, isSuccess, error }
}

export const useGetCart = () => {
    const { data: session } = useSession()
    const { data, isLoading, error } = useQueryData(['cart'], () => getCart(session?.user?.token || ""),)
    const response = data as { message: string, cart: ICart }
    return { data: response, isLoading, error }
}


export const useRemoveFromCart = () => {
    const { data: session } = useSession()
    const { mutate, isPending, isSuccess, error } = useMutationData(['cart'], (data: { productId: string, size: string }) => removeFromCart(data.productId, data.size, session?.user?.token || ""), ['cart'], () => {
        toast.success("Product removed from cart")
    })
    return { mutate, isPending, isSuccess, error }
}


export const useClearCart = () => {
    const { data: session } = useSession()
    const { mutate, isPending, isSuccess, error } = useMutationData(['cart'], () => clearCart(session?.user?.token || ""), ['cart'], () => {
        toast.success("Cart cleared")
    })
    return { mutate, isPending, isSuccess, error }
}





