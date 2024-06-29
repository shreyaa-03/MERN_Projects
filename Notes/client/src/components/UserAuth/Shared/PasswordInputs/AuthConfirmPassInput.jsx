import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showPasswordActions } from "../../../../store/userAuthSlices/showPasswordSlice";

export default function AuthConfirmPassInput() {
  const showPassword = useSelector(
    (state) => state.showPasswordState.showPassword
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-white"
        >
          Confirm Password
        </label>
      </div>
      <div className="mt-2 relative">
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {!showPassword ? (
          <FaEyeSlash
            onClick={() => dispatch(showPasswordActions.showPassword())}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
          />
        ) : (
          <FaEye
            onClick={() => dispatch(showPasswordActions.hidePassword())}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
          />
        )}
      </div>
    </div>
  );
}
