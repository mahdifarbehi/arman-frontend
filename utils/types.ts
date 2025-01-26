export type actionFunction = (
  prevState,
  formData: FormData
) => Promise<{ message?: string; success: boolean; data } | undefined>;

export enum TransactionStatus {
  NEW = "NEW",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export enum TaskStatus {
  NEW = "NEW",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export enum CustomerStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum PaymentStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export interface TaskType {
  id: 1;
  title: string;
  description: string;
}
export enum PaymentType {
  CASH = "CASH",
  INSTALLMENT = "INSTALLMENT",
}
export enum Role {
  ADMIN = "ADMIN",
  SALES_MANAGER = "SALES_MANAGER",
  PAYMENT_MANAGER = "PAYMENT_MANAGER",
  PRODUCT_MANAGER = "PRODUCT_MANAGER",
  SALES_AGENT = "SALES_AGENT",
}
export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
}
export type Phone = {
  phone: string;
  main_number: boolean;
};
export interface Customer {
  id: number;
  fullname: string;
  category: { id: number; title: string };
  email: string;
  website: string;
  status: TransactionStatus;
  company: string;
  phone: string;
  origin: { id: number; title: string };
  assigned_to: {
    id: number;
    username: string;
    fullname: string;
    role: Role;
  };
  description?: string;
  phones: Phone[];
}
export interface Transaction {
  id: number;
  title: string;
  category: Category;
  customer: Customer;
  status: TransactionStatus;
  failure: Failure;
  description: string;
  created_by_user: { id: number; fullname: string };
}

export interface Failure {
  id: number;
  title: string;
}
export interface Payment {
  id: number;
  title: string;
  category: string;
  customer: string;
  phone: string;
  status: PaymentStatus;
  status_change_date: string;
  sales_agent: string;
  payment_type: PaymentType;
  amount: number;
  attachment: string;
}

export interface User {
  id: number;
  username: string;
  phone: string;
  marital_status: MaritalStatus;
  role: Role;
  leader_user: { id: number; fullname: string };
  password: string;
  fullname: string;
  national_code: string;
  birth_certificate_number: string;
  place_of_issue: string;
  place_of_birth: string;
  date_of_birth: string;
  father_name: string;
  address: string;
  bank_name: string;
  bank_account_number: string;
  shaba_number: string;
  employee_id: string;
  work_phone: string;
  has_headphone: boolean;
  has_pc: boolean;
  monthly_target: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
}
export interface SupplierProduct {
  id: number;
  product: Product;
  supplier: {
    id: number;
    company_name: string;
    contact_name: string;
    quality: string;
  };
  quality: string;
  unit: string;
  purchase_price: number;
  selling_price: number;
  inventory: number;
  purchase_price_date: string;
  selling_price_date: string;
  inventory_date: string;
  discount_price: number;
  commission: number;
  installment: boolean;
  description: string;
}
export interface Category {
  id: number;
  title: string;
}

export interface Supplier {
  id: number;
  category: Category;
  company_name: string;
  phones: Phone[];
  contact_name: string;
  description: string;
  quality: string;
}

export interface TransactionTask {
  description: string;
  finish_data: string;
  id: number;
  message: boolean;
  status: TransactionStatus;
  task_date: string;
  task_type: { id: number; title: string };
  transaction_id: number;
}
