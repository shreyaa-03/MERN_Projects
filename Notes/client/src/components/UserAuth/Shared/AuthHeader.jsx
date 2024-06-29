import { useSelector } from "react-redux";

export default function AuthHeader() {
  const currentPage = useSelector((state) => state.page.currentPage);

  return (
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
      {currentPage === "register"
        ? " Create new account"
        : "Sign in to your account "}
    </h2>
  );
}
