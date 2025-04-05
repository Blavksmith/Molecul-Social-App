import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-red-500 p-4 rounded-lg ">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
