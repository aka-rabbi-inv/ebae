import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getAllOrders } from "../../store/action/user";
import { chunk } from "lodash";
import { Orders } from "./orders";
import { getAllUsers } from "../../store/action/user";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";

const Admin = () => {
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.user.activeUser.order);
  const token = useSelector((store) => store.user.activeUser.token);

  const [ordersWithStatus, setOrdersWithStatus] = useState([]);
  const [chunks, setChunks] = useState(1);
  const [ordersPageNumber, setOrdersPageNumber] = useState(0);

  const handleOrdersPagination = (event, value) => {
    setOrdersPageNumber(value - 1);
  };

  useEffect(() => {
    dispatch(getAllOrders(token));
    dispatch(getAllUsers(token));
  }, []);

  useEffect(() => {
    if (!orders || orders.length === 0) return;
    const orderCopy = [...orders];
    const data = chunk(orderCopy.reverse(), 10);
    setChunks(data.length);
    const modifiedOrders = data[ordersPageNumber].map((item) => {
      const totalPrice = item.products
        .reduce((acc, item) => {
          return acc + item.productId.price * item.quantity;
        }, 0)
        .toFixed(2);
      return { ...item, totalPrice };
    });
    setOrdersWithStatus(modifiedOrders);
  }, [orders, ordersPageNumber]);

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" spacing={5}>
        <AdminSidebar />
        <Grid item xs={12} md={8}>
          <Orders orders={ordersWithStatus} setOrders={setOrdersWithStatus} />
          <Stack spacing={2} mt={4}>
            <Pagination
              count={chunks}
              variant="outlined"
              shape="rounded"
              onChange={handleOrdersPagination}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
