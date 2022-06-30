import React, { useEffect, useState } from 'react';
import RecordTable from './RecordTable';
import EditModal from './EditModal';
import '../../styles/RecordLibrary.css'
import createSampleData from '../../test/sampleData';
import InputFields from './InputFields';

export default function RecordLibrary() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [tableData, setTableData] = useState(createSampleData(54))
  const [shownData, setShownData] = useState(tableData);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    timeFrame: 'all',
  });
  useEffect(() => {
    let newData = tableData.filter((prompt) => (
      (prompt.promptName.includes(search) ||
        prompt.PromptText.includes(search)) &&
      (
        filters.difficulty === 'all' ||
        filters.difficulty === prompt.difficulty
      ) &&
      (
        filters.timeFrame === 'all'
      )
    ));
    setShownData(newData);
  }, [search, filters, tableData]);
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
          tableData={tableData}
          setTableData={setTableData}
          setShowEditModal={setShowEditModal}
          row={editRow}
          setRow={setEditRow}
        />}
    </main>
  );
}
