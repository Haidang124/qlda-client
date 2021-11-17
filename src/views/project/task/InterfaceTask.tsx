export enum Priority { // độ ưu tiên
  null, // không có
  low, // thấp
  medium, // trung bình
  high, // cao
}

export enum Status { // trạng thái
  null, // không có
  onTrack, // theo dõi
  atRisk, // gặp rủi ro
  offTrack, // đi chệch hướng
}

export interface Task {
  _id: string;
  sectionId: string;
  name: string;
  assignment: Array<{
    id: string;
    userName: string;
    avatar: string;
  }>;
  dueDate: {
    // one day: from: null, to: Date
    from: Date; // null || Date
    to: Date; // null || Date
  };
  dependenciesTask: Task;
  priority: Priority;
  status: Status;
  isDone: boolean;
  description: string;
  subTask: Array<Task>;
  authorId: {
    _id: string;
    email: string;
    username: string;
    avatar: string;
  };
  created: Date;
  modifined: Date;
}

export interface Section {
  _id: string;
  name: string;
  authorId: {
    avatar: string;
    projectId: string;
    createdAt: Date;
  };
  tasks: Array<Task>;
  projectId: string;
}

export const getPriority = (
  priority: Priority,
): {
  name: string;
  style: any;
} => {
  switch (priority) {
    case Priority.null:
      return {
        name: null,
        style: {
          color: null,
          backgroundColor: null,
        },
      };
    case Priority.low:
      return {
        name: 'Low',
        style: {
          color: '#1c1c1c',
          backgroundColor: '#48DAFD',
        },
      };
    case Priority.medium:
      return {
        name: 'Medium',
        style: {
          color: '#1c1c1c',
          backgroundColor: '#FFA800',
        },
      };
    case Priority.high:
      return {
        name: 'High',
        style: {
          color: '#1c1c1c',
          backgroundColor: '#9F46E4',
        },
      };
    default:
      return {
        name: null,
        style: {
          color: null,
          backgroundColor: null,
        },
      };
  }
};

export const getStatus = (
  status: Status,
): {
  name: string;
  style: any;
} => {
  switch (status) {
    case Status.null:
      return {
        name: null,
        style: {},
      };
    case Status.atRisk:
      return {
        name: 'At risk',
        style: {
          color: '#1c1c1c',
          backgroundColor: '#FFD100',
        },
      };
    case Status.offTrack:
      return {
        name: 'Off track',
        style: {
          color: '#1c1c1c',
          backgroundColor: '#FB5779',
        },
      };
    case Status.onTrack:
      return {
        name: 'On track',
        style: {
          color: '#1c1c1c',
          backgroundColor: '#00D4C8',
        },
      };
  }
};
