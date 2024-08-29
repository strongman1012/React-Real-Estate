import React from 'react';

import Scheduler, { Resource, SchedulerTypes } from 'devextreme-react/scheduler';

import { data, resourcesData, priorityData } from 'src/components/Dashboard/area-3/data';

const currentDate = new Date(2021, 1, 2);
const views: SchedulerTypes.ViewType[] = ['timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth'];
const groups = ['priority'];

const Area3 = () => (
    <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="timelineMonth"
        defaultCurrentDate={currentDate}
        height={580}
        groups={groups}
        cellDuration={60}
        firstDayOfWeek={0}
        startDayHour={8}
        endDayHour={20}
    >
        <Resource
            fieldExpr="ownerId"
            allowMultiple={true}
            dataSource={resourcesData}
            label="Owner"
            useColorAsDefault={true}
        />
        <Resource
            fieldExpr="priority"
            allowMultiple={false}
            dataSource={priorityData}
            label="Priority"
        />
    </Scheduler>
);

export default Area3;
