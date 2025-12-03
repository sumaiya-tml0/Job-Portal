class ApiResponse {
  constructor(statusCode, data, mesasage = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = mesasage;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
