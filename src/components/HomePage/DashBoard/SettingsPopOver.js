import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

export default function IconButtonSizes({setSettingsView, settingsView}) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton aria-label="delete" size="small" onClick={()=>{console.log(settingsView); setSettingsView(!settingsView)}}>
        <SettingsApplicationsIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}