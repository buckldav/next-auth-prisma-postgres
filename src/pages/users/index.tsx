import { Typography, Box, Button } from "@mui/material";
import { MainLayout } from "@/components/layout/main";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { CSVLink } from "react-csv";
import { NextPageContext, InferGetServerSidePropsType } from "next";
import prisma from "%/prisma";
import { calcWidthOfField } from "@/utils/string";
import Link from "next/link";
import { OwnerGuard } from "@/guards";

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { rows, columns } = props;

  if (!rows || !columns) {
    return null;
  }

  const gridColumns = columns.map((col) => ({
    ...col,
    renderCell: (params) =>
      col.field === "id" ? (
        <Link href={`/users/${params.value}`}>{params.value}</Link>
      ) : (
        params.value
      ),
  }));

  return (
    <OwnerGuard>
      <MainLayout wide={true}>
        <Typography component="h1" variant="h4" sx={{ marginBottom: 2 }}>
          Users
        </Typography>

        <Button variant="contained">
          <CSVLink
            data={rows}
            filename={"users.csv"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Download CSV
          </CSVLink>
        </Button>

        <Box sx={{ height: 400, width: "100%", mt: 2 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "id", sort: "asc" }],
              },
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            rows={rows}
            columns={gridColumns}
            pageSizeOptions={[5]}
          />
        </Box>
      </MainLayout>
    </OwnerGuard>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const users = await prisma.user.findMany({ where: { isActive: true } });

  const rows = JSON.parse(JSON.stringify(users));
  if (rows.length === 0) {
    return {
      props: {
        rows: [],
        columns: [],
      },
    };
  }

  const keys = [
    "id",
    "name",
    "email",
    "userRole",
    "employeeStatus",
    "nickname",
    "isActive",
  ];
  const columns: GridColDef[] = Object.keys(rows[0]).map((name) => ({
    field: name,
    headerName: name,
    width:
      name === "id"
        ? 50
        : name === "email"
        ? 200
        : name === "isActive" || name === "nickname"
        ? 100
        : 150,
    hide: !keys.includes(name),
  }));

  console.log(rows[0]);

  return {
    props: {
      rows,
      columns,
    },
  };
}
