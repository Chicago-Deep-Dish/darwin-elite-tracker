import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function firebaseCodes(code, toastifyTheme) {
  switch (code) {
    case "auth/wrong-password":
      toast.error(
        "Password may have been incorrect, please check and try again",
        toastifyTheme
      );
      break;
    case "auth/user-not-found":
      toast.error("Invalid Email, try again", toastifyTheme);
      break;
    case "auth/too-many-requests":
      toast.error("Too many requests, please try again later", toastifyTheme);
      break;

    case "auth/email-already-in-use":
      toast.error("Email already in use", toastifyTheme);
      break;

    case "auth/weak-password":
      toast.error(
        "Password is weak, please make it at least 6 alphanumeric charcters",
        toastifyTheme
      );
      break;

    case "auth/invalid-email":
      toast.error("Invalid Email, try again", toastifyTheme);
      break;
    case "auth/internal-error":
      toast.error(
        "Internal Error - Make sure you're fillig out all fields",
        toastifyTheme
      );
      break;

    default:
      toast.error(
        `Youre not getting the right error code, you're getting: ${code}`,
        toastifyTheme
      );

      break;
  }
}
