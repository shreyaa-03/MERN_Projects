import { useRef, useEffect  } from "react";
import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthInput from "../Shared/AuthInput";
import AuthPassInput from "../Shared/AuthPassInput";
import { useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../../store/Slices/userDetailSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { loginStatus} = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passRef = useRef("");

  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    dispatch(loginUser({ email, password }));
    emailRef.current.value = "";
    passRef.current.value = "";
  };

  useEffect(() => {
    if (loginStatus == 'succeeded') {
      navigate("/home");
    }
  }, [loginStatus, navigate]);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleOnSubmit}>
        <AuthInput label={"Email"} type={"email"} inputRef={emailRef} />

        <AuthPassInput label={"Password"} forgotPass={true} passRef={passRef} />

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
