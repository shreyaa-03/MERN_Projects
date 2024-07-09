import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthInput from "../Shared/AuthInput";
import AuthPassInput from "../Shared/AuthPassInput";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/Slices/userDetailSlice";
import FailureAlert from "../Shared/FailureAlert";
import SuccessAlert from "../Shared/SuccessAlert";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirm_passRef = useRef(null);

  const [alert, setAlert] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirm_passRef.current.value;

    if (password === confirmPassword) {
      setAlert("");
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();
        setAlert({ type: "success" });
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirm_passRef.current.value = "";
      } catch (error) {
        console.error("Error:", error);
        setAlert({
          type: "failure",
          message: error || "Please check your information and try again.",
        });
      }
    } else {
      setAlert({ type: "failure", message: "Passwords do not match" });
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <AuthInput inputRef={nameRef} label={"Full Name"} type={"text"} />
        <AuthInput inputRef={emailRef} label={"Email"} type={"email"} />
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
      <div className="mt-10">
        {alert.type === "success" ? (
          <SuccessAlert
            label1={"Registration successful"}
            label2={"Please check your email to verify"}
          />
        ) : alert.type === "failure" ? (
          <FailureAlert
            label1={"Registration Failed!"}
            label2={alert.message}
          />
        ) : null}
      </div>
    </div>
  );
}
