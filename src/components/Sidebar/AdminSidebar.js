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
        width: 200,
      }}
    >
      <Link href="/admin">Orders</Link>
      <Link href="/admin/users">Users</Link>
    </Grid>
  );
}
