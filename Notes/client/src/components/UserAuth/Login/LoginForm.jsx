import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthEmailInput from "../Shared/AuthEmailInput";

import AuthForgetPassInput from "../Shared/AuthForgetPassInput";

export default function LoginForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <AuthEmailInput />

        <AuthForgetPassInput />

        <AuthButton text={"Sign In"} />
      </form>

      <AuthFooter
        mainText={" Not Registered?"}
        text={" REGISTER HERE"}
        link={"/register"}
      />
    </div>
  );
}
