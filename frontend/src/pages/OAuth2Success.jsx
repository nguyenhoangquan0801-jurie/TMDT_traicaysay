import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OAuth2Success = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if (!token) {
            navigate("/login");
            return;
        }

        localStorage.setItem("accessToken", token);

        axios.get(
            "http://localhost:8080/api/auth/me",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        ).then(res=>{

            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );

            navigate("/");

        });

    },[navigate]);

    return <p>Đang đăng nhập...</p>;
};

export default OAuth2Success;