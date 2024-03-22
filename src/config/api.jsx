// import apiService from "../services/apiService";
import apiService from "../services/apiService";

// get access token from local storage
export const getAccessToken = () => {
  return localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
};

// forget password  api
export const forgetPassword = async (userData) => {
  try {
    const response = await apiService.post("/auth/password-reset", userData);
    return response.data;
  } catch (error) {
    throw new Error("Forget password failed: " + error.message);
  }
};

/// resgisterUser
export const resgisterUser = async (userData) => {
  try {
    const response = await apiService.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error("register failed: " + error.message);
  }
};

// resetpassword
export const resetPassword = async (userData) => {
  try {
    const response = await apiService.post("/auth/password-reset", userData);
    return response.data;
  } catch (error) {
    throw new Error("reset failed: " + error.message);
  }
};

/// codeverificatiion
export const verifyCode = async (userData) => {
  try {
    const response = await apiService.post("/auth/password-reset", userData);
    return response.data;
  } catch (error) {
    throw new Error("reset failed: " + error.message);
  }
};

// contact us api
export const contactUs = async (userData) => {
  try {
    const response = await apiService.post("/contactus/", userData);
    return response.data;
  } catch (error) {
    throw new Error("contact us failed: " + error.message);
  }
};

// subscribe to newsletter
export const subscribeToNewsletter = async (emailObject) => {
  try {
    const response = await apiService.post("/subscribe/" + emailObject.email);
    return response.data;
  } catch (error) {
    throw new Error(
      "subscribe failed: " + error.response.data.detail[0].msg
        ? error.response.data.detail[0].msg
        : error.message
    );
  }
};

// get trending campaigns
export const getTrendingCampaigns = async () => {
  try {
    const response = await apiService.get("/campaign/trending/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch featured campaign:", error);
    return null;
  }
};

// get featured campaign
export const getFeaturedCampaign = async () => {
  try {
    const response = await apiService.get("/campaign/featured/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch featured campaign:", error);
    return null;
  }
};

// get categories
export const getCampaignCategories = async () => {
  try {
    const response = await apiService.get("/campaign_category/list/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.data.campaign_categories;
  } catch (error) {
    console.error("Failed to fetch featured campaign:", error);
    return null;
  }
};
