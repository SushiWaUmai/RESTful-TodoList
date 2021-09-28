import { FieldError } from "@shared/utils/Error";

export const toErrorMap = (error: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  error.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
