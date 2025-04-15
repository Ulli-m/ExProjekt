import React from "react";

const CalendarGrid = ({ currentWeekStart }) => {
  const times = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00",
  ];

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentWeekStart);
    day.setDate(day.getDate() + i);
    return day;
  });

  return (
    <div className="calendar-grid">
      <div className="calendar-header">
        <div className="time-column"></div>
        {days.map((day) => (
          <div key={day.toISOString()} className="day-column">
            {day.toLocaleDateString("sv-SE", { weekday: "short", day: "numeric" })}
          </div>
        ))}
      </div>
      <div className="calendar-body">
        {times.map((time) => (
          <div key={time} className="time-row">
            <div className="time-column">{time}</div>
            {days.map((day) => (
              <div
                key={day.toISOString() + time}
                className="time-slot"
                onClick={() => console.log(`Vald: ${day.toDateString()} ${time}`)}
              >
                Ledig
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
