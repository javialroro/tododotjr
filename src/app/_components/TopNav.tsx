import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/App Name */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                ToDo DotJRR
              </span>
            </div>

            {/* Auth Buttons - Right */}
            <div className="flex items-center">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}

                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer div to prevent content from hiding under the fixed navbar */}
      <div className="h-16" />
    </>
  );
}
