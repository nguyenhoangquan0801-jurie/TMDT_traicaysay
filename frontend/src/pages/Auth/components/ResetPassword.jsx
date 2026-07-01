import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ResetPassword = ({ goLogin }) => {

  const { verifyOTP, resetPassword } = useAuth();

  const email = localStorage.getItem("resetEmail");

  const [loading,setLoading]=useState(false);

  const [formData,setFormData]=useState({

      otp:"",
      password:"",
      confirmPassword:""

  });

  const [error,setError]=useState("");

  const handleChange=(e)=>{

      const {name,value}=e.target;

      setFormData(prev=>({

          ...prev,

          [name]:value

      }));

  };

  const handleSubmit=async(e)=>{

      e.preventDefault();

      if(formData.password!==formData.confirmPassword){

          setError("Mật khẩu không khớp.");

          return;

      }

      setLoading(true);

      const otpResult=await verifyOTP(formData.otp);

      if(!otpResult.success){

          setLoading(false);

          setError("OTP không đúng.");

          return;

      }

      const result=await resetPassword({

          email,

          otp:formData.otp,

          password:formData.password

      });

      setLoading(false);

      if(result.success){

          alert("Đổi mật khẩu thành công.");

          localStorage.removeItem("resetEmail");

          goLogin();

      }

  };

  return(

<>
<div className="text-center mb-8">

<img
src="/images/logo.png"
alt=""
className="w-20 mx-auto mb-4"
/>

<h2 className="text-3xl font-bold">

Đặt lại mật khẩu

</h2>

<p className="text-gray-500">

{email}

</p>

</div>

<form
onSubmit={handleSubmit}
className="space-y-4"
>

<input
name="otp"
placeholder="Nhập OTP"
value={formData.otp}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

<input
type="password"
name="password"
placeholder="Mật khẩu mới"
value={formData.password}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

<input
type="password"
name="confirmPassword"
placeholder="Nhập lại mật khẩu"
value={formData.confirmPassword}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

{
error &&

<p className="text-red-500 text-sm">

{error}

</p>

}

<button

className="w-full bg-green-600 py-3 rounded-xl text-white"

>

{

loading

?

"Đang cập nhật..."

:

"Đổi mật khẩu"

}

</button>

</form>

<button

onClick={goLogin}

className="mt-6 text-green-600 w-full hover:underline"

>

Quay lại đăng nhập

</button>

</>

);

};

export default ResetPassword;