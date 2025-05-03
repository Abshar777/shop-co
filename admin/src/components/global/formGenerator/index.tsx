"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea" | "checkbox" ;
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  className?: string;
  showError?: boolean;
  Icon?: IconType;
  maxLength?: number;
  checked?: boolean;
};

const FormGenerator = ({
  inputType,
  options,
  label,
  placeholder = "",
  register,
  name,
  errors,
  type,
  lines,
  className,
  showError = true,
  checked,
  Icon,
  maxLength,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [Type, setType] = useState<string>(type || "text");
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col  gap-2  capitalize"
          htmlFor={`input-${label}`}
        >
          <p className="flex font-semibold items-center gap-1">
            {label && label}
            {label && <span className="text-primary">*</span>}
          </p>

          <div className="flex relative items-center justify-end">
            {Icon && (
              <Icon className="absolute text-sm left-2 text-muted-foreground" />
            )}{" "}
            <Input
              maxLength={maxLength}
              id={`input-${label}`}
              type={Type}
              placeholder={placeholder}
              className={cn(`${errors[name] && "errInput"} flex-1`, className)}
              {...register(name)}
            />
            {type == "password" && (
              <i
                onClick={() => {
                  setShow(!show);
                  Type == "password" ? setType("text") : setType("password");
                }}
                className={`cursor-pointer  ${
                  show ? "ri-eye-close-line" : "ri-eye-2-line"
                } absolute me-2`}
              ></i>
            )}
          </div>
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }: { message: string }) => (
                <p className="text-red-700 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );
    case "select":
      return (
        <Label htmlFor={`select-${label}`} className="flex flex-col gap-2">
          {label && label}
          <select
            id={`select-${label}`}
            className={cn(`${errors[name] && "errInput"} flex-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`, className)}
            {...register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option value={option.value} key={option.id} className="capitalize bg-background ">
                  {option.label}
                </option>
              ))}
          </select>
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }: { message: string }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );

    case "textarea":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Textarea
            className={cn(
              className,
              `focus:bg-background/20 placeholder:text-muted-foreground/30 bg-primary-foreground ${
                errors[name] && "errInput"
              } border-themeGray text-themeTextGray`
            )}
            id={`input-${label}`}
            placeholder={placeholder}
            rows={lines}
            {...register(name)}
          />
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }: { message: string }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );
     default:
      break;
  }
};

export default FormGenerator;
