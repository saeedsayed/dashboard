import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = ({ row, columns }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });


  return (
    <div
      className={`bg-section-bg rounded-md  table-style w-auto overflow-hidden h-[calc(100vh-200px)] text-primary-text`}
    >
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columns={columns}
        rows={row}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        // paginationModel={paginationModel}
        // onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default Table;
