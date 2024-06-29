import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthEmailInput from "../Shared/AuthEmailInput";
import AuthPassInput from "../Shared/PasswordInputs/AuthPassInput";

export default function LoginForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <AuthEmailInput />

        <AuthPassInput label={"Password"} />

        <AuthButton />
      </form>

      <AuthFooter />
    </div>
  );
}
