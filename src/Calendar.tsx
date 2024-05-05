import { createSignal } from 'solid-js';
import { format, addMonths, startOfMonth, endOfMonth, isWithinInterval, isAfter } from 'date-fns';
import { toZonedTime, format as tzFormat } from 'date-fns-tz';

interface Appointment {
  date: string;
  time: string;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [appointments, setAppointments] = createSignal<Appointment[]>([]);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // No need for a signal if it doesn't change  const [selectedDate, setSelectedDate] = createSignal(null);
  const [selectedDate, setSelectedDate] = createSignal<Date | null>(null); // Corrected definition
  const [time, setTime] = createSignal('');
  const [description, setDescription] = createSignal('');
  const daysInMonth = () => new Date(currentDate().getFullYear(), currentDate().getMonth() + 1, 0).getDate();
  const startDay = () => new Date(currentDate().getFullYear(), currentDate().getMonth(), 1).getDay();
  const navigateMonth = (increment: number) => {
  const newDate = addMonths(currentDate(), increment);
    setCurrentDate(startOfMonth(newDate));  // Ensures that we navigate correctly within the month bounds
  };

  const formatCSTDate = (date: Date) => {
    const zonedDate = toZonedTime(date, timezone);
    return tzFormat(zonedDate, 'yyyy-MM-dd', { timeZone: timezone }); // Formats date in CST
  };

  const isSelectableDay = (date: Date) => {
    const today = new Date();
    return isWithinInterval(date, { start: startOfMonth(currentDate()), end: endOfMonth(currentDate()) }) &&
      (isAfter(date, today) || formatCSTDate(date) === formatCSTDate(today));};

  const addAppointment = () => {
    if (time() && description() && selectedDate()) {
      const newAppointment = {
        date: formatCSTDate(selectedDate()!),
        time: time(),
        description: description()
      };
      setAppointments([...appointments(), newAppointment]);
      setTime('');
      setDescription('');
    }
  };
  
  const DayCell = (day: number) => {
    const date = new Date(currentDate().getFullYear(), currentDate().getMonth(), day);
    const dayAppointments = appointments().filter(appt => appt.date === formatCSTDate(date));
    return (
      <td class={isSelectableDay(date) ? 'selectable' : 'not-in-month'}
          style={{ cursor: isSelectableDay(date) ? 'pointer' : 'default' }}
          onClick={() => {
            if (isSelectableDay(date)) {
              setSelectedDate(date);
            }
          }}>
        {day}
        {dayAppointments.map((appt, index) => (
          <div>
        {appt.time} - {appt.description}
      </div>
    ))}
      </td>
    );
  };



  return (
    <div style={{ "text-align": 'center' }}>
      <select onChange={e => navigateMonth(parseInt(e.currentTarget.value) - currentDate().getMonth())} value={currentDate().getMonth()}>
        {Array.from({ length: 12 }, (_, i) => (
          <option value={i}>{format(new Date(currentDate().getFullYear(), i), 'MMMM')}</option>
        ))}
      </select>
      <table style={{ margin: 'auto' }}>
        <thead>
          <tr>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <th>{day}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, row) => (
            <tr>
              {Array.from({ length: 7 }).map((_, col) => {
                const day = row * 7 + col - startDay() + 1;
                return day < 1 || day > daysInMonth() ? <td></td> : DayCell(day);
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input type="time" value={time()} onInput={(e) => setTime(e.currentTarget.value)} />
        <input type="text" placeholder="Description" value={description()} onInput={(e) => setDescription(e.currentTarget.value)} />
        <button onClick={addAppointment}>Add Appointment</button>
      </div>
    </div>
  );
};

export default Calendar;