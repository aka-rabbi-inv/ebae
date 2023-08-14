import { Grid, Link } from "@mui/material";

export default function AdminSidebar() {
  return (
    <Grid
      item
      container
      direction="column"
      sx={{
        position: "absolute",
        left: 10,
        top: 50,
        border: "1px solid black",
        width: 200,
        height: "100vh",
      }}
    >
      <Link href="/admin">Orders</Link>
      <Link href="/admin/users">Users</Link>
    </Grid>
  );
}
