import OTPVerification from "../Shared/OTPVerification";
import { useLocation } from "react-router-dom";

function maskEmail(email) {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.slice(0, 2) + "*".repeat(localPart.length - 2);
  return `${maskedLocalPart}@${domain}`;
}

export default function EmailOTPVerify() {
  const location = useLocation();
  const email = location.state?.email;
  const maskedEmail = email ? maskEmail(email) : "";
  return (
    <OTPVerification
      label1={"Email Verification"}
      label2={`Enter the 4-digit verification code that was sent to your email ${maskedEmail}`}
    />
  );
}
