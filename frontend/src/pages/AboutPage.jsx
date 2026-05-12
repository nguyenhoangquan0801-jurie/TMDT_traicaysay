const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
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
              NÔNG LÂM STORE
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
              Câu Chuyện
              <span className="block text-green-600 mt-2">
                Của Chúng Tôi
              </span>
            </h1>

            <p
              className="
                max-w-3xl
                mx-auto
                mt-8
                text-lg
                md:text-xl
                text-gray-500
                leading-relaxed
              "
            >
              Chúng tôi tin rằng thực phẩm sạch không chỉ là xu hướng,
              mà còn là nền tảng cho một cuộc sống khỏe mạnh và bền vững.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div
          className="
            bg-white
            rounded-[36px]
            shadow-xl
            border
            border-gray-100
            overflow-hidden
          "
        >
          <div className="grid lg:grid-cols-2">
            {/* IMAGE */}
            <div className="bg-green-100 min-h-[350px] lg:min-h-full flex items-center justify-center p-10">
              <div
                className="
                  w-full
                  h-full
                  rounded-[28px]
                  bg-gradient-to-br
                  from-green-200
                  to-green-400
                  flex
                  items-center
                  justify-center
                "
              >
                <div className="text-center text-white">
                  <h2 className="text-5xl font-bold">
                    Fresh
                  </h2>

                  <p className="mt-4 text-lg opacity-90">
                    Organic • Natural • Healthy
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-10 md:p-14">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Hành trình xây dựng thương hiệu
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Nông Lâm Store được thành lập với sứ mệnh mang đến
                  những sản phẩm trái cây sấy và hạt dinh dưỡng chất
                  lượng cao, an toàn cho sức khỏe người tiêu dùng.
                </p>

                <p>
                  Chúng tôi trực tiếp hợp tác với nông dân và các trang
                  trại tại nhiều tỉnh thành để lựa chọn nguồn nguyên
                  liệu tươi ngon, đảm bảo quy trình sản xuất sạch và giữ
                  nguyên giá trị dinh dưỡng tự nhiên.
                </p>

                <p>
                  Từ khâu thu hoạch, chế biến đến đóng gói, mọi sản phẩm
                  đều được kiểm soát nghiêm ngặt nhằm mang đến sự an tâm
                  và trải nghiệm tốt nhất cho khách hàng.
                </p>

                <p>
                  Không chỉ cung cấp thực phẩm, chúng tôi mong muốn lan
                  tỏa lối sống xanh, lành mạnh và bền vững đến cộng đồng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Giá Trị Cốt Lõi
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Những điều tạo nên sự khác biệt của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* ITEM */}
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                text-green-700
              "
            >
              01
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6">
              Chất lượng
            </h3>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Cam kết sử dụng nguồn nguyên liệu tự nhiên và quy trình
              sản xuất an toàn.
            </p>
          </div>

          {/* ITEM */}
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                text-green-700
              "
            >
              02
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6">
              Uy tín
            </h3>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Minh bạch về nguồn gốc sản phẩm và luôn đặt trải nghiệm
              khách hàng lên hàng đầu.
            </p>
          </div>

          {/* ITEM */}
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                text-green-700
              "
            >
              03
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6">
              Bền vững
            </h3>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Hướng đến mô hình kinh doanh xanh và hỗ trợ phát triển
              nông nghiệp địa phương.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6">
        <div
          className="
            max-w-5xl
            mx-auto
            rounded-[36px]
            bg-green-600
            px-10
            py-16
            text-center
            text-white
            shadow-2xl
          "
        >
          <h2 className="text-4xl font-bold">
            Cùng chúng tôi xây dựng lối sống lành mạnh
          </h2>

          <p className="mt-5 text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
            Mang thiên nhiên gần hơn với cuộc sống hàng ngày thông qua
            những sản phẩm sạch, an toàn và giàu dinh dưỡng.
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
            Khám phá sản phẩm
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;