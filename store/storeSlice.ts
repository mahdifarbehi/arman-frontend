import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCustomerOrigin,
  fetchUserCategories,
  fetchCustomerCategories,
  fetchCustomer,
  fetchSubordinates,
  fetchTransactionFailures,
  getProducts,
  getSuppliers,
  fetchLeaders,
  fetchTaskTypes,
  fetchProductSupplierDropDownList,
} from "@/utils/actions";

interface StoreState {
  categories: any[];
  origins: any[];
  sellers: any[];
  products: any[];
  suppliers: any[];
  taskTypes: any[];
  userCategories: any[];
  leaders: any[];
  productSupplierList: any[];
  failures: any[];
  isLoading: boolean;
  customer: any | null;
  customerCategories: any[];
  error: string | null;
  isCollapsed: boolean;
}

// Initial state
const initialState: StoreState = {
  categories: [],
  origins: [],
  sellers: [],
  products: [],
  suppliers: [],
  taskTypes: [],
  userCategories: [],
  productSupplierList: [],
  customerCategories: [],
  leaders: [],
  failures: [],
  isLoading: false,
  customer: null,
  error: null,
  isCollapsed: false,
};

// Async thunks for fetching data
export const getCustomerCategories = createAsyncThunk(
  "store/getCustomerCategories",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchCustomerCategories();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const getUserCategories = createAsyncThunk(
  "store/getUserCategories",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchUserCategories();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const fetchProductSupplierList = createAsyncThunk(
  "store/fetchProductSupplierList",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchProductSupplierDropDownList();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const getCategories = createAsyncThunk(
  "store/getCategories",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchCategories();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const getTaskTypes = createAsyncThunk(
  "store/getTaskTypes",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchTaskTypes();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const fetchOrigins = createAsyncThunk(
  "store/fetchOrigins",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchCustomerOrigin();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  "store/fetchCustomer",
  async (id: number, { rejectWithValue }) => {
    const { success, data, message } = await fetchCustomer(id);
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const fetchSellers: any = createAsyncThunk(
  "store/fetchSellers",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchSubordinates();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const fetchFailures: any = createAsyncThunk(
  "store/fetchFailures",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchTransactionFailures();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);

export const fetchProductsList: any = createAsyncThunk(
  "store/fetchProductList",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await getProducts();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const fetchSuppliersList: any = createAsyncThunk(
  "store/fetchSuppliersList",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await getSuppliers();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
export const getLeaders = createAsyncThunk(
  "store/getLeaders",
  async (_, { rejectWithValue }) => {
    const { success, data, message } = await fetchLeaders();
    if (success) {
      return data;
    } else {
      return rejectWithValue(message);
    }
  }
);
// Slice
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setProductSupplierList(state, action: PayloadAction<any[]>) {
      state.productSupplierList = action.payload;
    },
    setCategories(state, action: PayloadAction<any[]>) {
      state.categories = action.payload;
    },
    setOrigins(state, action: PayloadAction<any[]>) {
      state.origins = action.payload;
    },
    setCustomer(state, action: PayloadAction<any | null>) {
      state.customer = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSellers(state, action: PayloadAction<any[]>) {
      state.sellers = action.payload;
    },
    setFailures(state, action: PayloadAction<any[]>) {
      state.failures = action.payload;
    },
    setProducts(state, action: PayloadAction<any[]>) {
      state.products = action.payload;
    },
    setSuppliers(state, action: PayloadAction<any[]>) {
      state.suppliers = action.payload;
    },
    setLeaders(state, action: PayloadAction<any[]>) {
      state.leaders = action.payload;
    },
    setTaskTypes(state, action: PayloadAction<any[]>) {
      state.taskTypes = action.payload;
    },
    setUserCategories(state, action: PayloadAction<any[]>) {
      state.userCategories = action.payload;
    },
    setCustomerCategories(state, action: PayloadAction<any[]>) {
      state.userCategories = action.payload;
    },
    toggleSidebar(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarState(state, action: PayloadAction<boolean>) {
      state.isCollapsed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCustomerCategories.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.customerCategories = action.payload;
        }
      )
      .addCase(
        getCustomerCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(getUserCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getUserCategories.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.userCategories = action.payload;
        }
      )
      .addCase(
        getUserCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchProductSupplierList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductSupplierList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.productSupplierList = action.payload;
        }
      )
      .addCase(
        fetchProductSupplierList.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(getTaskTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getTaskTypes.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.taskTypes = action.payload;
        }
      )
      .addCase(getTaskTypes.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrigins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrigins.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.origins = action.payload;
        }
      )
      .addCase(fetchOrigins.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCustomerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.customer = action.payload;
        }
      )
      .addCase(
        fetchCustomerById.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchSellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchSellers.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.sellers = action.payload;
        }
      )
      .addCase(fetchSellers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFailures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFailures.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.failures = action.payload;
        }
      )
      .addCase(fetchFailures.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        fetchProductsList.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchSuppliersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchSuppliersList.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.suppliers = action.payload;
        }
      )
      .addCase(
        fetchSuppliersList.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(getLeaders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLeaders.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.leaders = action.payload;
      })
      .addCase(getLeaders.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCategories,
  setOrigins,
  setCustomer,
  setError,
  setSellers,
  setFailures,
  setProducts,
  setSuppliers,
  setLeaders,
  setTaskTypes,
  setUserCategories,
  setProductSupplierList,
  setCustomerCategories,
  setSidebarState,
  toggleSidebar,
} = storeSlice.actions;

export default storeSlice.reducer;
