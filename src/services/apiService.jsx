import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../auth/context/AuthContext";

function trimURL(url) {
  return url.replace(/\/v1(?=\/|$)/, "");
}

const baseURL = process.env.REACT_APP_API_URL;
const refreshURL = trimURL(baseURL);
console.log("baseURL", baseURL);
console.log("refreshURL", refreshURL);

const useApiService = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("isExpired", isExpired);

    //     if (!isExpired) return req;
    console.log("access", authTokens.access);
    const response = await axios.post(`${refreshURL}/token/refresh/`, {
      refresh: authTokens.refresh,
      headers: {
        "Content-Type": "application/json",
      },
      Authorization: `Bearer ${authTokens.access}`,
    });
    console.log("response", response);
    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useApiService;