import React from "react";
import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthEmailInput from "../Shared/AuthEmailInput";
import AuthPassInput from "../Shared/PasswordInputs/AuthPassInput";
import AuthConfirmPassInput from "../Shared/PasswordInputs/AuthConfirmPassInput";

export default function RegisterForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <AuthEmailInput />
        <AuthPassInput />

        <AuthConfirmPassInput />

        <AuthButton />
      </form>

      <AuthFooter />
    </div>
  );
}
