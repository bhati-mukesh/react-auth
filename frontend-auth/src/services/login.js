import axios from "axios";

export const loginService = async (data) => {
    const { data: response } = await axios.post(
      "http://localhost:5000/api/login",
      data
    );
    return response.data;
  };

