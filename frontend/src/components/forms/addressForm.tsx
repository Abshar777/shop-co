"use client";

import {  useOrder } from "@/hooks/useOrder";
import React, { RefObject } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { CgOptions } from "react-icons/cg";
import { Button } from "@heroui/button";
import { Control, FieldErrors, UseFormReturn } from "react-hook-form";

const AddressForm = ({ form, onFormSubmit, control, errors, formRef }: { form: UseFormReturn<any>, onFormSubmit: (data: any) => void, control: Control<any>, errors: FieldErrors<any>, formRef: RefObject<HTMLFormElement> }) => {
  
  const isMobile = useIsMobile();
  return (
    <div className="w-full   ">
      <div className="flex flex-row  md:pb-0 pb-5  justify-between w-full  md:items-center items-start">
        <div className="flex flex-col ">
          <p className="text-xl font-medium">Address</p>
          <p className="text-sm mb-5 text-muted-foreground font-medium">
            Please enter your address to continue
          </p>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm md:block hidden text-muted-foreground font-medium">
            Recent Uses Addresses
          </p>

          {!isMobile && (
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
              <SelectTrigger className="md:w-[180px] w-full bg-muted-foreground/10">
                <SelectValue placeholder="Select Address" />
              </SelectTrigger>
              <SelectContent className="bg-muted-foreground/10 backdrop-blur-sm">
                {recentAddresses.map((address) => (
                  <SelectItem key={address.id} value={address.id.toString()}>
                    {address.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {isMobile && (
            <Drawer>
              <DrawerTrigger className="bg-gray-300/30 md:hidden flex cursor-pointer rounded-full hover:scale-105 transition-all duration-300 border-input border-1 p-1">
                <FaAddressCard />
              </DrawerTrigger>
              <DrawerContent className="w-full flex  justify-center">
                <DrawerTitle className="text-center py-2">Recent Addresses</DrawerTitle>
                {/* <ScrollArea className="h-[calc(60vh-10rem)] p-3"> */}
                <div className="p-3 flex flex-col gap-3">
                  {recentAddresses.map((address) => (
                    <Button
                      key={address.id}
                      variant="bordered"
                      className="w-full bg-muted-foreground/10 rounded-lg cursor-pointer"
                    >
                      {address.address}
                    </Button>
                  ))}
                </div>
                {/* </ScrollArea> */}
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
      <Form {...form}>
        <form ref={formRef} onSubmit={onFormSubmit} className="w-full grid md:grid-cols-2 gap-4">
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
