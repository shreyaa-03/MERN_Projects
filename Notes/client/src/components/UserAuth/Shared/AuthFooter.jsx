import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AuthFooter() {
  const currentPage = useSelector((state) => state.page.currentPage);

  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {currentPage === "register" ? (
        <>
          Already Signed Up?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            SIGN IN
          </Link>
        </>
      ) : (
        <>
          Not Registered?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            REGISTER HERE
          </Link>
        </>
      )}
    </p>
  );
}
