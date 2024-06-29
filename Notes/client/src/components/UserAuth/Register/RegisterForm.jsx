import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthEmailInput from "../Shared/AuthEmailInput";
import AuthPassInput from "../Shared/AuthPassInput";

export default function RegisterForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <AuthEmailInput />
        <AuthPassInput label={"Password"} />
        <AuthPassInput label={"Confirm Password"} />

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
