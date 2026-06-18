import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ép trình duyệt cuộn lên vị trí đầu trang (Top = 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Mỗi khi đường dẫn (pathname) thay đổi, useEffect sẽ chạy

  return null;
}

export default ScrollToTop;
