import React, { useState } from 'react';
import RecordTable from './RecordTable';
import EditModal from './EditModal';
import '../../styles/RecordLibrary.css'
import sample from '../HomePage/HomeGraphs/sampleData';

export default function RecordLibrary() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [tableData, setTableData] = useState(sample)
  return (
    <main className="main">
      <RecordTable tableData={tableData} setShowEditModal={setShowEditModal} setEditRow={setEditRow}/>
      {showEditModal && <EditModal setTableData={setTableData} setShowEditModal={setShowEditModal} row={editRow} setRow={setEditRow} />}
    </main>
  )
}
