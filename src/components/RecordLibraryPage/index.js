import React, { useState } from 'react';
import RecordTable from './RecordTable';
import EditModal from './EditModal';
import '../../styles/RecordLibrary.css'
import sample from '../HomePage/HomeGraphs/sampleData';
import InputFields from './InputFields';

export default function RecordLibrary() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [tableData, setTableData] = useState(sample)
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({

  });
  return (
    <main className="main">
      <InputFields />
      <RecordTable tableData={tableData} setShowEditModal={setShowEditModal} setEditRow={setEditRow} />
      {showEditModal && <EditModal setTableData={setTableData} setShowEditModal={setShowEditModal} row={editRow} setRow={setEditRow} />}
    </main>
  );
}
