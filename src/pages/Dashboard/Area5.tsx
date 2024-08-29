import React from 'react';
import { Chart, Series } from 'devextreme-react/chart';
import { dataSource } from 'src/components/Dashboard/area-5/data';

function Area5() {
    return (
        <div style={{ width: '100%' }}>
            <Chart id="chart" dataSource={dataSource}>
                <Series
                    valueField="oranges"
                    argumentField="day"
                    name="My oranges"
                    type="bar"
                    color="#ffaa66" />
            </Chart>
        </div>

    );
}

export default Area5;
