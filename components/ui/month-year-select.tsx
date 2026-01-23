"use client";

/**
 * Month/Year Select Component
 *
 * A cascading select component for selecting year and month.
 * Used as an alternative to the calendar picker for better UX.
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MonthYearSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 1; year >= 1950; year--) {
    years.push(year);
  }
  return years;
};

export function MonthYearSelect({
  value,
  onChange,
  disabled,
  placeholder = "Select date",
}: MonthYearSelectProps) {
  const yearOptions = generateYearOptions();

  // Parse current value
  let currentYear = "";
  let currentMonth = "";

  if (value) {
    const parts = value.split("-");
    if (parts.length === 2) {
      currentYear = parts[0];
      currentMonth = parts[1];
    }
  }

  const handleYearChange = (year: string) => {
    if (currentMonth) {
      onChange(`${year}-${currentMonth}`);
    } else {
      onChange(`${year}-01`);
    }
  };

  const handleMonthChange = (month: string) => {
    if (currentYear) {
      onChange(`${currentYear}-${month}`);
    } else {
      const currentYear = new Date().getFullYear();
      onChange(`${currentYear}-${month}`);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Select
          value={currentYear}
          onValueChange={handleYearChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Select
          value={currentMonth}
          onValueChange={handleMonthChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month, index) => (
              <SelectItem
                key={month}
                value={(index + 1).toString().padStart(2, "0")}
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
