import React, { useState } from 'react';
import RecordTable from './RecordTable';
import EditModal from './EditModal';
import '../../styles/RecordLibrary.css'

export default function RecordLibrary() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState({});
  return (
    <main className="main">
      <RecordTable setShowEditModal={setShowEditModal} setEditRow={setEditRow}/>
      {showEditModal && <EditModal setShowEditModal={setShowEditModal} editRow={editRow} />}
    </main>
  )
}
