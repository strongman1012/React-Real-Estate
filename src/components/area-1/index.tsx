import React from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { customers } from './data';

interface Customer {
    ID: number;
    CompanyName: string;
    City: string;
    State: string;
    Phone: string;
    Fax: string;
}

// Define the columns as a string array
const columns: (keyof Customer)[] = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];

const Area1: React.FC = () => (
    <DataGrid
        dataSource={customers}
        keyExpr="ID"
        showBorders={true}
    >
        {columns.map((column) => (
            <Column dataField={column} key={column} />
        ))}
    </DataGrid>
);

export default Area1;
