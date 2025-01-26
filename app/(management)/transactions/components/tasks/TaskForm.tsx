import { StatusButton, SubmitButton } from "@/components/form/Buttons";
import PersianDateTimePicker from "@/components/common/PersianDateTimePicker";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleTransactionTaskAction } from "@/utils/actions";
import { Label } from "@radix-ui/react-dropdown-menu";
import { TaskStatus, TransactionTask } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getTaskTypes } from "@/store/storeSlice";
import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateObject } from "react-multi-date-picker";
import { persianToISO, isoToPersian } from "@/utils/dateConvertor";

import { useToast } from "@/hooks/use-toast";

type TaskFormProps = {
  task?: TransactionTask | null;
  setOpen?: (state: boolean) => void;
  revalidation: () => void;
  transactionId: number;
};
const initialState = {
  message: "",
  success: false,
};
const TaskForm = ({
  task = null,
  setOpen,
  revalidation,
  transactionId,
}: TaskFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskTypes } = useSelector((state: RootState) => state.store);
  const edit = task ? true : false;
  useEffect(() => {
    if (taskTypes.length == 0) dispatch(getTaskTypes());
  }, [dispatch, taskTypes]);

  const [state, formAction] = useActionState(
    handleTransactionTaskAction,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
    if (state?.success) {
      revalidation();
      setOpen(false);
    }
  }, [state, setOpen, toast, revalidation]);

  const [formData, setFormData] = useState({
    id: task?.id || null,
    finish_data: task?.finish_data || "",
    task_date: task?.task_date || "",
    message: task?.message || "",
    status: task?.status || TaskStatus.NEW,
    task_type_id: task?.task_type?.id || "",
    transaction_id: task?.transaction_id || "",
    description: task?.description || "",
  });

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={formAction} className="w-full">
      <div className="grid md:grid-cols-2 gap-4 mt-4 w-[36rem]">
        {!!task?.id && <Input type="hidden" value={task?.id} name="id" />}
        {!!transactionId && (
          <Input type="hidden" value={transactionId} name="transaction_id" />
        )}
        {!!task?.status && (
          <Input type="hidden" value={formData.status} name="status" />
        )}
        <div className="mb-2">
          <Label>نوع فعالیت</Label>
          <Select
            dir="rtl"
            name="task_type_id"
            value={formData.task_type_id.toString()}
            onValueChange={(value) => handleChange("task_type_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="نوع   موردنظر را انتخاب کنید">
                {taskTypes.find((tt) => tt.id == formData.task_type_id)
                  ?.title || "نوع موردنظر را انتخاب کنید"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {taskTypes.map((task_type) => (
                  <SelectItem
                    key={task_type.id}
                    value={task_type.id.toString()}
                  >
                    {task_type.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <PersianDateTimePicker
          text="تاریخ و ساعت"
          name="task_date"
          minDate={new DateObject()}
          value={isoToPersian(formData?.task_date)}
          onDateChange={(e) =>
            handleChange("task_date", persianToISO(e.toString()))
          }
        />
        <Input
          type="hidden"
          value={formData?.task_date.toString()}
          name="task_date"
        />
      </div>
      <div className="mb-2">
        <Label>توضیحات</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-8">
        <SubmitButton text="ذخیره" className={`${edit ? "w-1/3" : "w-full"}`} />
        {edit && (
          <>
            <StatusButton
              onClick={() => handleChange("status", TaskStatus.COMPLETED)}
              text="موفق"
            />
            <StatusButton
              onClick={() => handleChange("status", TaskStatus.FAILED)}
              text="ناموفق"
            />
          </>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
