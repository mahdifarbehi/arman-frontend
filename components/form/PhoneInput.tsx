"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaCheckCircle, FaRegCircle, FaTrash, FaPlus } from "react-icons/fa"; // Add check icons
import { validatePhoneNumber } from "@/utils/helpers";
import { toast } from "@/hooks/use-toast";
import { Phone } from "@/utils/types";

type PhoneInputProps = {
  phones: Phone[];
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
  label: string;
};

function PhoneInput({ phones, setPhones, label }: PhoneInputProps) {
  const [newPhone, setNewPhone] = useState<string>("");

  const handleAddPhone = () => {
    if (newPhone && !phones?.some((phone) => phone.phone === newPhone)) {
      if (validatePhoneNumber(newPhone)) {
        const newPhoneItem = {
          phone: newPhone,
          main_number: phones.length === 0,
        }; // Set the first phone as the main number
        setPhones([...phones, newPhoneItem]);
        setNewPhone("");
      } else {
        toast({ description: "شماره موبایل صحیح نمی باشد" });
      }
    }
  };

  const handleRemovePhone = (phone: string) => {
    setPhones((prev) => {
      const filteredPhones = prev.filter((p) => p.phone !== phone);
      // If the main phone is removed, set the first phone in the list as the new main number
      if (
        filteredPhones.length > 0 &&
        !filteredPhones.some((p) => p.main_number)
      ) {
        filteredPhones[0].main_number = true;
      }
      return filteredPhones;
    });
  };

  const handleSetMainPhone = (phone: string) => {
    setPhones((prev) =>
      prev.map((p) => ({ ...p, main_number: p.phone === phone }))
    );
  };

  return (
    <div className="mb-2">
      <Label>{label}</Label>
      <div>
        {phones.map(({ phone, main_number }, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-1 rounded"
          >
            <span className={main_number ? "font-bold text-blue-500" : ""}>
              {phone}
            </span>
            <div className="flex items-center space-x-2">
              {/* Show filled check icon for the main number, and unfilled check icon for others */}
              {main_number ? (
                <FaCheckCircle
                  className="text-green-500 cursor-pointer ml-2"
                  title="شماره اصلی"
                />
              ) : (
                <FaRegCircle
                  className="text-gray-400 cursor-pointer hover:text-green-500 ml-2"
                  onClick={() => handleSetMainPhone(phone)}
                  title="تنظیم به عنوان اصلی"
                />
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemovePhone(phone)}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Phone */}
      <div className="relative ">
        <Input
          type="text"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="شماره جدید"
          className="pr-10" // Add padding to make space for the button
        />
        <Button
          type="button"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white px-3 py-0"
          onClick={handleAddPhone}
        >
          <FaPlus />
        </Button>
      </div>
      <Input type="hidden" name="phones" value={JSON.stringify(phones)} />
    </div>
  );
}

export default PhoneInput;
