

# Hướng dẫn tích hợp Đăng nhập bằng Google (OAuth2) cho Spring Boot

Để ứng dụng của bạn có thể xác thực người dùng qua Google, bạn cần thực hiện cấu hình trên Google Cloud Console và kết nối vào dự án Spring Boot.

## I. Yêu cầu tiên quyết (Điều kiện cần)

Trước khi bắt đầu, hãy đảm bảo tài khoản Google bạn dùng để tạo dự án đáp ứng các điều kiện bảo mật sau:

1. **Bảo mật 2 lớp (2FA):** Tài khoản Google của bạn **bắt buộc phải bật xác minh 2 bước** để đảm bảo an toàn cho các ứng dụng có truy cập vào thông tin nhạy cảm.
2. **Số điện thoại xác thực:** Tài khoản phải được cập nhật số điện thoại chính chủ để nhận mã OTP trong quá trình xác thực.
3. **Dự án Google Cloud:** Bạn cần tạo một dự án mới trên [Google Cloud Console](https://console.cloud.google.com/).

---

## II. Các bước lấy Client ID và Client Secret

### 1. Cấu hình Màn hình đồng ý (OAuth Consent Screen)

* Truy cập **APIs & Services** > **OAuth consent screen**.
* Chọn **External** > **Create**.
* Điền thông tin ứng dụng (Tên, Email hỗ trợ).
* Ở phần **Scopes**, thêm các phạm vi: `email`, `profile`, `openid`.
* Nhấn **Save and Continue**.

### 2. Tạo Credentials

* Vào mục **Credentials** > **Create Credentials** > **OAuth client ID**.
* Chọn **Application type**: **Web application**.
* Tại mục **Authorized redirect URIs**, thêm địa chỉ sau:
`http://localhost:8080/login/oauth2/code/google`
* Nhấn **Create**. Hệ thống sẽ cấp cho bạn **Client ID** và **Client Secret**.

---

## III. Cấu hình trong dự án Spring Boot

Mở file `src/main/resources/application.properties` và thêm cấu hình sau:

```properties
# Thay thế bằng mã thật của bạn
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
spring.security.oauth2.client.registration.google.scope=email,profile

```

---

## IV. Lưu ý bảo mật quan trọng

> ⚠️ **CẢNH BÁO:**
> * **Không bao giờ** chia sẻ hoặc đẩy file `application.properties` (có chứa `client-secret`) lên GitHub hoặc các nền tảng lưu trữ công khai.
> * Hãy sử dụng các tệp tin cấu hình môi trường hoặc file `.gitignore` để loại bỏ file này khỏi Git.
> * Nếu lỡ lộ mã, hãy truy cập ngay vào Google Cloud Console để nhấn **Reset Secret** để hủy mã cũ và cấp mã mới ngay lập tức.
> 
> 



Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
