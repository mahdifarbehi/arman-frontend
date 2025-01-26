import * as z from "zod";
import {
  TransactionStatus,
  PaymentType,
  PaymentStatus,
  MaritalStatus,
  Role,
  CustomerStatus,
} from "./types";
import { persianToISO } from "./dateConvertor";

//----------------utility functions--------------------------
// export function validateWithZodSchema<T>(
//   schema: ZodSchema<T>,
//   data: unknown
// ): T {
//   const result = schema.safeParse(data);
//   if (!result.success) {
//     console.log(result.error);
//     const errors = result.error.errors.map((error) => error.message);
//     throw new Error(errors.join(","));
//   }
//   return result.data;
// }
export function validateWithZodSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

const isValidNationalCode = (nationalCode: string): boolean => {
  if (!/^\d{10}$/.test(nationalCode)) return false;

  const digits = nationalCode.split("").map(Number);
  const checkDigit = digits[9];
  const sum = digits
    .slice(0, 9)
    .reduce((acc, digit, index) => acc + digit * (10 - index), 0);
  const remainder = sum % 11;

  return remainder < 2
    ? checkDigit === remainder
    : checkDigit === 11 - remainder;
};
const validateShabaNumber = (shaba: string) => {
  if (shaba.length !== 26) {
    return false; // Must be exactly 26 characters
  }
  if (!shaba.startsWith("IR")) {
    return false; // Must start with "IR"
  }
  const numericShaba = shaba
    .substring(2) // Remove "IR"
    .concat("1827") // Replace "IR" with its numeric equivalent (IR -> 1827)
    .replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString()); // Convert letters to numbers

  // Perform IBAN checksum validation
  const mod97 = numericShaba.match(/\d{1,7}/g)?.reduce((acc, block) => {
    return (parseInt(acc + block, 10) % 97).toString();
  }, "0");

  return mod97 === "1";
};
function validateFile() {
  const maxUploadSize = 1024 * 1024 * 10; // 10 MB
  const acceptedFilesTypes = [
    "image/",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  return z
    // .instanceof(File)
    // .refine((file) => {
    //   return !file || file.size <= maxUploadSize;
    // }, "اندازه فایل باید کمتر از ۱۰ مگابایت باشد")
    // .refine((file) => {
    //   return (
    //     !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
    //   );
    // }, "فایل  انتخابی باید یک عکس یا فایل word یا excel باشد");
}
//-----------------------image shema--------------------------
export const fileSchema = z.object({
  file: validateFile(),
});

//-------------------customer schema----------------------------
export const createProductSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
  category_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "دسته بندی الزامی است")),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//-------------------task schema----------------------------
export const createTaskSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//-------------------failure schema----------------------------
export const createFailureSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
});

export const updateFailureSchema = createFailureSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//-------------------customerOrigin schema----------------------------
export const createCustomerOriginSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
});

export const updateCustomerOriginSchema = createCustomerOriginSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//-------------------category schema----------------------------
export const createCategorySchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});
//------------------user schema-------------------------
export const createUserSchema = z.object({
  username: z.string().min(6, "نام کاربری حداقل باید ۶ کاراکتر باشد "),
  phone: z.string().min(11, "شماره تماس شخصی الزامی است"),
  marital_status: z
    .enum([MaritalStatus.SINGLE, MaritalStatus.MARRIED])
    .refine((value) => Object.values(MaritalStatus).includes(value), {
      message: "وضعیت تاهل انتخاب شده معتبر نیست",
    })
    .optional(),
  role: z
    .enum([
      Role.ADMIN,
      Role.PRODUCT_MANAGER,
      Role.SALES_AGENT,
      Role.SALES_MANAGER,
      Role.PAYMENT_MANAGER,
    ])
    .refine((value) => Object.values(Role).includes(value), {
      message: "سمت انتخاب شده معتبر نیست",
    }),
  leader: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().optional()),
  password: z.string().min(6, "پسورد حدااقل باید ۶ کاراکتر باشد"),
  fullname: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  national_code: z
    .string()
    .refine(isValidNationalCode, { message: "کد ملی معتبر نیست" }),
  birth_certificate_number: z.string().optional(),
  place_of_issue: z.string().optional(),
  place_of_birth: z.string().optional(),
  father_name: z.string().min(1, "نام پدر الزامی است"),
  address: z.string().optional(),
  bank_name: z.string().optional(),
  bank_account_number: z.string().optional(),
  shaba_number: z
    .string()
    .startsWith("IR", "شماره شبا باید با IR شروع شود")
    .regex(
      /^IR\d{22}$/,
      "شماره شبا باید شامل 24 کاراکتر باشد و بعد از IR شروع شود  "
    ),
  // shaba_number: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (value) => !value || validateShabaNumber(value),
  //     "شماره شبا معتبر نیست"
  //   ),
  employee_id: z.string().optional(),
  work_phone: z
    .string()
    // .min(11, "شماره تماس کاری  حداقل باید 11 کاراکتر باشد")
    .optional(),
  has_headphone: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return false;
    return Boolean(val);
  }, z.boolean().optional()),
  has_pc: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return false;
    return Boolean(val);
  }, z.boolean().optional()),
  monthly_target: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().optional()),
});

export const updateUserSchema = createUserSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//-----------------------customer and user assignment schema---------------
export const customerAssignmentSchema = z.object({
  user_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "آیدی فروشنده الزامی است")),
  customer_ids: z.preprocess((val) => {
    if (typeof val === "string") {
      return val
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));
    }
    return [];
  }, z.array(z.number()).nonempty("حداقل یک مشتری الزامی است")),
});

export const userAssignmentSchema = z.object({
  leader_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "آیدی سرپرست الزامی است")),
  user_ids: z.preprocess((val) => {
    if (typeof val === "string") {
      return val
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));
    }
    return [];
  }, z.array(z.number()).nonempty("حداقل یک کاربر الزامی است")),
});
//--------------------profile schema-----------------------
export const profileSchema = z.object({
  username: z.string().nonempty("نام کاربری الزامی است"),
  password: z
    .string()
    .nonempty(" رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

//-------------------customer schema----------------------------
export const createCustomerSchema = z.object({
  fullname: z.string().optional(),
  company: z.string().optional(),
  email: z.preprocess((val) => (val === "" ? undefined : val), z.string().email().optional()),
  website: z.string().optional(),
  description: z.string().optional(),
  status: z
    .enum([
      CustomerStatus.NEW,
      CustomerStatus.INACTIVE,
      CustomerStatus.ACTIVE,
    ])
    .refine((value) => Object.values(CustomerStatus).includes(value), {
      message: "وضعیت انتخاب شده معتبر نیست",
    }),
  category_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().nullable()),
  origin_id: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "مبدا الزامی است")
  ),
  phones: z
    .string()
    .refine(
      (val) => {
        try {
          const parsed = JSON.parse(val);
          return (
            Array.isArray(parsed) &&
            parsed.every(
              (item) =>
                typeof item === "object" &&
                "phone" in item &&
                "main_number" in item &&
                /^[0]9\d{9}$/.test(item.phone)
            )
          );
        } catch (e) {
          return false;
        }
      },
      {
        message: "فرمت شماره تلفن‌ها صحیح نیست یا شماره‌ها معتبر نیستند",
      }
    )
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch (e) {
        return [];
      }
    })
    .optional(),
  assigned_to: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "فروشنده الزامی است")
  ),
});

export const updateCustomerSchema = createCustomerSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//-------------------transaction schema--------------------------
export const createTransactionSchema = z.object({
  title: z.string().min(1, "عنوان ضروری است"),
  customer_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "شناسه مشتری باید عدد مثبت باشد")),
  category_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "شناسه دسته‌بندی باید عدد مثبت باشد")),
  status: z
    .enum([
      TransactionStatus.NEW,
      TransactionStatus.COMPLETED,
      TransactionStatus.FAILED,
    ])
    .refine((value) => Object.values(TransactionStatus).includes(value), {
      message: "وضعیت انتخاب شده معتبر نیست",
    }),
  failure_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "" || isNaN(Number(val)))
      return null;
    return Number(val);
  }, z.number().nullable()),
  description: z.string().optional(),
});

export const updateTransactionSchema = createTransactionSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//------------------------transaction task schema-----------------
export const createTransactionTaskSchema = z.object({
  transaction_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "آیدی معامله الزامی است")),
  task_type_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "شناسه نوع فعالیت باید عدد مثبت باشد")),
  task_date: z.string().min(1, "تاریخ و ساعت فعالیت الزامی است"),
  status: z
    .enum([
      TransactionStatus.NEW,
      TransactionStatus.COMPLETED,
      TransactionStatus.FAILED,
    ])
    .refine((value) => Object.values(TransactionStatus).includes(value), {
      message: "وضعیت انتخاب شده معتبر نیست",
    })
    .optional(),
  description: z.string().optional(),
});

export const updateTransactionTaskSchema = createTransactionTaskSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

//------------------------transaction payment schema-----------------
export const createTransactionPaymentSchema = z.object({
  transaction_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "آیدی معامله الزامی است")),
  amount: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "مبلغ الزامی است")),
  date: z.string().min(1, "تاریخ و ساعت  الزامی است"),
  payment_type: z
    .enum([PaymentType.CASH, PaymentType.INSTALLMENT], {
      errorMap: () => ({ message: "نوع پرداخت انتخاب شده معتبر نیست" }),
    })
    .refine((value) => Object.values(PaymentType).includes(value), {
      message: "نوع الزامی است",
    }),
});

export const updateTransactionPaymentSchema =
  createTransactionPaymentSchema.extend({
    id: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "آیدی الزامی است")
    ),
  });

//------------------------transaction product schema-----------------
export const createTransactionProductSchema = z.object({
  transaction_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "آیدی معامله الزامی است")),
  product_supplier_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, " محصول الزامی است")),
  quantity: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "تعداد الزامی است")),
  discount: z.preprocess((val) => {
    if (val === undefined || val === null || val === "" || false) {
      return false;
    }
    return Boolean(val);
  }, z.boolean()),
});

export const updateTransactionProductSchema =
  createTransactionProductSchema.extend({
    id: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "آیدی الزامی است")
    ),
  });

//----------------------supplier schema-------------------------
export const createSupplierSchema = z.object({
  company_name: z.string().min(1, "نام شرکت ضروری است"),
  contact_name: z.string().optional(),
  category_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "شناسه دسته‌بندی باید عدد مثبت باشد")),
  phones: z
    .string()
    .refine(
      (val) => {
        try {
          const parsed = JSON.parse(val);

          return (
            Array.isArray(parsed) &&
            parsed.every(
              (item) =>
                typeof item === "object" &&
                "phone" in item &&
                "main_number" in item
            )
          );
        } catch (e) {
          return false;
        }
      },
      {
        message: "فرمت شماره تلفن‌ها صحیح نیست",
      }
    )
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch (e) {
        return [];
      }
    }),
  description: z.string().optional(),
  quality: z.string().optional(),
});

export const updateSupplierSchema = createSupplierSchema.extend({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "آیدی باید عددی باشد",
    })
    .transform((val) => Number(val)), // Convert string to number
});

//-------------------------payment schema---------------------------
export const paymentSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(1, "عنوان الزامی است"),
  customer: z.string().min(1, "نام مشتری الزامی است"),
  amount: z.number().min(1, "مبلغ باید بزرگتر از صفر باشد"),
  attachment: z.string().url("لینک پیوست نامعتبر است"),
  payment_type: z.nativeEnum(PaymentType, {
    errorMap: () => ({ message: "نوع پرداخت نامعتبر است" }),
  }),
  status: z.nativeEnum(PaymentStatus, {
    errorMap: () => ({ message: "وضعیت پرداخت نامعتبر است" }),
  }),
  category_id: z.string().min(1, "دسته‌بندی الزامی است"),
  phone: z.string().min(1, "شماره تلفن الزامی است"),
  status_change_date: z.string().nullable(),
  sales_agent: z.string().min(1, "نام فروشنده الزامی است"),
  description: z.string().optional(),
});

//-----------------------supplierproduct schema-----------------------
export const createSupplierProductSchema = z.object({
  supplier_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "شناسه تامین کننده الزامی است")),
  product_id: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(1, "شناسه محصول الزامی است")),
  unit: z.string().min(1, "واحد الزامی است"),
  purchase_price: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(0, "قیمت خرید باید عددی مثبت باشد")),
  selling_price: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(0, "قیمت فروش باید عددی مثبت باشد")),
  inventory: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(0, "موجودی باید عددی مثبت باشد")),
  commission: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(0, "کمیسیون باید عددی مثبت باشد")),
  discount: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return Number(val);
  }, z.number().min(0, "تخفیف باید عددی مثبت باشد").optional()),
  installment: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return false;
    return Boolean(val);
  }, z.boolean().optional()),
  description: z.string().optional(),
  purchase_price_date: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return persianToISO(val.toString());
  }, z.string().nullable()),
  selling_price_date: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return persianToISO(val.toString());
  }, z.string().nullable()),
  inventory_date: z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return null;
    return persianToISO(val.toString());
  }, z.string().nullable()),
  quality: z.string().optional(),
});

export const updateSupplierProductSchema = createSupplierProductSchema.extend({
  id: z.preprocess((val) => Number(val), z.number().min(1, "آیدی الزامی است")),
});

