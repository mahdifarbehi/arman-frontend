"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {

  getLeaders,
} from "@/store/storeSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {   userAssignmentAction } from "@/utils/actions";


type UserAssignmentFormProps = {
  user_ids: number[];  
  setOpen: (state: boolean) => void;
};

function UserAssignmentForm({ user_ids, setOpen  }: UserAssignmentFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { leaders } = useSelector(
    (state: RootState) => state.store
  );

  useEffect(() => {
    if (leaders.length == 0) dispatch(getLeaders());   
  }, [dispatch, leaders]);

  const [formData, setFormData] = useState({
    user_ids: user_ids || null,
    leader_id: "",    
  });
 

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer action={userAssignmentAction} setOpen={setOpen}>
      {user_ids.length !== 0 && (
        <Input type="hidden" value={user_ids.join(",")} name="user_ids" />
      )}
      <div className="grid md:grid-cols-1 gap-4 mt-4 w-64">
        {/* leader */}
        <div className="mb-2">
          <Label>سرپرست</Label>
          <Select
            dir="rtl"
            name="leader_id"
            value={formData.leader_id.toString()}
            onValueChange={(value) => handleChange("leader_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="سرپرست  موردنظر را انتخاب کنید">
                {leaders.find((leader) => leader.id == formData.leader_id)
                  ?.fullname || "سرپرست موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {leaders.map((leader) => (
                  <SelectItem key={leader.id} value={leader.id.toString()}>
                    {leader.fullname}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <SubmitButton text="ذخیره" className=" w-full mt-8 " />
    </FormContainer>
  );
}

export default React.memo(UserAssignmentForm);
