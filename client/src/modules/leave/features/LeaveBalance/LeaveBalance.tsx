import React from 'react'
import TableComponent from '../../components/TableComponent';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const sampleColumns = ['ID', 'Name', 'Email', 'Age', 'Country'];
const sampleData = [
    { ID: 1, Name: 'John Doe', Email: 'john.doe@example.com', Age: 28, Country: 'USA' },
    { ID: 2, Name: 'Jane Smith', Email: 'jane.smith@example.com', Age: 34, Country: 'Canada' },
    { ID: 3, Name: 'Michael Brown', Email: 'michael.brown@example.com', Age: 42, Country: 'UK' },
    { ID: 4, Name: 'Emily Davis', Email: 'emily.davis@example.com', Age: 22, Country: 'Australia' },
    { ID: 5, Name: 'David Wilson', Email: 'david.wilson@example.com', Age: 30, Country: 'Germany' },
    { ID: 6, Name: 'Sarah Johnson', Email: 'sarah.johnson@example.com', Age: 26, Country: 'France' },
    { ID: 7, Name: 'Chris Lee', Email: 'chris.lee@example.com', Age: 33, Country: 'South Korea' },
    { ID: 8, Name: 'Emma Taylor', Email: 'emma.taylor@example.com', Age: 29, Country: 'Italy' },
    { ID: 9, Name: 'Noah White', Email: 'noah.white@example.com', Age: 41, Country: 'Brazil' },
    { ID: 10, Name: 'Liam Harris', Email: 'liam.harris@example.com', Age: 25, Country: 'Spain' },
    { ID: 11, Name: 'Olivia Martinez', Email: 'olivia.martinez@example.com', Age: 27, Country: 'Mexico' },
    { ID: 12, Name: 'Ava Thomas', Email: 'ava.thomas@example.com', Age: 31, Country: 'India' },
    { ID: 13, Name: 'Isabella Rodriguez', Email: 'isabella.rodriguez@example.com', Age: 35, Country: 'Argentina' },
    { ID: 14, Name: 'Sophia Scott', Email: 'sophia.scott@example.com', Age: 24, Country: 'Nigeria' },
    { ID: 15, Name: 'Mason Lewis', Email: 'mason.lewis@example.com', Age: 40, Country: 'Russia' },
    { ID: 16, Name: 'Jacob Clark', Email: 'jacob.clark@example.com', Age: 36, Country: 'South Africa' },
    { ID: 17, Name: 'Mia Walker', Email: 'mia.walker@example.com', Age: 32, Country: 'Egypt' },
    { ID: 18, Name: 'Amelia Allen', Email: 'amelia.allen@example.com', Age: 39, Country: 'Turkey' },
    { ID: 19, Name: 'Harper Young', Email: 'harper.young@example.com', Age: 37, Country: 'Japan' },
    { ID: 20, Name: 'Evelyn King', Email: 'evelyn.king@example.com', Age: 38, Country: 'China' },
    { ID: 21, Name: 'Lucas Wright', Email: 'lucas.wright@example.com', Age: 29, Country: 'Thailand' },
    { ID: 22, Name: 'Charlotte Green', Email: 'charlotte.green@example.com', Age: 23, Country: 'New Zealand' },
    { ID: 23, Name: 'William Adams', Email: 'william.adams@example.com', Age: 26, Country: 'Sweden' },
    { ID: 24, Name: 'James Mitchell', Email: 'james.mitchell@example.com', Age: 34, Country: 'Netherlands' },
    { ID: 25, Name: 'Benjamin Perez', Email: 'benjamin.perez@example.com', Age: 28, Country: 'Chile' },
    { ID: 26, Name: 'Elijah Campbell', Email: 'elijah.campbell@example.com', Age: 33, Country: 'Ireland' },
    { ID: 27, Name: 'Mason Hill', Email: 'mason.hill@example.com', Age: 42, Country: 'Portugal' },
    { ID: 28, Name: 'Logan Moore', Email: 'logan.moore@example.com', Age: 31, Country: 'Belgium' },
    { ID: 29, Name: 'Jackson Walker', Email: 'jackson.walker@example.com', Age: 27, Country: 'Greece' },
    { ID: 30, Name: 'Alexander Robinson', Email: 'alexander.robinson@example.com', Age: 30, Country: 'Norway' },
  ];
  

  const actionButtons = (item: any, rowData: any) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => console.log(`Viewing: ${rowData.Email}`)}
        className="p-1 bg-blue-500 text-white rounded-md"
      >
        <FaEye />
      </button>
      <button
        onClick={() => alert(`Deleting: ${rowData.name}`)}
        className="p-1 bg-red-500 text-white rounded-md"
      >
        <FaTrashAlt />
      </button>
    </div>
  );

const LeaveBalance = () => {
  return (
    <>
    <TableComponent
        data={sampleData} // data being passed
        columns={sampleColumns} // columns to display
        // enableFiltering={[false, true, true, true]} // enable filters on the 'name', 'age', and 'city' columns
        enableSorting={[false, true, true, false]} // enable sorting for 'name' and 'age' columns
        enableSearch={true} // enable search functionality
        enableActions={true} // enable action column
        actionButtons={actionButtons} // pass custom action buttons
  
        />
    </>
//    <TableComponent data={sampleData} columns={sampleColumns} enableFiltering={[true, true, false, true, true]}  enableSorting={[true, true]} />
  )
}

export default LeaveBalance