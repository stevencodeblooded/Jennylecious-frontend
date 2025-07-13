import React, { useState } from "react";

const OrderCalendar = ({ selectedDate, onDateChange, minDays = 1 }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get current date to calculate disabled dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate the minimum allowed date based on minDays
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + minDays);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarHeader = () => {
    const monthNames = [
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

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const previousMonth = () => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(newDate.getMonth() - 1);

      // Don't allow navigating to past months
      if (
        newDate.getMonth() >= today.getMonth() ||
        newDate.getFullYear() > today.getFullYear()
      ) {
        setCurrentMonth(newDate);
      }
    };

    const nextMonth = () => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(newDate.getMonth() + 1);
      setCurrentMonth(newDate);
    };

    return (
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className={`p-2 rounded-full hover:bg-gray-100 ${
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600"
          }`}
          disabled={
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="font-semibold text-gray-800">
          {monthNames[month]} {year}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-gray-600 text-sm py-1">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDaysOfMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Calculate blank cells for days before the first day of the month
    const blankCells = Array(firstDayOfMonth).fill(null);

    // Create array for days of the month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Combine blank cells and days
    const allCells = [...blankCells, ...daysArray];

    // Check if a date is the currently selected date
    const isSelectedDate = (day) => {
      if (!selectedDate || !day) return false;

      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      );
    };

    // Check if a date is in the past (or before min date)
    const isDisabledDate = (day) => {
      if (!day) return false;

      const date = new Date(year, month, day);
      return date < minDate;
    };

    // Handle date selection
    const handleDateClick = (day) => {
      if (isDisabledDate(day)) return;

      const newDate = new Date(year, month, day);
      onDateChange(newDate);
    };

    return (
      <div className="grid grid-cols-7 gap-1">
        {allCells.map((day, index) => (
          <div
            key={index}
            className={`
              relative py-2 text-center rounded-md cursor-pointer
              ${!day ? "cursor-default" : ""}
              ${isSelectedDate(day) ? "bg-pink-500 text-white" : ""}
              ${isDisabledDate(day) ? "text-gray-300 cursor-not-allowed" : ""}
              ${
                day && !isSelectedDate(day) && !isDisabledDate(day)
                  ? "hover:bg-gray-100"
                  : ""
              }
            `}
            onClick={() => day && handleDateClick(day)}
          >
            {day}
            {isSelectedDate(day) && (
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <span className="block w-1 h-1 rounded-full bg-white"></span>
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Format the selected date for display
  const formatSelectedDate = () => {
    if (!selectedDate) return null;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return selectedDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      {renderCalendarHeader()}
      {renderDaysOfWeek()}
      {renderDaysOfMonth()}

      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Selected Date:</p>
          <p className="font-medium text-gray-800">{formatSelectedDate()}</p>
        </div>
      )}
    </div>
  );
};

export default OrderCalendar;
