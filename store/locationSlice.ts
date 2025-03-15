import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationType {
  latitude: number;
  longitude: number;
}

interface AddressType {
  display_name: string;
  // Add other address components as needed
}

interface LocationState {
  location: LocationType | null;
  address: AddressType | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  location: null,
  address: null,
  loading: false,
  error: null,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationType | null>) => {
      state.location = action.payload;
    },
    setAddress: (state, action: PayloadAction<AddressType | null>) => {
      state.address = action.payload;
    },
    clearLocationData: (state) => {
      state.location = null;
      state.address = null;
      state.error = null;
    },
  },
});

export const { 
  setLoading,
  setError, 
  setLocation, 
  setAddress, 
  clearLocationData 
} = locationSlice.actions;

export default locationSlice.reducer;