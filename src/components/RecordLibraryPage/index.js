import React, { useEffect, useState } from 'react';
import RecordTable from './RecordTable';
import EditModal from './EditModal';
import '../../styles/RecordLibrary.css'
import InputFields from './InputFields';
import useGlobalContext from '../../context/GlobalContext';

export default function RecordLibrary() {
  const { userProblemArray } = useGlobalContext();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [shownData, setShownData] = useState(userProblemArray);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    timeFrame: 'all',
  });
  console.log(filters.timeFrame)
  useEffect(() => {
    let newData = userProblemArray.filter((prompt) => (
      (prompt.promptName.includes(search) ||
        prompt.promptText.includes(search)) &&
      (
        filters.difficulty === 'all' ||
        filters.difficulty === prompt.difficulty
      ) &&
      (
        filters.timeFrame === 'all' ||
        (filters.timeFrame === 'daily' && new Date(prompt.timeStamp).getFullYear() === new Date().getFullYear() && new Date(prompt.timeStamp).getMonth() === new Date().getMonth() && new Date(prompt.timeStamp).getDate() === new Date().getDate()) ||
        (filters.timeFrame === 'monthly' && new Date(prompt.timeStamp).getFullYear() === new Date().getFullYear() && new Date(prompt.timeStamp).getMonth() === new Date().getMonth()) ||
        (filters.timeFrame === 'yearly' && new Date(prompt.timeStamp).getFullYear() === new Date().getFullYear())
      )
    ));
    setShownData(newData);
  }, [search, filters, userProblemArray]);

  return (
    <main className="main">
      <InputFields
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />
      <RecordTable
        tableData={shownData}
        setShowEditModal={setShowEditModal}
        setEditRow={setEditRow}
      />
      {showEditModal &&
        <EditModal
          tableData={userProblemArray}
          // setTableData={setTableData}
          setShowEditModal={setShowEditModal}
          row={editRow}
          setRow={setEditRow}
        />}
    </main>
  );
}
