import { useAuth } from "../../../context/AuthContext";

const SocialLogin = () => {
  const { loginGoogle, loginFacebook } = useAuth();

  return (
    <div className="mt-8">

      <div className="flex items-center gap-4 mb-5">

        <div className="flex-1 h-px bg-gray-200"></div>

        <span className="text-sm text-gray-500">
          Hoặc tiếp tục với
        </span>

        <div className="flex-1 h-px bg-gray-200"></div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={loginGoogle}
          className="border rounded-xl py-3 hover:bg-gray-50 transition"
        >

          <img
            src="/images/auth/google-logo.webp"
            alt=""
            className="w-6 mx-auto"
          />

        </button>

        <button
          onClick={loginFacebook}
          className="border rounded-xl py-3 hover:bg-gray-50 transition"
        >

          <img
            src="/images/auth/Facebook_Logo.png"
            alt=""
            className="w-6 mx-auto"
          />

        </button>

      </div>

    </div>
  );
};

export default SocialLogin;