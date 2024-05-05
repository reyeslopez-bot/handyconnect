import { createSignal } from 'solid-js';
import { format, addMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { toZonedTime, format as tzFormat } from 'date-fns-tz';
import './Calendar.module.css';

interface Appointment {
  date: string;
  time: string;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = createSignal(new Date());
  const [appointments, setAppointments] = createSignal<Appointment[]>([]);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selectedDate, setSelectedDate] = createSignal<Date | null>(null);
  const [time, setTime] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [isEditing, setIsEditing] = createSignal(false);
  const [appointmentToEdit, setAppointmentToEdit] = createSignal<Appointment | null>(null);

  const daysInMonth = () => new Date(currentDate().getFullYear(), currentDate().getMonth() + 1, 0).getDate();
  const startDay = () => new Date(currentDate().getFullYear(), currentDate().getMonth(), 1).getDay();

  const generateTimeSlots = () => {
    let times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return times;
  };

  const navigateMonth = (increment: number) => {
    const newDate = addMonths(currentDate(), increment);
    setCurrentDate(startOfMonth(newDate));
  };

  const formatCSTDate = (date: Date | null) => {
    if (date === null) {
      return ''; // or some other default or error handling
    }
    const zonedDate = toZonedTime(date, timezone);
    return tzFormat(zonedDate, 'yyyy-MM-dd', { timeZone: timezone });
  };

  const addAppointment = () => {
    if (!time() || !description() || selectedDate() === null) {
      alert("Please fill out all appointment details before adding.");
      return;
    }
    const newAppointment = {
      date: formatCSTDate(selectedDate()!),
      time: time(),
      description: description()
    };
    setAppointments(currentAppointments => [...currentAppointments, newAppointment]);
    setTime('');
    setDescription('');
    setSelectedDate(null); // Reset after adding
  };  

  const editAppointment = (appointment: Appointment) => {
    setAppointmentToEdit(appointment);
    setIsEditing(true);
    setSelectedDate(new Date(appointment.date));
    setTime(appointment.time);
    setDescription(appointment.description);
  };

  const saveAppointment = () => {
    if (appointmentToEdit()) {
      const updatedAppointments = appointments().map(appt =>
        appt.date === appointmentToEdit()!.date && appt.time === appointmentToEdit()!.time ? appointmentToEdit()! : appt
      );
      setAppointments(updatedAppointments);
      setIsEditing(false);
      setAppointmentToEdit(null);
      setTime('');
      setDescription('');
      setSelectedDate(null); // Optional: Reset after saving
    }
  };

  const timeOptions = generateTimeSlots();

  const deleteAppointment = (appointment: Appointment, event: MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    if (confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments().filter(appt => 
        !(appt.date === appointment.date && appt.time === appointment.time)
      ));
    }
  };
  const DayCell = (day: number) => {
    const date = new Date(currentDate().getFullYear(), currentDate().getMonth(), day);
    const dayAppointments = appointments().filter(appt => appt.date === formatCSTDate(date));
    const isSelected = selectedDate() && formatCSTDate(date) === formatCSTDate(selectedDate());
  
    const cellClass = () => {
      const classes = ['not-in-month']; // Start with default class
      if (isWithinInterval(date, { start: startOfMonth(currentDate()), end: endOfMonth(currentDate()) })) {
        classes[0] = 'selectable'; // Replace 'not-in-month' with 'selectable' if within the current month
      }
      if (isSelected) {
        classes.push('activated'); // Add 'activated' class if the day is selected
      }
      return classes.join(' ');
    };
  
    return (
      <td class={cellClass()} onClick={() => setSelectedDate(new Date(currentDate().getFullYear(), currentDate().getMonth(), day))}>
        {day}
        {/* Map over appointments and display each one */}
        {appointments().filter(appt => appt.date === formatCSTDate(new Date(currentDate().getFullYear(), currentDate().getMonth(), day))).map((appt) => (
          <div key={`${appt.date}-${appt.time}`}>
            {appt.time} - {appt.description}
            <button onClick={(e) => { e.stopPropagation(); editAppointment(appt); }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); deleteAppointment(appt, e); }}>Delete</button>
          </div>
        ))}
      </td>
    );
  };

  return (
    <div style={{ "text-align": 'center' }}>
      {/* Month navigation */}
      <select onChange={(e) => navigateMonth(parseInt(e.currentTarget.value) - currentDate().getMonth())} value={currentDate().getMonth()}>
        {Array.from({ length: 12 }, (_, i) => (
          <option value={i}>{format(new Date(currentDate().getFullYear(), i), 'MMMM')}</option>
        ))}
      </select>

      {/* Calendar grid */}
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

      {/* Appointment form */}
      <div style={{ margin: 'auto', width: '90%', "max-width": '500px' }}>
        <select value={time()} onChange={(e) => setTime(e.currentTarget.value)}>
          {generateTimeSlots().map(t => (
            <option value={t}>{t}</option>
          ))}
        </select>
        <select value={description()} onChange={(e) => setDescription(e.currentTarget.value)}>
          <option value="">Select a reason...</option>
          <option value="Consultation">Consultation</option>
          <option value="Routine Check">Routine Check</option>
          <option value="Emergency">Emergency</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Other">Other</option>
        </select>
        {isEditing() ? (
          <button onClick={saveAppointment}>Save Changes</button>
        ) : (
          <button onClick={addAppointment}>Add Appointment</button>
        )}
      </div>
    </div>
  );
};

export default Calendar;