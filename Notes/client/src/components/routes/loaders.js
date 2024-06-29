import store from "../../store";
import { authPageActions } from "../../store/userAuthSlices/authPageSlice";

export const loginPageLoader = () => {
  store.dispatch(authPageActions.showLoginPage());
  return null;
};

export const registerPageLoader = () => {
  store.dispatch(authPageActions.showRegisterPage());
  return null;
};
