import { Link } from "react-router-dom";
import AuthButton from "../Shared/AuthButton";

export default function EmailVerify() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-white mx-auto border-2 border-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            You have successfully verified!
          </div>
        </div>
        <div className="px-6 pb-2 text-center">
          <Link to="/login">
            <AuthButton text={" Click here to log in to your account!"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
