import OTPVerification from "../Shared/OTPVerification";

export default function EmailOTPVerify() {
  return (
    <OTPVerification
      label1={"Email Verification"}
      label2={"Enter the 4-digit verification code that was sent to your email ba**@dipainhouse.com"}
    />
  );
}
