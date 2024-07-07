import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthInput from "../Shared/AuthInput";
import AuthPassInput from "../Shared/AuthPassInput";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/Slices/userDetailSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirm_passRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirm_passRef.current.value;
    console.log(name, email, password, confirmPassword);

    if (password === confirmPassword) {
      dispatch(registerUser({ name, email, password }));
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirm_passRef.current.value = "";
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <AuthInput emailRef={nameRef} label={"Full Name"} type={"text"} />
        <AuthInput emailRef={emailRef} label={"Email"} type={"email"} />
        <AuthPassInput
          label={"Password"}
          forgotPass={false}
          passRef={passwordRef}
        />
        <AuthPassInput
          label={"Confirm Password"}
          forgotPass={false}
          passRef={confirm_passRef}
        />

        <AuthButton text={"Create account"} />
      </form>

      <AuthFooter
        mainText={"Already Signed Up?"}
        text={" SIGN IN"}
        link={"/login"}
      />
    </div>
  );
}
