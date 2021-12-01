import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';
import '../../../assets/scss/component/calendar.scss';
import ModalAddTask from '../task/ModalAddTask';
import { Label, Section, Task } from '../task/InterfaceTask';
import { projectService } from '../../../services/projects/api';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { taskService } from '../../../services/task/api';
/*
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
*/
const Calendar: React.FC<any> = (props) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isAddEvent, setIsAddEvent] = useState<boolean>(false);
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [events, setEvents] = useState<Array<EventInput>>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    projectService
      .getLabels(projectId)
      .then((res) => {
        setLabels(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.error || 'Lỗi lấy dữ liệu');
      });
  }, []);
  useEffect(() => {
    taskService
      .getTasks(projectId)
      .then((res) => {
        // res.data.data: all sections
        let _events = [];
        res.data.data.forEach((section: Section) => {
          section.tasks.forEach((task: Task) => {
            _events.push({
              id: task._id,
              title: task.name,
              start: task.dueDate.from.toString().replace(/T.*$/, ''),
              end: task.dueDate.to.toString().replace(/T.*$/, ''),
            });
          });
        });
        setEvents(_events);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  }, []);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    setIsShow(true);
    setIsAddEvent(true);
  };
  // const handleWeekendsToggle = () => {
  //   setWeekendsVisible(!weekendsVisible);
  // };
  // const renderSidebar = () => {
  //   return (
  //     <div className="calendar-sidebar">
  //       <div className="calendar-sidebar-section">
  //         <label>
  //           <input
  //             type="checkbox"
  //             checked={weekendsVisible}
  //             onChange={handleWeekendsToggle}></input>
  //           toggle weekends
  //         </label>
  //       </div>
  //       <div className="calendar-sidebar-section">
  //         <h2>All Events ({currentEvents.length})</h2>
  //         <ul>{currentEvents.map(renderSidebarEvent)}</ul>
  //       </div>
  //     </div>
  //   );
  // };
  // const renderSidebarEvent = (event: EventApi) => {
  //   return (
  //     <li key={event.id}>
  //       <b>
  //         {formatDate(event.start!, {
  //           year: 'numeric',
  //           month: 'short',
  //           day: 'numeric',
  //         })}
  //       </b>
  //       <i>{event.title}</i>
  //     </li>
  //   );
  // };
  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo);
    setIsShow(true);
    setIsAddEvent(false);
  };
  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };
  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };
  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'title',
          right: 'prev,next today,dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        events={events}
        // initialEvents={getEvents()} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
      />
      <ModalAddTask
        show={isShow}
        isAddEvent={isAddEvent}
        callBack={() => {
          setIsShow(false);
        }}
        labels={{
          data: labels,
          setData: (labels) => {
            setLabels(labels);
          },
        }}
      />
    </div>
  );
};
export default Calendar;
