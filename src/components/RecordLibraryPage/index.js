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
  console.log(userProblemArray)

  useEffect(() => {
    let newData = userProblemArray.filter((prompt) => (
      (prompt.promptName.includes(search) ||
        prompt.promptText.includes(search)) &&
      (
        filters.difficulty === 'all' ||
        filters.difficulty === prompt.difficulty
      ) &&
      (
        filters.timeFrame === 'all'
      )
    ))
      .sort((prompt1, prompt2) => (
        -prompt1.timeStamp.localeCompare(prompt2.timeStamp)
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
