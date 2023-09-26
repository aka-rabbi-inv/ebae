import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useEffect, useState } from "react";
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
import { getProducts } from "../../store/action/product";
import { useDispatch } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";

export default function ProductFilterSidebar() {
  let [search, setSearch] = useState("");
  let [category, setCategory] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    navigate(`/?search=${search}&category=${category}`);
  }, [search, category]);

  const filterData = (data) => {
    console.log(data);
    // dispatch(setFilter(data));
    setSearch(data.search);
    setCategory(data.category);
    setShowFilters(false);
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
        <Modal
          open={showFilters}
          onClose={() => setShowFilters(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            onSubmit={handleSubmit(filterData)}
            sx={{
              mt: 16,
              ml: 5,
              pl: 5,
              border: "black 1px solid",
              borderRadius: "20px",
              width: "30%",
              backgroundColor: "#2D2D2D",
            }}
          >
            <List className="fadeIn">
              <ListItem disablePadding>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Search Product
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
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
                    label="Category"
                    {...register("category", {
                      onChange: (e) => {
                        dispatch(setValue(e.target.value));
                      },
                    })}
                  >
                    <MenuItem value={""}>All Products</MenuItem>
                    <MenuItem value={"643fa86920ffec0b7a408846"}>
                      Others
                    </MenuItem>
                    <MenuItem value={"6512831c11f1ac04914b5236"}>Toys</MenuItem>
                    <MenuItem value={"65126a7d11f1ac04914b5234"}>
                      Gadgets
                    </MenuItem>
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
        </Modal>
      </React.Fragment>
    </div>
  );
}
