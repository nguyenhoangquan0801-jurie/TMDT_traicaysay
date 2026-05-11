const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="
              inline-block
              px-5
              py-2
              rounded-full
              bg-green-100
              text-green-700
              text-sm
              font-semibold
              tracking-wide
            "
          >
            CONTACT US
          </span>

          <h1
            className="
              text-4xl
              md:text-6xl
              font-bold
              text-gray-800
              mt-6
              leading-tight
            "
          >
            Liên Hệ Với
            <span className="block text-green-600 mt-2">
              Nông Lâm Store
            </span>
          </h1>

          <p
            className="
              max-w-3xl
              mx-auto
              mt-8
              text-lg
              text-gray-500
              leading-relaxed
            "
          >
            Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc
            về sản phẩm, đơn hàng và dịch vụ.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div
            className="
              bg-white
              rounded-[36px]
              shadow-xl
              border
              border-gray-100
              p-8
              md:p-10
            "
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Gửi tin nhắn cho chúng tôi
              </h2>

              <p className="text-gray-500 mt-3">
                Điền thông tin bên dưới và chúng tôi sẽ phản hồi
                sớm nhất có thể.
              </p>
            </div>

            <form className="space-y-5">
              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên
                </label>

                <input
                  type="text"
                  placeholder="Nhập họ tên..."
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    outline-none
                    focus:border-green-500
                    focus:ring-4
                    focus:ring-green-100
                    transition-all
                    duration-200
                  "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Nhập email..."
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    outline-none
                    focus:border-green-500
                    focus:ring-4
                    focus:ring-green-100
                    transition-all
                    duration-200
                  "
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>

                <input
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    outline-none
                    focus:border-green-500
                    focus:ring-4
                    focus:ring-green-100
                    transition-all
                    duration-200
                  "
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nội dung
                </label>

                <textarea
                  rows="5"
                  placeholder="Nhập nội dung liên hệ..."
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    outline-none
                    resize-none
                    focus:border-green-500
                    focus:ring-4
                    focus:ring-green-100
                    transition-all
                    duration-200
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  shadow-lg
                  hover:shadow-xl
                "
              >
                Gửi liên hệ
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* INFO */}
            <div
              className="
                bg-white
                rounded-[36px]
                shadow-xl
                border
                border-gray-100
                p-8
              "
            >
              <h2 className="text-3xl font-bold text-gray-800">
                Thông tin liên hệ
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Bạn có thể liên hệ với chúng tôi thông qua các
                thông tin bên dưới.
              </p>

              <div className="mt-8 space-y-6">
                {/* ADDRESS */}
                <div
                  className="
                    p-5
                    rounded-3xl
                    bg-gray-50
                    border
                    border-gray-100
                  "
                >
                  <p className="text-sm font-semibold text-green-700">
                    Địa chỉ
                  </p>

                  <p className="text-gray-700 mt-2 leading-relaxed">
                    123 Đường Nông Lâm, Quận Thủ Đức,
                    TP. Hồ Chí Minh
                  </p>
                </div>

                {/* PHONE */}
                <div
                  className="
                    p-5
                    rounded-3xl
                    bg-gray-50
                    border
                    border-gray-100
                  "
                >
                  <p className="text-sm font-semibold text-green-700">
                    Hotline
                  </p>

                  <p className="text-gray-700 mt-2">
                    0123 456 789
                  </p>
                </div>

                {/* EMAIL */}
                <div
                  className="
                    p-5
                    rounded-3xl
                    bg-gray-50
                    border
                    border-gray-100
                  "
                >
                  <p className="text-sm font-semibold text-green-700">
                    Email
                  </p>

                  <p className="text-gray-700 mt-2">
                    support@nonglamstore.vn
                  </p>
                </div>

                {/* HOURS */}
                <div
                  className="
                    p-5
                    rounded-3xl
                    bg-gray-50
                    border
                    border-gray-100
                  "
                >
                  <p className="text-sm font-semibold text-green-700">
                    Giờ hoạt động
                  </p>

                  <p className="text-gray-700 mt-2">
                    08:00 - 21:00 • Thứ 2 - Chủ nhật
                  </p>
                </div>
              </div>
            </div>

            {/* SUPPORT BOX */}
            <div
              className="
                rounded-[36px]
                bg-green-600
                p-10
                text-white
                shadow-2xl
              "
            >
              <h3 className="text-3xl font-bold leading-snug">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn
              </h3>

              <p className="mt-5 text-green-100 leading-relaxed">
                Đội ngũ chăm sóc khách hàng của Nông Lâm Store
                luôn đồng hành để mang đến trải nghiệm tốt nhất.
              </p>

              <button
                className="
                  mt-8
                  px-8
                  py-4
                  rounded-2xl
                  bg-white
                  text-green-700
                  font-semibold
                  hover:bg-green-50
                  transition-all
                  duration-300
                  shadow-lg
                "
              >
                Liên hệ ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;