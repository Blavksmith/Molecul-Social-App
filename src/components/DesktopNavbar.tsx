import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { BellIcon, House, UserIcon } from "lucide-react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";

const DesktopNavbar = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="hidden md:flex items-center space-x-4">
        <ModeToggle />

        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/">
            <House className="w-4 h-4"></House>

            <span className="hidden lg:inline">Home</span>
          </Link>
        </Button>

        {user ? (
          <>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/notifications">
                <BellIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link
                href={`/profile/${
                  user.username ??
                  user.emailAddresses[0].emailAddress.split("@")[0]
                }`}
              >
                <UserIcon className="w-4 h-4"></UserIcon>
                <span className="hidden lg:inline">Profile</span>
              </Link>
            </Button>
            <UserButton></UserButton>
          </>
        ) : (
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        )}
      </div>
    </>
  );
};

export default DesktopNavbar;
