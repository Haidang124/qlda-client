import { Priority, Status } from '../InterfaceTask';

export const data = {
  typeTask: [
    'id-list-task-1',
    'id-list-task-2',
    'id-list-task-3',
    'id-list-task-4',
  ],
  'id-list-task-1': {
    id: 'id-list-task-1',
    name: 'List tasks 1',
    listTasks: [
      {
        id: 'id-task-1',
        taskName: 'Task 1',
        assignee: [
          {
            id: 'user-id-2',
            userName: 'User 2',
            avatar:
              'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
          },
          {
            id: 'user-id-3',
            userName: 'User 3',
            avatar:
              'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
          },
        ],
        dueDate: {
          from: new Date('2021-1-19'),
          to: new Date('2021-2-1'),
        },
        dependencies: ['id-task-3'],
        priority: Priority.low,
        status: Status.offTrack,
        isDone: true,
        description: 'Đây là task 1',
        subTask: [],
        creator: {
          id: 'user-id-1',
          userName: 'User 1',
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
        },
        created: new Date('2021-1-10'),
        modifined: new Date('2021-1-11'),
      },
      {
        id: 'id-task-4',
        taskName: 'Task 4',
        assignee: [
          // {
          //   id: 'user-id-2',
          //   userName: 'User 2',
          //   avatar:
          //     'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
          // },
          // {
          //   id: 'user-id-3',
          //   userName: 'User 3',
          //   avatar:
          //     'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
          // },
        ],
        dueDate: {
          from: new Date('2021-1-19'),
          to: new Date('2021-2-1'),
        },
        dependencies: [],
        priority: Priority.high,
        status: Status.onTrack,
        isDone: false,
        description: 'Đây là task 4',
        subTask: [
          {
            id: 'id-task-2',
            taskName: 'Task 2',
            assignee: [
              {
                id: 'user-id-1',
                userName: 'User 1',
                avatar:
                  'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
              },
              {
                id: 'user-id-3',
                userName: 'User 3',
                avatar:
                  'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
              },
            ],
            dueDate: {
              from: new Date('2021-2-19'),
              to: new Date('2021-3-1'),
            },
            dependencies: ['id-task-3'],
            priority: Priority.medium,
            status: Status.atRisk,
            isDone: false,
            description: 'Đây là task 2',
            subTask: [],
            creator: {
              id: 'user-id-2',
              userName: 'User 2',
              avatar:
                'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
            },
            created: new Date('2021-2-10'),
            modifined: new Date('2021-2-11'),
          },
        ],
        creator: {
          id: 'user-id-1',
          userName: 'User 1',
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-avatar-de-thuong.jpg',
        },
        created: new Date('2021-1-10'),
        modifined: new Date('2021-1-11'),
      },
    ],
  },
  'id-list-task-2': {
    id: 'id-list-task-2',
    name: 'List tasks 2',
    listTasks: [],
  },
  'id-list-task-3': {
    id: 'id-list-task-3',
    name: 'List tasks 3',
    listTasks: [],
  },
  'id-list-task-4': {
    id: 'id-list-task-3',
    name: 'List tasks 3',
    listTasks: [],
  },
};
