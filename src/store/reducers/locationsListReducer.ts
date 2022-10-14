import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { CreateLocationThunk, Location } from "../../interfaces/location";
import { LocationPOST } from "../../interfaces/locationPOST";
import {
  createLocationApi,
  deleteLocationApi,
  fetchLocationsListApi,
} from "../../services/locations";

export const fetchLocationsListAction = createAsyncThunk(
  "locationsList/fetchLocationsList",
  async () => {
    const response = await fetchLocationsListApi();

    console.log(response);

    return response.data.content;
  }
);

export const createLocationAction = createAsyncThunk(
  "locationsList/createLocation",
  async (data: CreateLocationThunk) => {
    // await createLocationApi(data);

    const response = await createLocationApi(data.submitData);

    const newLocationsList = await fetchLocationsListApi();

    notification.success({
      message: "Thêm vị trí thành công",
    });

    data.callback("/admin");

    return newLocationsList.data.content;
  }
);

export const deleteLocationAction = createAsyncThunk(
  "locationsList/deleteLocation",
  async (id: number) => {
    const response = await deleteLocationApi(id);

    const newLocationsList = await fetchLocationsListApi();

    notification.success({
      message: "Xóa vị trí thành công",
    });

    return newLocationsList.data.content;
  }
);

interface LocationsListState {
  locationsList: Location[];
}

const INITIAL_STATE: LocationsListState = {
  locationsList: [],
};

const locationsListSlice = createSlice({
  name: "locationsList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchLocationsListAction.fulfilled,
      (state: LocationsListState, action: PayloadAction<Location[]>) => {
        console.log("fulfilled");
        state.locationsList = action.payload;
      }
    );
    builder.addCase(
      createLocationAction.fulfilled,
      (state: LocationsListState, action: PayloadAction<Location[]>) => {
        state.locationsList = action.payload;
      }
    );
    builder.addCase(
      deleteLocationAction.fulfilled,
      (state: LocationsListState, action: PayloadAction<Location[]>) => {
        state.locationsList = action.payload;
      }
    );
  },
});

export const locationsListActions = locationsListSlice.actions;
export const locationsListReducer = locationsListSlice.reducer;
