import axios from "axios";

export const authenticate = async () => {
  const { data } = await axios.get(`/api/auth/authenticate`);
  if (data.error) {
    return false;
  } else {
    return true;
  }
};
