import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterNames, FILTERS } from "../../constants/filters";

type FilterState = FilterNames;

const initialState: FilterState = FILTERS.all;

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ filter: FilterNames }>) => {
      const { filter } = action.payload;
      return FILTERS[filter];
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
