import React, { useState } from "react";
import styled from "@emotion/styled";

import {
  IconButton,
  Paper as MuiPaper,
  Alert,
  Badge,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  EllipsisVerticalIcon,
  PencilIcon,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Paper = styled(MuiPaper)(spacing);

function UsersTable({ users: rows, loading, error }) {
  const navigate = useNavigate();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const getSelectedRows = () => {
    return rows.filter(row => rowSelectionModel.includes(row.id));
  }

  if (error) {
    return (
      <Paper style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        width: "100%"
      }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Paper>
    );
  }

  const columns = [
    {
      field: "role",
      headerName: "Role",
      width: 150,
      valueGetter: (value, row) => `${row.role.name|| 'N/A'}`
    },
    {
      field: "name",
      headerName: "User",
      flex: 1,
      valueGetter: (value, row) => `${row.name || row.displayName || 'N/A'} - ${row.email || 'N/A'}`
    },
    {
      field: "actions",
      renderHeader: () => {

        const open = false;
        const handleClick = (event) => {};
        return <IconButton
          aria-controls={open ? 'actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disabled={rowSelectionModel.length === 0}
        >
          <Badge
            badgeContent={rowSelectionModel.length}
            color="primary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <EllipsisVerticalIcon />
          </Badge>
        </IconButton>
      },
      width: 60,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ value, row }) => {
        const open = false;
        const handleClick = (event) => {
          navigate('/app/settings/users/' + row.id, { replace: true });
        };
        return <IconButton
          aria-controls={open ? 'actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <PencilIcon />
        </IconButton>
      }
    },
  ];

  return (
    <Paper style={{
      display: 'flex',
      flexDirection: 'column',
      width: "100%"
    }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5
            }
          },
        }}
        pageSizeOptions={[10]}
        rows={rows || []}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={setRowSelectionModel}
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick
        disableColumnSorting
        disableColumnFilter
        disableColumnResize
        disableColumnMenu
        loading={loading}
        hideFooterSelectedRowCount
        sx={{
          '&.MuiDataGrid-root': {
            border: 'none',
            // borderRadius: 0,
          },
          '& .MuiDataGrid-columnHeaders': {
            borderRadius: 0,
            fontWeight: 'bold',
            maxHeight: 'none !important'
          },
          '& .MuiDataGrid-iconSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-footerContainer': {
            justifyContent: 'end',
          },
          '& .MuiDataGrid-selectedRowCount': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer,.MuiDataGrid-columnHeaderTitleContainerContent': {
            overflow: 'visible',
          },
        }}
      />
    </Paper>
  );
}

export default UsersTable;
