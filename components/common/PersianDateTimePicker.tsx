import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersianDateTimePicker({
  text,
  name,
  range = false,
  minDate,
  maxDate,
  value,
  onDateChange,
  timezone = "Asia/Tehran",
}: {
  text: string;
  name: string;
  range?: boolean;
  value?: DateObject | string;
  minDate?: DateObject | string;
  maxDate?: DateObject | string;
  onDateChange?: (
    date: string | null | { startDate: string | null; endDate: string | null }
  ) => void;
  timezone?: string;
}) {
  const [selectedDates, setSelectedDates] = useState<
    DateObject | DateObject[] | null
  >(null);

  const formatWithTimezone = (date: DateObject | null) => {
    if (!date) return null;

    // Use Intl.DateTimeFormat to format with timezone
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    };

    return new Intl.DateTimeFormat("fa-IR", options).format(date.toDate());
  };

  const handleChange = (date: DateObject | DateObject[] | null) => {
    setSelectedDates(date);

    if (onDateChange) {
      if (Array.isArray(date)) {
        const [start, end] = date;
        onDateChange({
          startDate: start ? formatWithTimezone(start) : null,
          endDate: end ? formatWithTimezone(end) : null,
        });
      } else {
        onDateChange(date ? formatWithTimezone(date) : null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full">
        <Label>{text}</Label>
        <DatePicker
          value={value || selectedDates}
          calendar={persian}
          locale={persian_fa}
          format="dddd YYYY/MM/DD HH:mm" // Include the day of the week
          range={range}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleChange}
          plugins={[<TimePicker position="bottom" key="1" />]}
          render={<CustomInput onFocus value onChange />}
        />
        {/* Hidden inputs for form submission */}
        {range && Array.isArray(selectedDates) && (
          <>
            <input
              type="hidden"
              name={`${name}_start`}
              value={
                selectedDates[0] ? formatWithTimezone(selectedDates[0]) : ""
              }
            />
            <input
              type="hidden"
              name={`${name}_end`}
              value={
                selectedDates[1] ? formatWithTimezone(selectedDates[1]) : ""
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

function CustomInput({
  onFocus,
  value,
  onChange,
}: {
  onFocus;
  value;
  onChange;
}) {
  return <Input onFocus={onFocus} value={value} onChange={onChange} />;
}
