import Link from "next/link";
import { CheckIcon } from "@/components/common/Icons";
import AuthHeading from "../AuthHeading";
import { primaryButtonClass } from "../AuthButton";

export default function SuccessStep() {
  return (
    <>
      <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-(--success)/15 text-(--success)">
        <CheckIcon className="h-6 w-6" />
      </div>

      <AuthHeading title="Password updated" focusOnMount>
        Log in with your new password to continue.
      </AuthHeading>

      <Link href="/login" className={`${primaryButtonClass} mt-8`}>
        Log in
      </Link>
    </>
  );
}
