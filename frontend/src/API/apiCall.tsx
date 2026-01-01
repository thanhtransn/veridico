import axios from "axios";
const BASE_URL = "http://localhost:5000/";
export async function publicRequest(request: {path: string, method: string, data?: Record<string, unknown>}) {
  try {
    const {path, method, data} = request
    const result = await axios.request({
      baseURL: BASE_URL,
      url: path,
      method,
      data
    });
    if ([200, 201].includes(result.status)) return result.data;
  } catch (error: any) {
    if (error.response.data.code === 200400) alert("Validate Error")
    else alert("Something Went Wrong !!!");
  }
}

export async function authenticatedRequest(request: {path: string, method: string, data?: Record<string, unknown>}) {
  try {
    const {path, method, data} = request
    const result = await axios.request({
      baseURL: BASE_URL,
      url: path,
      method,
      data,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if ([200, 201].includes(result.status)) return result.data;
  } catch (error: any) {
    if (error.response.data.statusCode === 403) {
      alert("current user is not allowed for operation")
    }
    else if (error.response.data.code === 200400) {
      alert("Validate Error")
    }
    else if (error.response.data.statusCode === 401){
      (window as Window).location = "/signIn";
    }
    else throw new Error(error.response.data.debug)
    return
  }
}
