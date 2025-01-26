const errors = {
  general: {
    unknownError: "یک خطای ناشناخته رخ داده است. لطفاً مجدداً تلاش کنید.",
    networkError:
      "خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
    accessDenied: "شما اجازه دسترسی به این بخش را ندارید.",
    notFound: "منبع موردنظر پیدا نشد.",
    unaccessibleService:"سرویس در حال حاضر در دسترس نیست. لطفاً بعداً تلاش کنید.",
    validationError:"داده‌های وارد شده معتبر نیستند. لطفاً بررسی و اصلاح کنید.",
    requestsExceeded:"تعداد درخواست ها از حد مجاز فراتر رفته است! لطفا یک لحظه صبر کنید."
  },
  auth: {
    invalidCredentials: "نام کاربری یا رمز عبور اشتباه است.",
    sessionExpired: "جلسه شما به پایان رسیده است. لطفاً مجدداً وارد شوید.",
    accountLocked: "حساب شما قفل شده است. لطفاً با پشتیبانی تماس بگیرید.",
  },
  form: {
    requiredField: "پر کردن این فیلد الزامی است.",
    invalidEmail: "آدرس ایمیل وارد شده معتبر نیست.",
    passwordTooShort: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
    passwordsMismatch: "رمزهای عبور وارد شده با هم مطابقت ندارند.",
  },
  fileUpload: {
    sizeExceeded: "حجم فایل بیش از حد مجاز است.",
    invalidType: "فرمت فایل وارد شده پشتیبانی نمی‌شود.",
    uploadFailed: "آپلود فایل با خطا مواجه شد. لطفاً مجدداً تلاش کنید.",
  },
  transactions: {
    fetchFailed: "دریافت اطلاعات معاملات با مشکل مواجه شد.",
    updateFailed: "بروزرسانی اطلاعات معامله انجام نشد.",
    createFailed: "ایجاد معامله جدید با خطا مواجه شد.",
  },
  customers: {
    fetchFailed: "دریافت اطلاعات مشتریان با مشکل مواجه شد.",
    updateFailed: "بروزرسانی اطلاعات مشتری انجام نشد.",
    createFailed: "ایجاد مشتری جدید با خطا مواجه شد.",
  },
  suppliers: {
    fetchFailed: "دریافت اطلاعات تامین‌کنندگان با مشکل مواجه شد.",
    updateFailed: "بروزرسانی اطلاعات تامین‌کننده انجام نشد.",
    createFailed: "ایجاد تامین‌کننده جدید با خطا مواجه شد.",
  },
};

interface BackendError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function handleApiError(error: BackendError): string {
  if (error.response) {
    const { status } = error.response;

    switch (status) {
      case 400:
        return errors.general.unknownError;
      case 401:
        return errors.auth.invalidCredentials;
      case 403:
        return errors.general.accessDenied;
      case 404:
        return errors.general.notFound;
      case 422:
        return errors.general.validationError;
      case 500:
        return errors.general.unknownError;
      case 503:
        return errors.general.unaccessibleService;
      case 429:
        return errors.general.requestsExceeded;
      default:
        return errors.general.unknownError;
    }
  }

  if (error.message === "Network Error") {
    return errors.general.networkError;
  }

  return errors.general.unknownError;
}

export default errors;
