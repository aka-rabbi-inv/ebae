import { Grid } from "@mui/material";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import BackDrop from "../../components/BackDrop/BackDrop";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getFilteredProducts } from "../../store/action/product";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { chunk } from "lodash";
import ProductFilterSidebar from "../../components/Sidebar/ProductFilterSidebar";
import { useSearchParams, useLocation } from "react-router-dom";

const FILTER_OPTIONS_LENGTH = 2;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let products = useSelector((store) => store.products.products);
  const open = useSelector((store) => store.loader.open);
  const [productsChunks, setProductsChunks] = useState([]);
  const [productsLength, setProductsLength] = useState(1);
  const [page, setPage] = useState(0);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const handlePagination = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    console.log(searchParams.size);
    if (searchParams.size === FILTER_OPTIONS_LENGTH) {
      dispatch(
        getFilteredProducts({
          search: searchParams.get("search"),
          category: searchParams.get("category"),
        })
      );
    } else {
      dispatch(getProducts());
    }
  }, [location]);

  useEffect(() => {
    if (!products) return;
    const productsCopy = [...products];
    const data = products.length > 0 ? chunk(productsCopy.reverse(), 10) : [];
    setProductsLength(data.length);
    setProductsChunks(data[page]);
  }, [products, page]);

  const showProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={true} lg={12} ml={2}>
        <ProductFilterSidebar />
      </Grid>

      <Grid item container lg={8} spacing={2}>
        {productsChunks &&
          productsChunks.map((product) => {
            return (
              <Grid key={product._id} item>
                <Card onClick={() => showProduct(product._id)}>
                  <CardActionArea>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center", // Center the image horizontally
                        alignItems: "center", // Center the image vertically
                        height: 140, // Set the container height
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: 140, // Set the image height
                          width: "auto",
                        }}
                        image={process.env.REACT_APP_BASE_URL + product.image}
                        alt="product image"
                      />
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="p" component="div">
                        {product.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Grid item container lg={8} spacing={2}>
        <Stack spacing={2} mt={4}>
          <Pagination
            count={productsLength}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </Stack>
      </Grid>
      <BackDrop open={open} />
    </Grid>
  );
};

export default Home;
