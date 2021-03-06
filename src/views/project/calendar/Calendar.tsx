/* eslint-disable react-hooks/exhaustive-deps */
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';
import '../../../assets/scss/component/calendar.scss';
import { Label, Section, Task } from '../task/InterfaceTask';
import { projectService } from '../../../services/projects/api';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { taskService } from '../../../services/task/api';
import ModalEditTaskCalendar from './ModalEditTaskCalendar';
import ModalAddTaskCalendar from './ModalAddTaskCalendar';
import WrapperUpgrade, { Role } from '../wrapperUpgrade/WrapperUpgrade';

const Calendar: React.FC<any> = (props) => {
  const { params } = useRouteMatch();
  const { projectId } = params as any;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [events, setEvents] = useState<Array<EventInput>>([]);
  const [taskCurrent, setTaskCurrent] = useState<Task>(null);
  const [dataTasks, setDataTasks] = useState<Array<Section>>([]);
  const [dateSelect, setDateSelect] = useState<{
    from: string;
    to: string;
  }>({
    from: new Date().toJSON(),
    to: new Date().toJSON(),
  });
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
        setDataTasks(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  }, []);
  useEffect(() => {
    let _events = [];
    dataTasks.forEach((section: Section) => {
      section.tasks.forEach((task: Task) => {
        _events.push({
          id: task._id,
          title: task.name,
          start: task.dueDate.from.toString(),
          end: task.dueDate.to.toString(),
          dataTask: task,
        });
      });
    });
    setEvents(_events);
  }, [dataTasks]);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // add Task
    let from = new Date(selectInfo.start);
    let to = new Date(selectInfo.end);
    to.setDate(to.getDate() - 1);
    to.setHours(23);
    setDateSelect({
      from: from.toJSON(),
      to: to.toJSON(),
    });
    setIsShowAdd(true);
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo.event._def.extendedProps.dataTask) {
      setTaskCurrent(clickInfo.event._def.extendedProps.dataTask);
      setIsShow(true);
    } else {
      setDateSelect({
        from: new Date(clickInfo.event.start).toJSON(),
        to: new Date(clickInfo.event.end).toJSON(),
      });
      setTaskCurrent(null);
      setIsShowAdd(true);
    }
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
    <WrapperUpgrade roleRequire={Role.MemberPlus}>
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
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
        <ModalEditTaskCalendar
          projectId={projectId}
          show={{
            status: isShow,
            setStatus: (value) => {
              setIsShow(value);
              setTaskCurrent(null);
            },
          }}
          dataTasks={{
            data: dataTasks,
            setData: (data) => setDataTasks(data),
          }}
          labels={{
            data: labels,
            setData: (labels) => setLabels(labels),
          }}
          task={taskCurrent}
        />
        <ModalAddTaskCalendar
          dataTasks={{
            data: dataTasks,
            setData: (data) => {
              setDataTasks(data);
            },
          }}
          labels={{
            data: labels,
            setData: (labels) => setLabels(labels),
          }}
          projectId={projectId}
          show={{
            status: isShowAdd,
            setStatus: (status) => {
              setIsShowAdd(status);
            },
          }}
          dueDate={dateSelect}
        />
      </div>
    </WrapperUpgrade>
  );
};
export default Calendar;
