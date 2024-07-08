import { useRef } from "react";
import AuthPassInput from "../Shared/AuthPassInput";
import AuthButton from "../Shared/AuthButton";
import { Link } from "react-router-dom";

export default function RequestResetPage() {
  const passRef = useRef("");
  const confirmPassRef = useRef("");
  return (
    <div>
      <AuthPassInput label={"Password"} forgotPass={false} passRef={passRef} />
      <AuthPassInput
        label={"Confirm Password"}
        forgotPass={false}
        passRef={confirmPassRef}
      />
      <Link to="">
        <AuthButton text={"Next"} />
      </Link>
    </div>
  );
}
