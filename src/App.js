import "./App.css";
import axios from "axios";
import { API_URL } from "./http";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAuth() {
      if (localStorage.getItem("token")) {
        try {
          const response = await axios.get(`${API_URL}/users/refresh`, {
            withCredentials: true,
          });
          localStorage.setItem("token", response.data.accessToken);
          navigate("/posts");
        } catch (error) {
          navigate("/login");
          console.log(error?.response?.data?.message);
        }
      }
    }
    checkAuth();
  }, []);

  return <div></div>;
}

export default App;
