import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { getFilteredProducts, getProducts } from "../../store/action/product";
import {
  setFilter,
  setCategoryFilter,
} from "../../store/reducer/productsReducer";
import { useDispatch } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function ProductFilterSidebar() {
  let filter = useSelector((store) => store.products.filter);
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const filterData = (data) => {
    console.log(data);
    dispatch(setFilter(data));
    dispatch(getFilteredProducts(data));
  };

  return (
    <div>
      <React.Fragment>
        <Tooltip title="Filters" placement="right-end">
          <Checkbox
            icon={<FilterAltIcon />}
            checkedIcon={<FilterAltOffIcon />}
            onClick={() => setShowFilters(!showFilters)}
          />
        </Tooltip>
        {showFilters ? (
          <Box
            component="form"
            onSubmit={handleSubmit(filterData)}
            sx={{ mt: 3 }}
          >
            <List className="fadeIn">
              <ListItem disablePadding>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Search Product
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    placeholder={filter.search}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    {...register("search")}
                  />
                </FormControl>
              </ListItem>
              <ListItem disablePadding>
                <FormControl sx={{ marginTop: "20px" }}>
                  <InputLabel id="simple-select-label">Category</InputLabel>
                  <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={filter.category}
                    label="Category"
                    {...register("category", {
                      onChange: (e) => {
                        dispatch(setCategoryFilter(e.target.value));
                      },
                    })}
                  >
                    <MenuItem value={"Other"}>All Products</MenuItem>
                    <MenuItem value={"Toys"}>Toys</MenuItem>
                    <MenuItem value={"Gadgets"}>Gadgets</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <Button
                  type="submit"
                  size="medium"
                  variant="outlined"
                  color="secondary"
                >
                  submit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    reset();
                    dispatch(getProducts());
                  }}
                >
                  Clear
                </Button>
              </ListItem>
            </List>
          </Box>
        ) : null}
      </React.Fragment>
    </div>
  );
}
