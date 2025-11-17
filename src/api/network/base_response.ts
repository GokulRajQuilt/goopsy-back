export interface BaseResponse<T> {
  success: boolean;
  errorCode: number;
  message: string;
  errorMessage: string;
  data: T | null;
  timestamp: number;
  requestId?: string;
}

export function success<T>(message: string, data: T) {
  return {
    success: true,
    errorCode: 0,
    message,
    data,
    timestamp: Date.now(),
  };
}

export function failure(errorCode: number, errorMessage: string) {
  return {
    success: false,
    errorCode,
    errorMessage,
    data: null,
    timestamp: Date.now(),
  };
}
