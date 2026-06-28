const SocialLogin = () => {

  const handleFacebook = () => {
    console.log("Facebook Login");
  };

  const handleGoogle = () => {
    console.log("Google Login");
  };

  return (
    <>
      <div className="flex items-center my-8">
        <div className="flex-1 border-t"></div>

        <span className="px-4 text-gray-500 text-sm">
          Hoặc tiếp tục với
        </span>

        <div className="flex-1 border-t"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={handleFacebook}
          className="border rounded-xl py-3 hover:bg-blue-50 transition flex items-center justify-center gap-2"
        >
          <span className="text-xl">
            📘
          </span>

          Facebook
        </button>

        <button
          onClick={handleGoogle}
          className="border rounded-xl py-3 hover:bg-red-50 transition flex items-center justify-center gap-2"
        >
          <span className="text-xl">
            🌐
          </span>

          Google
        </button>

      </div>
    </>
  );
};

export default SocialLogin;