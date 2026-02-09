import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/utils";
import { Input } from "./input";

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
}: DatePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value || undefined);
  };

  return (
    <div className={cn("relative", className)}>
      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
      <Input
        type="date"
        value={value || ""}
        onChange={handleChange}
        className="pl-9"
        placeholder={placeholder}
      />
    </div>
  );
}
