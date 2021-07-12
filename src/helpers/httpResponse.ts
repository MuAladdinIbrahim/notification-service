const resFormatter = {
  success: (message: any, results: any, statusCode: any) => {
    return {
      message,
      error: false,
      code: statusCode,
      results,
    };
  },
  error: (message: any, statusCode: number) => {
    return {
      message: message?.message || message,
      code: statusCode,
      error: true,
    };
  },
  validationError: (errors: any) => {
    return {
      message: errors,
      error: true,
      code: 422,
      results: null,
    };
  },
};

export default resFormatter;