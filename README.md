# Jira Software clone
Jira Software made using MERN Stack and demo http://www.easycode.cf/
## Techical Stack
- MERN : MongoDB, Express, React và Node
- JWT
- Socket.io
- Docker and Docker-compose
- ...
### Features
- Register and Login
    - JWT Authentication to connect React
    - Can login with username or email
- Projects (Teams)
    - Create Projects
    - Invite members to join projects
    - Create and assign task for members
    - Statistics of task efficiency by chart
    - Train members in the project by blog or video
    - View job details and work schedule for each member
    - Chat and discussion for each project and member
    - Change member access level - Admin or Normal
        - Admin can edit project details, invite new members, and change other members' access levels.
- Boards 
    - Create personal boards or project boards
    - View boards or calendar or timeline
    - Recently Viewed Boards and 
    - Starred Boards
    - Create and reorder lists
    - Create, reorder, and change list of cards
        - Add labels to cards
        - Assign members to cards
        - Add attachments to cards
        - Add comments to cards
- Notifications
    - When someone assigns you to a card
    - When someone comments on a card you're assigned to
    - When you're invited to a project
    - When someone makes you admin of a project
- Chats 
    - Chat by project or anyone
    - real-time using Socket.io
## Getting Started
1. Install docker and docker-compose
2. Clone the repo
```
$ git clone https://github.com/Haidang124/qlda-server
$ cd qlda-server
```
3. Run
$ docker-compose up -d
## Screenshots
- Create Project
    ![Create Project](https://res.cloudinary.com/vnu-uet/image/upload/v1655030500/qlda/create-project_us8owr.png)
- Member
    ![Member Project](https://res.cloudinary.com/vnu-uet/image/upload/v1655030500/qlda/member-project_kogo38.png)
- Board
    ![Board Task](https://res.cloudinary.com/vnu-uet/image/upload/v1655030501/qlda/board-task_eivoeh.png)
- Timeline
    ![Timeline Task](https://res.cloudinary.com/vnu-uet/image/upload/v1655030501/qlda/timeline-task_ylfqxo.png)
- Analysis
    ![Analysis](https://res.cloudinary.com/vnu-uet/image/upload/v1655030501/qlda/analysis-member_m2jhmb.png)
- Discuss
    ![Discuss](https://res.cloudinary.com/vnu-uet/image/upload/v1655030500/qlda/disscus_iedkda.png)
- Chat
    ![Chat](https://res.cloudinary.com/vnu-uet/image/upload/v1655030500/qlda/chat_uwyror.png)
- Notification
    ![Notification](https://res.cloudinary.com/vnu-uet/image/upload/v1655030501/qlda/noti_kuemge.png)
- Trainning
    ![Trainning](https://res.cloudinary.com/vnu-uet/image/upload/v1655030502/qlda/trainning_duwuvh.png)
