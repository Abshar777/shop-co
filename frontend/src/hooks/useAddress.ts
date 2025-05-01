import { addressSchema } from "@/schema/address.schema"
import { useZodFormV2 } from "./useZodForm"

export const useAddress = () => {
    const { form, onFormSubmit, control, errors } = useZodFormV2(addressSchema, async (data: any) => { }, {
        address: "",
        city: "",
        country: "",
        postalCode: "",
        street: "",
    }, {
        mode: "onChange"
    })
    return { form, onFormSubmit, control, errors }
}

