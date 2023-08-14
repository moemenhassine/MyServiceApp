import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import localStorage from "@react-native-async-storage/async-storage";
import AuthServises from "../../services/AuthService";

const initialState = {
  user: null,
  name: "",
  lasname: "",
  email: "",
  _id: "",
  isLoggedOut: null,
  isLoggedIn: null,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userloaded: false,
  token: localStorage.getItem("token"),
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValues }) => {
    //console.log("before service register", values);
    try {
      const res = await AuthServises.register(
        values.name,
        values.lastName,
        values.email,
        values.password
      );

     
      return {
        user: res.data.user,
      };
    } catch (error) {
      //console.error(error.response.data);
      return rejectWithValues(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (values) => {
  //console.log("before service login", values);
  try {
    const res = await AuthServises.login(values.email, values.password);
    return {
      user: res.data.user,
      token: res.data.token,
      isLoggedOut: false,
      isLoggedIn: true,
    };
  } catch (error) {
    //console.error(error.response.data);
    throw error.response.data;
    
  }
});
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return {
      user: null,
      token: "",
      isLoggedOut: true,
    };
  } catch (e) {
    console.log("=========> logout rejected ", e);

    thunkAPI.rejectWithValue();
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          name: user.name,
          lasname: user.lasname,
          email: user.email,
          _id: user._id,
          userloaded: true,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedOut: action.payload.isLoggedOut,
        isLoggedIn: action.payload.isLoggedIn,
        loginStatus: "success",
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        loginStatus: "rejected",
        loginError: action.error.message,
        token: null,
        isLoggedIn: false,
      };
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedOut: action.payload.isLoggedOut,
      };
    });
    builder.addCase(logout.rejected, (state, action) => {
      return {
        ...state,
        user: null,
        token: null,
        isLoggedOut: false,
      };
    });
  },
});

export default AuthSlice.reducer;
