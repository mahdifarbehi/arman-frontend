"use server";
import { redirect } from "next/navigation";
import axios from "@/utils/axios";
import { cookies } from "next/headers";
import {
  profileSchema,
  validateWithZodSchema,
  createCustomerSchema,
  updateCustomerSchema,
  updateUserSchema,
  createUserSchema,
  updateTransactionSchema,
  createTransactionSchema,
  updateSupplierSchema,
  createSupplierSchema,
  updateProductSchema,
  createProductSchema,
  createSupplierProductSchema,
  updateSupplierProductSchema,
  customerAssignmentSchema,
  userAssignmentSchema,
  updateTransactionTaskSchema,
  createTransactionTaskSchema,
  updateTransactionPaymentSchema,
  createTransactionPaymentSchema,
  updateTransactionProductSchema,
  createTransactionProductSchema,
  updateTaskSchema,
  createTaskSchema,
  updateFailureSchema,
  createFailureSchema,
  updateCustomerOriginSchema,
  createCustomerOriginSchema,
  createCategorySchema,
  updateCategorySchema,
  fileSchema,
} from "./schema";
import { revalidatePath } from "next/cache";
import { PaymentStatus } from "./types";

export async function handleFetchData(
  requestApi: string,
  limit: number,
  offset: number,
  search?: string,
  customerId?: string,
  dateTimeRange?: {
    startDate: string | null;
    endDate: string | null;
  }
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (dateTimeRange?.startDate && dateTimeRange.startDate !== "") {
      params.append("startDate", dateTimeRange.startDate);
    }
    if (dateTimeRange?.endDate && dateTimeRange.endDate !== "") {
      params.append("endDate", dateTimeRange.endDate);
    }
    if (search) {
      params.append("search", search);
    }
    if (customerId) {
      params.append("customer_id", customerId);
    }
    if (limit) {
      params.append("limit", limit.toString());
    }
    if (offset) {
      params.append("offset", offset.toString());
    }
    const api = `${requestApi}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

function renderError(error: any): {
  message: string;
  success: boolean;
  data: any;
} {
  if (error?.customRedirect) redirect("/login");
  return {
    message: error instanceof Error ? error.message : "خطایی رخ داده",
    success: false,
    data: [],
  };
}

export async function login(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    const res = await axios.post("/api/auth/login", validatedFields, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return {
      message: "شما با موفقیت وارد شدید",
      success: true,
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function logout(): Promise<{ message: string; success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    axios.defaults.headers.Authorization = "";
    return { success: true, message: "شما با موفقیت خارج شدید" };
  } catch (error) {
    return renderError(error);
  }
}

//---------tasks-----------------

export async function fetchTransactionTasks(transactionId: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get(`/api/transaction/tasks/${transactionId}`);
    return { success: true, data: response.data };
  } catch (error) {
    renderError(error);
  }
}

// export const fetchTransactionTasks = unstable_cache(
//   async (
//     transactionId: number
//   ): Promise<{
//     success: boolean;
//     data: any;
//     message?: string;
//   }> => {
//     try {
//       const response = await axios.get(
//         `/api/transaction/tasks/${transactionId}`
//       );
//       return { success: true, data: response.data };
//     } catch (error) {
//       renderError(error);
//     }
//   },

//   ["/api/transaction/tasks", "transaction_tasks"],
//   { tags: ["transaction_tasks"] }
// );

export async function fetchTransactionCustomers(
  transactionId: number
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get(
      `/api/transaction/customer/${transactionId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    renderError(error);
  }
}
export async function fetchTransactionProducts(transactionId: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get(
      `/api/transaction/products/${transactionId}`
    );

    return { success: true, data: response.data };
  } catch (error) {
    renderError(error);
  }
}
export async function fetchTransactionPayments(transactionId: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get(
      `/api/transaction/payments/${transactionId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    renderError(error);
  }
}
export async function fetchTaskTypes(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/task-type");
    return { success: true, data: response.data };
  } catch (error) {
    renderError(error);
  }
}

export async function fetchProductSupplierDropDownList(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/product/product-supplier-drop-down");
    return { success: true, data: response.data };
  } catch (error) {
    renderError(error);
  }
}

export async function handleTransactionProductAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;
  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateTransactionProductSchema,
        rawData
      );
      return await updateTransactionProduct(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createTransactionProductSchema,
        rawData
      );

      return await createTransactionProduct(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

export async function updateTransactionProduct(
  data: any
): Promise<{ message: string; success: boolean; data }> {
  const { id, ...dataWithoutId } = data;
  try {
    const response = await axios.put(
      `/api/generic/transaction-product/${id}`,
      dataWithoutId
    );
    return {
      message: "تغییرات با موفقیت ثبت شد",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function createTransactionProduct(
  data: any
): Promise<{ message: string; success: boolean; data }> {
  try {
    const response = await axios.post("/api/generic/transaction-product", data);
    return {
      message: "محصول جدید با موفقیت ثبت شد",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function deleteTransactionProduct(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(
      `/api/generic/transaction-product/${id}`
    );
    return {
      success: true,
      data: response.data,
      message: "محصول موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function handleTransactionTaskAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateTransactionTaskSchema,
        rawData
      );

      return await updateTransactionTask(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createTransactionTaskSchema,
        rawData
      );

      return await createTransactionTask(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

export async function updateTransactionTask(
  data: any
): Promise<{ message: string; success: boolean; data }> {
  const { id, ...dataWithoutId } = data;
  try {
    const response = await axios.put(
      `/api/generic/transaction-task/${id}`,
      dataWithoutId
    );
    return {
      message: "تغییرات با موفقیت ثبت شد",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function createTransactionTask(
  data: any
): Promise<{ message: string; success: boolean; data }> {
  try {
    const response = await axios.post("/api/generic/transaction-task", data);
    return {
      message: "تغییرات با موفقیت ثبت شد",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function handleTransactionPaymentAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateTransactionPaymentSchema,
        rawData
      );

      return await updateTransactionPayment(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createTransactionPaymentSchema,
        rawData
      );

      return await createTransactionPayment(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}
export async function updateTransactionPayment(
  data: any
): Promise<{ message: string; success: boolean; data }> {
  const { id, ...dataWithoutId } = data;
  try {
    const response = await axios.put(
      `/api/generic/payment/${id}`,
      dataWithoutId
    );
    return {
      message: "تغییرات با موفقیت ثبت شد",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function createTransactionPayment(
  data: any
): Promise<{ message: string; success: boolean; data }> {
  try {
    const response = await axios.post("/api/generic/payment", data);
    return {
      message: "تغییرات با موفقیت ثبت شد",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}
//-------------Transactions-------------------------

export async function fetchTransactions(
  dateTimeRange?: {
    startDate: string | null;
    endDate: string | null;
  },
  search?: string,
  customerId?: string,
  status?: string,
  categoryId?: string
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (dateTimeRange?.startDate && dateTimeRange.startDate !== "") {
      params.append("startDate", dateTimeRange.startDate);
    }
    if (dateTimeRange?.endDate && dateTimeRange.endDate !== "") {
      params.append("endDate", dateTimeRange.endDate);
    }
    if (search) {
      params.append("search", search);
    }
    if (customerId) {
      params.append("customer_id", customerId);
    }

    if (status) {
      params.append("status", status);
    }
    if (categoryId) {
      params.append("category_id", categoryId);
    }
    const api = `/api/transaction/transaction${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function fetchTransaction(id: number) {
  try {
    const response = await axios.get(`/api/generic/transaction/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

export async function handleTransactionAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateTransactionSchema,
        rawData
      );

      return await updateTransaction(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createTransactionSchema,
        rawData
      );

      return await createTransaction(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateTransaction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/transaction/transaction/${data.id}`,
      dataWithoutId
    );

    return {
      success: true,
      message: "اطلاعات معامله با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}
async function createTransaction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/transaction/transaction", data);
    return {
      success: true,
      message: "معامله جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//---------------------dropdown values-------------------------------------
export async function fetchCustomerCategories(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/product/category");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function fetchUserCategories(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/user-category");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function fetchCustomerOrigin(): Promise<{
  message: string;
  success: boolean;
  data: any;
}> {
  try {
    const response = await axios.get("/api/generic/customer-origin");
    return { success: true, data: response.data, message: "ok" };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchSubordinates(search?: string): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }

    const api = `/api/customer-utils/subordinates${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function fetchTransactionFailures(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/failure");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
//get suppliers for supplier dropdown
export async function getSuppliers(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/supplier");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

//get products for product drop down
export async function getProducts(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/product");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function fetchLeaders(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/auth-utils/users-drop-down");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

//-----------------Customers--------------------------------//

export async function fetchCustomers(
  search?: string,
  status?: string,
  categoryId?: string,
  originId?: string
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (status) {
      params.append("status", status);
    }
    if (categoryId) {
      params.append("category_id", categoryId);
    }
    if (originId) {
      params.append("customer_origin_id", originId);
    }
    const api = `/api/customer${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchCustomer(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get(`/api/generic/customer/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

export async function handleCustomerAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateCustomerSchema,
        rawData
      );

      return await updateCustomer(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createCustomerSchema,
        rawData
      );

      return await createCustomer(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateCustomer(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(`/api/customer/${id}`, dataWithoutId);

    revalidatePath("/customers");
    return {
      success: true,
      message: "اطلاعات مشتری با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createCustomer(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/customer", data);

    revalidatePath("/customers");
    return {
      success: true,
      message: "مشتری جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//--------------------files-------------------------
export async function fileAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any }> {
  try {
    return { message: "ok", success: true, data: "ok" };
  } catch (error) {
    return renderError(error);
  }
}
//-------------------Payments-----------------------------
export async function fetchPayments(
  search?: string,
  status?: string,
  categoryId?: string
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (status) {
      params.append("status", status);
    }
    if (categoryId) {
      params.append("category_id", categoryId);
    }

    const api = `/api/transaction/payments${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

export async function handlePaymentStatusAction(
  paymentId:number,
  status:string
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {

  
  try {
    const response = await axios.put(
      `/api/transaction-utils/payment-status/${paymentId}`,
      { status:status }
    );
    revalidatePath("payments");
    return {
      message: "پرداخت به وضعیت موردنظر تغییر یافت",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-------------------------------users----------------------------
export async function fetchUsers(
  search?: string,
  role?: string
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (role) {
      params.append("role", role);
    }

    const api = `/api/auth/user${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}

export async function handleUserAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;
  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(updateUserSchema, rawData);
      return await updateUser(validatedData);
    } else {
      const validatedData = validateWithZodSchema(createUserSchema, rawData);

      return await createUser(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateUser(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(`/api/auth/user/${data.id}`, dataWithoutId);

    revalidatePath("/users");
    return {
      success: true,
      message: "اطلاعات کاربر با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createUser(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/auth/user", data);

    revalidatePath("/users");
    return {
      success: true,
      message: "کاربر جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function userAssignmentAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = validateWithZodSchema(
      userAssignmentSchema,
      rawData
    );
    const res = await axios.post(
      "/api/auth-utils/assign-user",
      validatedFields
    );

    return {
      success: true,
      message: " واگذاری کاربران به سرپرست  با موفقیت انجام شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function customerAssignmentAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = validateWithZodSchema(
      customerAssignmentSchema,
      rawData
    );
    const res = await axios.post("/api/customer-utils/assign", validatedFields);
    revalidatePath("/customers");
    return {
      success: true,
      message: " واگذاری کاربران به فروشنده با موفقیت انجام شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}
//-------------------------------products----------------------------
export async function fetchProducts(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/product");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function deleteProduct(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(`/api/generic/product/${id}`);
    revalidatePath("/reference-data/products");
    return {
      success: true,
      data: response.data,
      message: "محصول موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleProductAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(updateProductSchema, rawData);

      return await updateProduct(validatedData);
    } else {
      const validatedData = validateWithZodSchema(createProductSchema, rawData);

      return await createProduct(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateProduct(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/generic/product/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/reference-data/products");
    return {
      success: true,
      message: "اطلاعات محصول با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createProduct(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/generic/product", data);
    revalidatePath("/reference-data/products");
    return {
      success: true,
      message: "محصول جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-------------------------------suppliers-products----------------------------
export async function fetchSuppliersProducts(search?: string): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }

    const api = `/api/product/product-supplier${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function deleteSupplierProduct(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(`/api/generic/product-supplier/${id}`);
    revalidatePath("/suppliers-products");
    return {
      success: true,
      data: response.data,
      message: "محصول تامین کننده موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleSupplierProductAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;
  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateSupplierProductSchema,
        rawData
      );

      return await updateSupplierProduct(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createSupplierProductSchema,
        rawData
      );

      return await createSupplierProduct(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateSupplierProduct(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/product/product-supplier/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/suppliers-products");
    return {
      success: true,
      message: "اطلاعات محصول با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createSupplierProduct(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/generic/product-supplier", data);
    revalidatePath("/suppliers-products");
    return {
      success: true,
      message: "محصول جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-----------------------------suppliers-----------------------

export async function fetchSuppliers(
  search?: string,
  categoryId?: string
): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }
    if (categoryId) {
      params.append("category_id", categoryId);
    }
    const api = `/api/product/supplier${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await axios.get(api);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function fetchSupplier(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get(`/api/product/supplier/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleSupplierAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;
  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateSupplierSchema,
        rawData
      );

      return await updateSupplier(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createSupplierSchema,
        rawData
      );

      return await createSupplier(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateSupplier(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/product/supplier/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/suppliers");
    return {
      success: true,
      message: "اطلاعات تامین کننده با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createSupplier(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/product/supplier", data);

    revalidatePath("/suppliers");
    return {
      success: true,
      message: "تامین کننده جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-------------------------------tasks----------------------------
export async function fetchTasks(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/task-type");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function deleteTaskAction(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(`/api/generic/task-type/${id}`);
    revalidatePath("/reference-data/tasks");
    return {
      success: true,
      data: response.data,
      message: "فعالیت موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleTaskAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(updateTaskSchema, rawData);

      return await updateTaskAction(validatedData);
    } else {
      const validatedData = validateWithZodSchema(createTaskSchema, rawData);

      return await createTaskAction(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateTaskAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/generic/task-type/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/reference-data/tasks");
    return {
      success: true,
      message: "اطلاعات فعالیت با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createTaskAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/generic/task-type", data);
    revalidatePath("/reference-data/tasks");
    return {
      success: true,
      message: "فعالیت جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-------------------------------failures----------------------------
export async function fetchFailures(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/failure");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function deleteFailureAction(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(`/api/generic/failure/${id}`);
    revalidatePath("/reference-data/failures");
    return {
      success: true,
      data: response.data,
      message: "دلایل شکست موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleFailureAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(updateFailureSchema, rawData);

      return await updateFailureAction(validatedData);
    } else {
      const validatedData = validateWithZodSchema(createFailureSchema, rawData);

      return await createFailureAction(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateFailureAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/generic/failure/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/reference-data/failures");
    return {
      success: true,
      message: "اطلاعات دلیل شکست با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createFailureAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/generic/failure", data);
    revalidatePath("/reference-data/failures");
    return {
      success: true,
      message: "دلیل جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-------------------------------customer-origins----------------------------
export async function fetchCustomerOrigins(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/customer-origin");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function deleteCustomerOriginAction(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(`/api/generic/customer-origin/${id}`);
    revalidatePath("/reference-data/origins");
    return {
      success: true,
      data: response.data,
      message: "مبدا موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleCustomerOriginAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateCustomerOriginSchema,
        rawData
      );

      return await updateCustomerOriginAction(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createCustomerOriginSchema,
        rawData
      );

      return await createCustomerOriginAction(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateCustomerOriginAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/generic/customer-origin/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/reference-data/origins");
    return {
      success: true,
      message: "اطلاعات مبدا با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createCustomerOriginAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/generic/customer-origin", data);
    revalidatePath("/reference-data/origins");
    return {
      success: true,
      message: "مبدا جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

//-------------------------------categories----------------------------
export async function fetchCategories(): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.get("/api/generic/category");
    return { success: true, data: response.data };
  } catch (error) {
    return renderError(error);
  }
}
export async function deleteCategoryAction(id: number): Promise<{
  success: boolean;
  data: any;
  message?: string;
}> {
  try {
    const response = await axios.delete(`/api/generic/category/${id}`);
    revalidatePath("/reference-data/categories");
    return {
      success: true,
      data: response.data,
      message: "دسته بندی موردنظر حذف شد",
    };
  } catch (error) {
    return renderError(error);
  }
}
export async function handleCategoryAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const rawData = Object.fromEntries(formData.entries());
  const isUpdate = rawData.hasOwnProperty("id") && rawData.id;

  try {
    if (isUpdate) {
      const validatedData = validateWithZodSchema(
        updateCategorySchema,
        rawData
      );

      return await updateCategoryAction(validatedData);
    } else {
      const validatedData = validateWithZodSchema(
        createCategorySchema,
        rawData
      );

      return await createCategoryAction(validatedData);
    }
  } catch (error) {
    return renderError(error);
  }
}

async function updateCategoryAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  const { id, ...dataWithoutId } = data;
  try {
    const res = await axios.put(
      `/api/generic/category/${data.id}`,
      dataWithoutId
    );

    revalidatePath("/reference-data/categories");
    return {
      success: true,
      message: "اطلاعات  دسته بندی با موفقیت به روزرسانی گردید",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

async function createCategoryAction(
  data: any
): Promise<{ message: string; success: boolean; data: any } | undefined> {
  try {
    const res = await axios.post("/api/generic/category", data);
    revalidatePath("/reference-data/categories");
    return {
      success: true,
      message: "دسته بندی جدید با موفقیت ثبت شد",
      data: res.data,
    };
  } catch (error) {
    return renderError(error);
  }
}

export const handleFileUpload = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> => {
  try {
    const rawData = Object.fromEntries(formData.entries());

    validateWithZodSchema(fileSchema, rawData);

    const response = await axios.post(`/api/customer-utils/excel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: "فایل با موفقیت آپلود شد!",
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const handleFileDownload = async (): Promise<
  { message: string; success: boolean; data: any } | undefined
> => {
  try {
    const response = await axios.get(`/api/customer-utils/excel`, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return {
      success: true,
      message: "دانلود فایل با موفقیت انجام شد!",
      data: blob,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const sendToFinanceSectionAction = async (
  paymentId: number
): Promise<{ message: string; success: boolean; data: any }> => {
  try {
    const response = await axios.put(
      `/api/transaction-utils/payment-status/${paymentId}`,
      {
        status: PaymentStatus.PENDING,
      }
    );

    return {
      success: true,
      message: " ارسال به مالی با موفقیت انجام شد!",
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const handlePaymentAttachmentUpload = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; success: boolean; data: any } | undefined> => {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const paymentId = rawData.hasOwnProperty("id") && rawData.id;
    validateWithZodSchema(fileSchema, rawData);

    const response = await axios.post(
      `/api/transaction-utils/payment-attachment/${paymentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      success: true,
      message: "فایل با موفقیت آپلود شد!",
      data: response.data,
    };
  } catch (error) {
    return renderError(error);
  }
};
