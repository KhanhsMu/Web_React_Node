import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Trang không tồn tại</p>
      <Link to="/login" className="text-blue-500 mt-4 inline-block">Quay về đăng nhập</Link>
    </div>
  );
}
