// // TableComponent.tsx
// import React, { useState, useEffect } from 'react';
// import { FaFilter, FaSearch, FaTrashAlt, FaEye } from 'react-icons/fa';
// import { HiSortAscending, HiSortDescending } from 'react-icons/hi';


// interface TableComponentProps {
//   data: any[];
//   columns: string[];
//   enableFiltering?: boolean[];
//   enableSearch?: boolean;
//   enableSorting?: boolean[];
//   enableActions?: boolean;
//   actionButtons?: (item: any, rowData: any) => JSX.Element; // Added rowData to the prop
//   stickyColumns?: string[]; // Define which columns are sticky
// }

// const TableComponent: React.FC<TableComponentProps> = ({
//   data,
//   columns,
//   enableFiltering = [],
//   enableSearch = true,
//   enableSorting = [],
//   enableActions = false,
//   actionButtons,
//   stickyColumns = [], // No sticky columns by default
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState(''); // For search column
//   const [filteredData, setFilteredData] = useState(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | '' }>({ key: '', direction: '' });
//   const [filterInputs, setFilterInputs] = useState<{ [key: string]: string }>({}); // Filter input for each column
//   const [showFilter, setShowFilter] = useState<{ [key: string]: boolean }>({}); // Control filter field visibility
//   const [manualPageInput, setManualPageInput] = useState(currentPage.toString()); // To fix the page input issue

//   useEffect(() => {
//     setFilteredData(data); // Reset when data changes
//   }, [data]);

//   useEffect(() => {
//     setManualPageInput(currentPage.toString());
//   }, [currentPage]);

//   // Toggle filter input visibility
//   const toggleFilter = (column: string) => {
//     setShowFilter((prev) => ({
//       ...prev,
//       [column]: !prev[column], // Toggle visibility for this column
//     }));
//   };

//   // Handle search input
//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);
//     filterData(term);
//   };

//   // Filter data based on search term
//   const filterData = (term: string) => {
//     setFilteredData(
//       data.filter((item) =>
//         columns.some((column) =>
//           selectedColumn
//             ? String(item[selectedColumn]).toLowerCase().includes(term)
//             : String(item[column]).toLowerCase().includes(term)
//         )
//       )
//     );
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Handle column filter
//   const handleColumnFilter = (event: React.ChangeEvent<HTMLInputElement>, column: string) => {
//     const term = event.target.value.toLowerCase();
//     setFilterInputs({ ...filterInputs, [column]: term });
//     setFilteredData(
//       data.filter((item) =>
//         String(item[column]).toLowerCase().includes(term)
//       )
//     );
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Handle sorting for columns
//   const handleSort = (column: string) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === column && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     const sortedData = [...filteredData].sort((a, b) => {
//       if (a[column] < b[column]) {
//         return direction === 'asc' ? -1 : 1;
//       }
//       if (a[column] > b[column]) {
//         return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//     setFilteredData(sortedData);
//     setSortConfig({ key: column, direction });
//   };

//   // Handle page change via buttons
//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredData.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   // Handle manual page input change
//   const handleManualPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setManualPageInput(value); // Update input value
//     const page = Number(value);
//     if (!isNaN(page) && page > 0 && page <= Math.ceil(filteredData.length / rowsPerPage)) {
//       setCurrentPage(page);
//     }
//   };

//   // Handle changing the rows per page
//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Sticky column logic
//   const isSticky = (column: string) => stickyColumns.includes(column);

//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   return (
//     <div className="p-4 bg-white border border-gray-300 rounded-md shadow-sm">
//       {enableSearch && (
//         <div className="flex mb-4 items-center">
//           {/* Column selection dropdown */}
//           <select
//             value={selectedColumn}
//             onChange={(e) => setSelectedColumn(e.target.value)}
//             className="mr-2 p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Columns</option>
//             {columns.map((col, index) => (
//               <option key={index} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>

//           {/* Search input */}
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="p-2 border border-gray-300 rounded-md flex-grow shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <FaSearch className="ml-2 text-gray-500" />
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
//           <thead className="bg-gray-100 text-sm font-semibold uppercase">
//             <tr>
//               {columns.map((column, index) => (
//                 <th
//                   key={column}
//                   className={`py-2 px-4 border-b border-gray-300 text-left ${
//                     isSticky(column) ? 'sticky bg-gray-100 z-10' : ''
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     {column}
//                     <div className="ml-2 flex items-center space-x-2">
//                       {enableSorting[index] && (
//                         <>
//                           {sortConfig.key === column && sortConfig.direction === 'asc' ? (
//                             <HiSortAscending
//                               className="cursor-pointer text-blue-500"
//                               onClick={() => handleSort(column)}
//                             />
//                           ) : (
//                             <HiSortDescending
//                               className="cursor-pointer text-gray-500"
//                               onClick={() => handleSort(column)}
//                             />
//                           )}
//                         </>
//                       )}
//                       {enableFiltering[index] && (
//                         <FaFilter
//                           className="cursor-pointer text-gray-500"
//                           onClick={() => toggleFilter(column)}
//                         />
//                       )}
//                       {/* Display filter input when icon clicked */}
//                       {showFilter[column] && (
//                         <div className="absolute mt-1 bg-white border border-gray-300 shadow-lg p-2">
//                           <input
//                             type="text"
//                             value={filterInputs[column] || ''}
//                             onChange={(e) => handleColumnFilter(e, column)}
//                             placeholder={`Filter ${column}`}
//                             className="p-1 border border-gray-300 rounded-md w-full"
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </th>
//               ))}

//               {/* Actions Column */}
//               {enableActions && (
//                 <th className="py-2 px-4 border-b border-gray-300 sticky right-0 bg-gray-100 z-10 text-left">
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, index) => (
//               <tr key={index}>
//                 {columns.map((column, colIndex) => (
//                   <td
//                     key={column}
//                     className={`py-2 px-4 border-b border-gray-300 ${
//                       isSticky(column) ? 'sticky bg-white z-10' : ''
//                     }`}
//                   >
//                     {item[column]}
//                   </td>
//                 ))}

//                 {/* Render action buttons for each row if actions enabled */}
//                 {enableActions && (
//                   <td className="py-2 px-4 border-b border-gray-300 sticky right-0 bg-white z-10">
//                     {actionButtons && actionButtons(item, item)} {/* Pass rowData as the second param */}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center space-x-4">
//         <div className="flex items-center">
//           Rows per page:
//           <select onChange={handleRowsPerPageChange} value={rowsPerPage} className="ml-2 p-1 border border-gray-300 rounded">
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//         </div>
//         <div className="flex items-center space-x-2">
//           {/* Pagination controls */}
//           <button
//             onClick={() => handlePageChange(1)} // Skip to first page
//             disabled={currentPage === 1}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             First
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             Previous
//           </button>
//           <span>
//             Page{' '}
//             <input
//               type="number"
//               value={manualPageInput}
//               onChange={handleManualPageChange}
//               className="w-12 p-1 border border-gray-300 rounded"
//             />{' '}
//             of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             Next
//           </button>
//           <button
//             onClick={() => handlePageChange(totalPages)} // Skip to last page
//             disabled={currentPage === totalPages}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             Last
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;


// // TableComponent.tsx
// import React, { useState, useEffect,useRef } from 'react';
// import { FaFilter, FaSearch } from 'react-icons/fa';
// import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

// interface TableComponentProps {
//   data: any[];
//   columns: string[];
//   enableFiltering?: boolean[];
//   enableSearch?: boolean;
//   enableSorting?: boolean[];
//   enableActions?: boolean;
//   actionButtons?: (item: any, rowData: any) => JSX.Element;
//   stickyColumns?: string[]; // Define which columns are sticky
// }

// const TableComponent: React.FC<TableComponentProps> = ({
//   data,
//   columns,
//   enableFiltering = [],
//   enableSearch = true,
//   enableSorting = [],
//   enableActions = false,
//   actionButtons,
//   stickyColumns = [],
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [filteredData, setFilteredData] = useState(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | '' }>({ key: '', direction: '' });
//   const [filterInputs, setFilterInputs] = useState<{ [key: string]: string }>({});
//   const [showFilter, setShowFilter] = useState<{ [key: string]: boolean }>({});
//   const [manualPageInput, setManualPageInput] = useState(currentPage.toString());

//   useEffect(() => {
//     setFilteredData(data); // Reset when data changes
//   }, [data]);

//   useEffect(() => {
//     setManualPageInput(currentPage.toString());
//   }, [currentPage]);

//   // Sticky column logic
//   const isSticky = (column: string) => stickyColumns.includes(column);
  
//   // Function to dynamically get the actual width of previous sticky columns

//   // Get the calculated `left` value for each sticky column based on its index and previous sticky column widths
//   const getStickyLeft = (columnIndex: number) => {
//     let left = 0;
//     for (let i = 0; i < columnIndex; i++) {
//       if (isSticky(columns[i])) {
//         // Adjust this width to match your actual column width (you may want to calculate dynamically)
//         left += 120; // Assuming each column width is about 120px
//       }
//     }
//     return left;
//   };

//   const toggleFilter = (column: string) => {
//     setShowFilter((prev) => ({
//       ...prev,
//       [column]: !prev[column],
//     }));
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);
//     filterData(term);
//   };

//   const filterData = (term: string) => {
//     setFilteredData(
//       data.filter((item) =>
//         columns.some((column) =>
//           selectedColumn
//             ? String(item[selectedColumn]).toLowerCase().includes(term)
//             : String(item[column]).toLowerCase().includes(term)
//         )
//       )
//     );
//     setCurrentPage(1);
//   };

//   const handleColumnFilter = (event: React.ChangeEvent<HTMLInputElement>, column: string) => {
//     const term = event.target.value.toLowerCase();
//     setFilterInputs({ ...filterInputs, [column]: term });
//     setFilteredData(
//       data.filter((item) =>
//         String(item[column]).toLowerCase().includes(term)
//       )
//     );
//     setCurrentPage(1);
//   };

//   const handleSort = (column: string) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig.key === column && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     const sortedData = [...filteredData].sort((a, b) => {
//       if (a[column] < b[column]) {
//         return direction === 'asc' ? -1 : 1;
//       }
//       if (a[column] > b[column]) {
//         return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//     setFilteredData(sortedData);
//     setSortConfig({ key: column, direction });
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredData.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleManualPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setManualPageInput(value);
//     const page = Number(value);
//     if (!isNaN(page) && page > 0 && page <= Math.ceil(filteredData.length / rowsPerPage)) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   return (
//     <div className="p-4 bg-white border border-gray-300 rounded-md shadow-sm">
//       {enableSearch && (
//         <div className="flex mb-4 items-center">
//           <select
//             value={selectedColumn}
//             onChange={(e) => setSelectedColumn(e.target.value)}
//             className="mr-2 p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All Columns</option>
//             {columns.map((col, index) => (
//               <option key={index} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="p-2 border border-gray-300 rounded-md flex-grow shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <FaSearch className="ml-2 text-gray-500" />
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-md">
//           <thead className="bg-gray-100 text-sm font-semibold uppercase">
//             <tr>
//               {columns.map((column, index) => (
//                 <th
//                   key={column}
                 
//                   className={`py-2 px-4 border-b border-gray-300 text-left ${
//                     isSticky(column) ? 'sticky bg-grey-100 z-20' : ''
//                   }`}
//                   style={isSticky(column) ? { left: `${getStickyLeft(index)}px` } : {}} // Adjust the `left` dynamically
               
//                 >
//                   <div className="flex items-center">
//                     {column}
//                     <div className="ml-2 flex items-center space-x-2 relative">
//                       {enableSorting[index] && (
//                         <>
//                           {sortConfig.key === column && sortConfig.direction === 'asc' ? (
//                             <HiSortAscending
//                               className="cursor-pointer text-blue-500"
//                               onClick={() => handleSort(column)}
//                             />
//                           ) : (
//                             <HiSortDescending
//                               className="cursor-pointer text-gray-500"
//                               onClick={() => handleSort(column)}
//                             />
//                           )}
//                         </>
//                       )}
//                       {enableFiltering[index] && (
//                         <>
//                           <FaFilter
//                             className="cursor-pointer text-gray-500"
//                             onClick={() => toggleFilter(column)}
//                           />
//                           {/* Display filter input when icon clicked */}
//                           {showFilter[column] && (
//                             <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 shadow-lg p-2 z-30">
//                               <input
//                                 type="text"
//                                 value={filterInputs[column] || ''}
//                                 onChange={(e) => handleColumnFilter(e, column)}
//                                 placeholder={`Filter ${column}`}
//                                 className="p-1 border border-gray-300 rounded-md w-40" // Increased width of input
//                               />
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </th>
//               ))}

//               {enableActions && (
//                 <th className="py-2 px-4 border-b border-gray-300 sticky right-0 bg-gray-100 z-20">
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, index) => (
//               <tr key={index}>
//                 {columns.map((column, colIndex) => (
//                   <td
//                     key={column}
//                     className={`py-2 px-4 border-b border-gray-300 ${
//                       isSticky(column) ? `sticky bg-white z-10 outline-dashed` : ''
//                     }`}
//                     style={isSticky(column) ? { left: `${getStickyLeft(colIndex)}px` } : {}}
                 
//                   >
//                     {item[column]}
//                   </td>
//                 ))}

//                 {enableActions && (
//                   <td className="py-2 px-4 border-b border-gray-300 sticky right-0 bg-white z-10">
//                     {actionButtons && actionButtons(item, item)}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center space-x-4">
//         <div className="flex items-center">
//           Rows per page:
//           <select onChange={handleRowsPerPageChange} value={rowsPerPage} className="ml-2 p-1 border border-gray-300 rounded">
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handlePageChange(1)}
//             disabled={currentPage === 1}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             First
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             Previous
//           </button>
//           <span>
//             Page{' '}
//             <input
//               type="number"
//               value={manualPageInput}
//               onChange={handleManualPageChange}
//               className="w-12 p-1 border border-gray-300 rounded"
//             />{' '}
//             of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             Next
//           </button>
//           <button
//             onClick={() => handlePageChange(totalPages)}
//             disabled={currentPage === totalPages}
//             className="p-1 border border-gray-300 rounded disabled:bg-gray-200"
//           >
//             Last
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;


// ========================================================

// TableComponent.tsx
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch,FaChevronLeft, FaChevronRight, FaStepBackward, FaStepForward  } from 'react-icons/fa';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

interface TableComponentProps {
  data: any[];
  columns: string[];
  enableFiltering?: boolean[];
  enableSearch?: boolean;
  enableSorting?: boolean[];
  enableActions?: boolean;
  actionButtons?: (item: any, rowData: any) => JSX.Element;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
  enableFiltering = [],
  enableSearch = false,
  enableSorting = [],
  enableActions = false,
  actionButtons,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | '' }>({
    key: '',
    direction: '',
  });
  const [filterInputs, setFilterInputs] = useState<{ [key: string]: string }>({});
  const [showFilter, setShowFilter] = useState<{ [key: string]: boolean }>({});
  const [manualPageInput, setManualPageInput] = useState(currentPage.toString());

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setManualPageInput(currentPage.toString());
  }, [currentPage]);

  const toggleFilter = (column: string) => {
    setShowFilter((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term);
  };

  const filterData = (term: string) => {
    setFilteredData(
      data.filter((item) =>
        columns.some((column) =>
          selectedColumn
            ? String(item[selectedColumn]).toLowerCase().includes(term)
            : String(item[column]).toLowerCase().includes(term)
        )
      )
    );
    setCurrentPage(1);
  };

  const handleColumnFilter = (event: React.ChangeEvent<HTMLInputElement>, column: string) => {
    const term = event.target.value.toLowerCase();
    setFilterInputs({ ...filterInputs, [column]: term });
    setFilteredData(data.filter((item) => String(item[column]).toLowerCase().includes(term)));
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortConfig({ key: column, direction });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleManualPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setManualPageInput(value);
    const page = Number(value);
    if (!isNaN(page) && page > 0 && page <= Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div style={{ padding: '1rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' }}>
      {enableSearch && (
        <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            style={{ marginRight: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">All Columns</option>
            {columns.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              flexGrow: 1,
              boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
            }}
          />
          <FaSearch style={{ marginLeft: '0.5rem', color: '#888' }} />
        </div>
      )}

      <div className="relative overflow-y-auto">
        <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse' }}>
          {/* <thead style={{ backgroundColor: '#f9f9f9', textAlign: 'left', fontWeight: 'bold' }}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column}
                  style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid #ddd',
                    position: index === 0 || (enableActions && index === columns.length - 1) ? 'sticky' : undefined,
                    left: index === 0 ? 0 : undefined,
                    right: enableActions && index === columns.length - 1 ? 0 : undefined,
                    backgroundColor: '#fff',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {column}
                    <div style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', position: 'relative' }}>
                      {enableSorting[index] && (
                        <>
                          {sortConfig.key === column && sortConfig.direction === 'asc' ? (
                            <HiSortAscending
                              style={{ cursor: 'pointer', color: '#007bff' }}
                              onClick={() => handleSort(column)}
                            />
                          ) : (
                            <HiSortDescending
                              style={{ cursor: 'pointer', color: '#888' }}
                              onClick={() => handleSort(column)}
                            />
                          )}
                        </>
                      )}
                      {enableFiltering[index] && (
                        <>
                          <FaFilter
                            style={{ cursor: 'pointer', color: '#888', marginLeft: '0.5rem' }}
                            onClick={() => toggleFilter(column)}
                          />
                          {showFilter[column] && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              marginTop: '0.5rem',
                              backgroundColor: '#fff',
                              border: '1px solid #ccc',
                              boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                              padding: '0.5rem',
                              zIndex: 10,
                              width: '150px',
                            }}>
                              <input
                                type="text"
                                value={filterInputs[column] || ''}
                                onChange={(e) => handleColumnFilter(e, column)}
                                placeholder={`Filter ${column}`}
                                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </th>
              ))}
              {enableActions && (
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', position: 'sticky', right: 0, backgroundColor: '#f9f9f9', zIndex: 2 }}>
                  Actions
                </th>
              )}
            </tr>
          </thead> */}

{/* <thead className="bg-gray-100 text-left font-semibold uppercase border-b-2 border-gray-200 rounded-t-lg sticky top-0">
  <tr>
    {columns.map((column, index) => (
      <th
        key={column}
        className={`p-3 ${index === 0 || (enableActions && index === columns.length - 1) ? 'sticky' : ''}`}
        style={{
          left: index === 0 ? 0 : undefined,
          right: enableActions && index === columns.length - 1 ? 0 : undefined,
          backgroundColor: '#f9f9f9',
          zIndex: index === 0 ? 3 : 2
        }}
      >
        <div className="flex items-center">
          {column}
          <div className="ml-2 flex items-center relative">
            {enableSorting[index] && (
              <>
                {sortConfig.key === column && sortConfig.direction === 'asc' ? (
                  <HiSortAscending
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleSort(column)}
                  />
                ) : (
                  <HiSortDescending
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleSort(column)}
                  />
                )}
              </>
            )}
            {enableFiltering[index] && (
              <>
                <FaFilter
                  className="cursor-pointer text-gray-500 ml-2"
                  onClick={() => toggleFilter(column)}
                />
                {showFilter[column] && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 shadow-md p-2 w-40 z-10">
                    <input
                      type="text"
                      value={filterInputs[column] || ''}
                      onChange={(e) => handleColumnFilter(e, column)}
                      placeholder={`Filter ${column}`}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </th>
    ))}
    {enableActions && (
      <th className="p-3 sticky right-0 bg-gray-100 z-20 rounded-tr-lg">
        Actions
      </th>
    )}
  </tr>
</thead> */}
<thead className="bg-gray-100 text-left font-semibold uppercase border-b-2 border-gray-200 rounded-t-lg sticky z-50" style={{ top: '0' }}>
  <tr>
    {columns.map((column, index) => (
      <th
        key={column}
        className={`p-3 ${index === 0 || (enableActions && index === columns.length - 1) ? 'sticky' : ''}`}
        style={{
          left: index === 0 ? 0 : undefined,
          right: enableActions && index === columns.length - 1 ? 0 : undefined,
          backgroundColor: '#f9f9f9',
          zIndex: index === 0 ? 3 : 2
        }}
      >
        <div className="flex items-center">
          {column}
          <div className="ml-2 flex items-center relative">
            {enableSorting[index] && (
              <>
                {sortConfig.key === column && sortConfig.direction === 'asc' ? (
                  <HiSortAscending
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleSort(column)}
                  />
                ) : (
                  <HiSortDescending
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleSort(column)}
                  />
                )}
              </>
            )}
            {enableFiltering[index] && (
              <>
                <FaFilter
                  className="cursor-pointer text-gray-500 ml-2"
                  onClick={() => toggleFilter(column)}
                />
                {showFilter[column] && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 shadow-md p-2 w-40 z-10">
                    <input
                      type="text"
                      value={filterInputs[column] || ''}
                      onChange={(e) => handleColumnFilter(e, column)}
                      placeholder={`Filter ${column}`}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </th>
    ))}
    {enableActions && (
      <th className="p-3 sticky right-0 bg-gray-100 rounded-tr-lg" style={{ zIndex: 20 }}>
        Actions
      </th>
    )}
  </tr>
</thead>





          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={column} style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid #ddd',
                    position: colIndex === 0 ? 'sticky' : undefined,
                    left: colIndex === 0 ? 0 : undefined,
                    backgroundColor: colIndex === 0 ? '#fff' : undefined,
                  }}>
                    {item[column]}
                  </td>
                ))}
                {enableActions && (
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', position: 'sticky', right: 0, backgroundColor: '#fff' }}>
                    {actionButtons && actionButtons(item, item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          Rows per page:
          <select onChange={handleRowsPerPageChange} value={rowsPerPage} className="ml-2 border rounded-md">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="p-1">
            <FaStepBackward />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1"
          >
            <FaChevronLeft />
          </button>
          <span>
            Page{' '}
            <input
              type="number"
              value={manualPageInput}
              onChange={handleManualPageChange}
              className="w-12 text-center border rounded-md"
            />{' '}
            of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1"
          >
            <FaChevronRight />
          </button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="p-1">
            <FaStepForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

// // TableComponent.tsx
// import React, { useState, useEffect } from 'react';
// import { FaFilter, FaSearch, FaChevronLeft, FaChevronRight, FaStepBackward, FaStepForward } from 'react-icons/fa';
// import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

// interface TableComponentProps {
//   data: any[];
//   columns: string[];
//   enableFiltering?: boolean[];
//   enableSearch?: boolean;
//   enableSorting?: boolean[];
//   enableActions?: boolean;
//   enableRowSelection?: boolean;
//   actionButtons?: (item: any, rowData: any) => JSX.Element;
//   darkMode?: boolean;
// }

// const TableComponent: React.FC<TableComponentProps> = ({
//   data,
//   columns,
//   enableFiltering = [],
//   enableSearch = false,
//   enableSorting = [],
//   enableActions = false,
//   enableRowSelection = false,
//   actionButtons,
//   darkMode = false,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [filteredData, setFilteredData] = useState(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | '' }[]>([]);
//   const [filterInputs, setFilterInputs] = useState<{ [key: string]: string }>({});
//   const [showFilter, setShowFilter] = useState<{ [key: string]: boolean }>({});
//   const [manualPageInput, setManualPageInput] = useState(currentPage.toString());
//   const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
//   const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
//   const [isDarkMode, setIsDarkMode] = useState(darkMode);

//   useEffect(() => {
//     setFilteredData(data);
//   }, [data]);

//   useEffect(() => {
//     setManualPageInput(currentPage.toString());
//   }, [currentPage]);

//   const toggleFilter = (column: string) => {
//     setShowFilter((prev) => ({
//       ...prev,
//       [column]: !prev[column],
//     }));
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);
//     filterData(term);
//   };

//   const filterData = (term: string) => {
//     setFilteredData(
//       data.filter((item) =>
//         columns.some((column) =>
//           selectedColumn
//             ? String(item[selectedColumn]).toLowerCase().includes(term)
//             : String(item[column]).toLowerCase().includes(term)
//         )
//       )
//     );
//     setCurrentPage(1);
//   };

//   const handleColumnFilter = (event: React.ChangeEvent<HTMLInputElement>, column: string) => {
//     const term = event.target.value.toLowerCase();
//     setFilterInputs({ ...filterInputs, [column]: term });
//     setFilteredData(data.filter((item) => String(item[column]).toLowerCase().includes(term)));
//     setCurrentPage(1);
//   };

//   const handleSort = (column: string) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     const existingSort = sortConfig.find((config) => config.key === column);

//     if (existingSort) {
//       direction = existingSort.direction === 'asc' ? 'desc' : 'asc';
//       setSortConfig((prev) =>
//         prev.map((config) => (config.key === column ? { ...config, direction } : config))
//       );
//     } else {
//       setSortConfig([...sortConfig, { key: column, direction }]);
//     }

//     const sortedData = [...filteredData].sort((a, b) => {
//       for (let { key, direction } of sortConfig) {
//         if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
//         if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//     setFilteredData(sortedData);
//   };

//   const handleRowSelection = (rowIndex: number) => {
//     const newSelectedRows = new Set(selectedRows);
//     newSelectedRows.has(rowIndex) ? newSelectedRows.delete(rowIndex) : newSelectedRows.add(rowIndex);
//     setSelectedRows(newSelectedRows);
//   };

//   const toggleSelectAll = () => {
//     const newSelectedRows = new Set(
//       selectedRows.size === filteredData.length ? [] : filteredData.map((_, index) => index)
//     );
//     setSelectedRows(newSelectedRows);
//   };

//   const handleDateFilter = (event: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
//     const value = event.target.value;
//     setDateRange((prev) => ({ ...prev, [type]: value }));
//   };

//   const applyDateFilter = () => {
//     const filtered = data.filter((item) => {
//       const date = new Date(item.date);
//       const startDate = dateRange.start ? new Date(dateRange.start) : null;
//       const endDate = dateRange.end ? new Date(dateRange.end) : null;
//       return (!startDate || date >= startDate) && (!endDate || date <= endDate);
//     });
//     setFilteredData(filtered);
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredData.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleManualPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setManualPageInput(value);
//     const page = Number(value);
//     if (!isNaN(page) && page > 0 && page <= Math.ceil(filteredData.length / rowsPerPage)) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const tableClassName = `p-4 border rounded-lg ${
//     isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
//   }`;

//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   return (
//     <div className={tableClassName}>
//       {/* Dark Mode Toggle */}
//       <div className="flex items-center justify-between mb-4">
//         {enableSearch && (
//           <div className="flex items-center space-x-2">
//             <select
//               value={selectedColumn}
//               onChange={(e) => setSelectedColumn(e.target.value)}
//               className="px-2 py-1 border rounded-md"
//             >
//               <option value="">All Columns</option>
//               {columns.map((col, index) => (
//                 <option key={index} value={col}>
//                   {col}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="px-2 py-1 border rounded-md shadow"
//             />
//             <FaSearch />
//           </div>
//         )}
//         <button onClick={() => setIsDarkMode(!isDarkMode)} className="px-2 py-1 border rounded-md shadow">
//           Toggle Dark Mode
//         </button>
//       </div>

//       {/* Date Range Filter */}
//       <div className="flex space-x-2 mb-4">
//         <label className="flex items-center">
//           <span className="mr-2">Start Date</span>
//           <input
//             type="date"
//             value={dateRange.start}
//             onChange={(e) => handleDateFilter(e, 'start')}
//             className="border rounded-md"
//           />
//         </label>
//         <label className="flex items-center">
//           <span className="mr-2">End Date</span>
//           <input
//             type="date"
//             value={dateRange.end}
//             onChange={(e) => handleDateFilter(e, 'end')}
//             className="border rounded-md"
//           />
//         </label>
//         <button onClick={applyDateFilter} className="px-4 py-2 bg-blue-500 text-white rounded-md">
//           Apply Date Filter
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-auto">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr>
//               {enableRowSelection && (
//                 <th className="p-2 border sticky left-0 bg-white z-10">
//                   <input
//                     type="checkbox"
//                     onChange={toggleSelectAll}
//                     checked={selectedRows.size === filteredData.length}
//                   />
//                 </th>
//               )}
//               {columns.map((column, index) => (
//                 <th
//                   key={column}
//                   className="p-2 border text-left"
//                   style={{
//                     position:
//                       index === 0 || (enableActions && index === columns.length - 1)
//                         ? 'sticky'
//                         : undefined,
//                     left: index === 0 ? 0 : undefined,
//                     right: enableActions && index === columns.length - 1 ? 0 : undefined,
//                     backgroundColor: '#fff',
//                     zIndex: 2,
//                   }}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <span>{column}</span>
//                     {enableSorting[index] && (
//                       <button onClick={() => handleSort(column)}>
//                         {sortConfig.find((config) => config.key === column)?.direction === 'asc' ? (
//                           <HiSortAscending />
//                         ) : (
//                           <HiSortDescending />
//                         )}
//                       </button>
//                     )}
//                     {enableFiltering[index] && (
//                       <FaFilter onClick={() => toggleFilter(column)} className="cursor-pointer" />
//                     )}
//                   </div>
//                 </th>
//               ))}
//               {enableActions && <th className="p-2 border sticky right-0 bg-white z-10">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, rowIndex) => (
//               <tr key={rowIndex}>
//                 {enableRowSelection && (
//                   <td className="p-2 border sticky left-0 bg-white z-10">
//                     <input
//                       type="checkbox"
//                       checked={selectedRows.has(rowIndex)}
//                       onChange={() => handleRowSelection(rowIndex)}
//                     />
//                   </td>
//                 )}
//                 {columns.map((column) => (
//                   <td key={column} className="p-2 border">
//                     {item[column]}
//                   </td>
//                 ))}
//                 {enableActions && actionButtons && (
//                   <td className="p-2 border sticky right-0 bg-white z-10">{actionButtons(item, item)}</td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center">
//         <div className="flex items-center">
//           Rows per page:
//           <select onChange={handleRowsPerPageChange} value={rowsPerPage} className="ml-2 border rounded-md">
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//         </div>
//         <div className="flex items-center">
//           <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="p-1">
//             <FaStepBackward />
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-1"
//           >
//             <FaChevronLeft />
//           </button>
//           <span>
//             Page{' '}
//             <input
//               type="number"
//               value={manualPageInput}
//               onChange={handleManualPageChange}
//               className="w-12 text-center border rounded-md"
//             />{' '}
//             of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-1"
//           >
//             <FaChevronRight />
//           </button>
//           <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="p-1">
//             <FaStepForward />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;
