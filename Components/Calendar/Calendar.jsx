import Link from "next/link";
import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
//import { INITIAL_EVENTS, createEventId } from './event-utils';

import { useRef } from "react";

const Calendar = ({timeToOpen,timeToClose} ) => {
  //const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    // bind with an arrow function
    //alert(arg.dateStr)
    prompt("hora");
  };

 // let hrOpen = "10:00:00";

  return (
    <div>
     <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        
        dateClick={handleDateClick}
        events={[
          {
            title: "event 1",
            //   date: '2021-12-27',
            //   startTime: '10:45:00',
            //   endTime: '12:45:00'
            start: "2021-12-28T10:30:00",
            end: "2021-12-28T11:30:00",
          },
          {
            title: "event 2",
            //date: '2021-12-27',
            start: "2021-12-28T11:00:00",
            end: "2021-12-28T15:30:00",
          },
        ]}

        headerToolbar={{
          //left: 'prev,next today',
          //left: '',
          start: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}

        contentHeight={650}
        //slotDuration={ '2:00' }//intervalo de  tiempo que se muestra
        //slotMinTime={'08:00:00'}
        hiddenDays= {[ 2, 4] } 
        slotMinTime={timeToOpen}
        slotMaxTime={timeToClose}
        eventDurationEditable={true}
        //eventBackgroundColor="violet" //color por tatuador
        locale={esLocale}
        // businessHours= {{
        //         startTime: '10:00', // a start time (10am in this example)
        //         endTime: '21:00', // an end time (6pm in this example)
        // }}
      />
    </div>
  );
};

export default Calendar;
