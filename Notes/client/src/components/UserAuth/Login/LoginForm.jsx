import React from "react";
import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthForgetPassInput from "../Shared/PasswordInputs/AuthForgetPassInput";
import AuthEmailInput from "../Shared/AuthEmailInput";

export default function LoginForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <AuthEmailInput />

        <AuthForgetPassInput />

        <AuthButton />
      </form>

      <AuthFooter />
    </div>
  );
}
