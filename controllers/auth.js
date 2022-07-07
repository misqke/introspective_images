import axios from "axios";

export const authenticate = async () => {
  try {
    const { data } = await axios.get(`/api/auth/authenticate`);
    if (data.error) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
