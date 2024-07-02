import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthEmailInput from "../Shared/AuthEmailInput";
import AuthPassInput from "../Shared/AuthPassInput";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function RegisterForm() {
  // const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirm_passRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirm_passRef.current.value;
    console.log(email, password, confirmPassword);

    // if (password === confirmPassword) {
    //   dispatch();
    // }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <AuthEmailInput emailRef={emailRef} />
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
