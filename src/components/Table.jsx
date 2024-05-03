// data
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = ({ row, columns }) => {
  return (
    <div
      className={`bg-section-bg rounded-md table-style w-auto overflow-hidden h-[calc(100vh-200px)] text-primary-text`}
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
      />
    </div>
  );
};

export default Table;
