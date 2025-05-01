"use client";
import { useAddress } from "@/hooks/useAddress";
import React from "react";
import { FormField } from "../ui/form";
import { Form } from "../ui/form";
import FormGeneratorV2 from "../global/formgenrator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recentAddresses } from "@/constants/data";
import { FaAddressCard } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuMapPinHouse } from "react-icons/lu";
import { IoEarthSharp } from "react-icons/io5";
import { FaFlag } from "react-icons/fa";

const AddressForm = () => {
  const { form, onFormSubmit, control, errors } = useAddress();
  return (
    <div className="w-full   ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col ">
          <p className="text-xl font-medium">Address</p>
          <p className="text-sm mb-5 text-muted-foreground font-medium">
            Please enter your address to continue
          </p>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm text-muted-foreground font-medium">
            Recent Uses Adreesses
          </p>

          <Select
            onValueChange={(value) => {
              const address = recentAddresses.find(
                (address) => address.id.toString() === value
              );
              if (address) {
                form.setValue("address", address.address);
                form.setValue("city", address.city);
                form.setValue("country", address.country);
                form.setValue("postalCode", address.postalCode);
                form.setValue("street", address.street);
              }
            }}
          >
            <SelectTrigger className="w-[180px] bg-muted-foreground/10">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-muted-foreground/10 backdrop-blur-sm">
              {recentAddresses.map((address) => (
                <SelectItem key={address.id} value={address.id.toString()}>
                  {address.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={onFormSubmit} className="w-full grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormGeneratorV2
                field={field}
                type="text"
                label="Address"
                placeholder="Enter your address"
                inputType="input"
                errors={errors}
                Icon={FaAddressCard}
                className={{
                  input: "w-full",
                }}
              />
            )}
          />
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormGeneratorV2
                field={field}
                type="text"
                label="City"
                placeholder="Enter your city"
                inputType="input"
                errors={errors}
                Icon={FaMapLocationDot}
                className={{
                  input: "w-full",
                }}
              />
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormGeneratorV2
                field={field}
                type="text"
                label="Country"
                placeholder="Enter your country"
                inputType="input"
                errors={errors}
                Icon={IoEarthSharp}
                className={{
                  input: "w-full",
                }}
              />
            )}
          />
          <FormField
            control={control}
            name="postalCode"
            render={({ field }) => (
              <FormGeneratorV2
                field={field}
                type="text"
                label="Postal Code"
                placeholder="Enter your postal code"
                inputType="input"
                errors={errors}
                Icon={FaFlag}
                className={{
                  input: "w-full",
                }}
              />
            )}
          />
          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormGeneratorV2
                field={field}
                type="text"
                label="Street"
                placeholder="Enter your street"
                inputType="input"
                errors={errors}
                Icon={LuMapPinHouse}
                className={{
                  input: "w-full",
                }}
              />
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
