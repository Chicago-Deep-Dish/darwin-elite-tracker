import React, { useState } from 'react';
import RecordTable from './RecordTable';
import EditModal from './EditModal';
import '../../styles/RecordLibrary.css'
import createSampleData from '../../test/sampleData';
import InputFields from './InputFields';

export default function RecordLibrary() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [tableData, setTableData] = useState(createSampleData(54))
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    timeFrame: 'all',
  });
  return (
    <main className="main">
      <InputFields
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />
      <RecordTable
        tableData={tableData}
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
