class ApiResponse {
  public statusCode: number;
  public data: any;
  public message: string;
  public success: boolean;

  constructor(statusCode: number, message: string = 'Success', data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || null;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
