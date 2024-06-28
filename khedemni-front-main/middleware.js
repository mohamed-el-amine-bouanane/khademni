import { NextResponse } from "next/server";
import decodeToken from "./app/utils/jwt";
import { handleLogout } from "./app/utils/actions";

export function middleware(request) { 
  let currentUser;
  if (request.cookies.has("session")) {
    currentUser = JSON.parse(request.cookies.get("session")?.value);
    const decodedToken = decodeToken(currentUser?.token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    if (expirationTime < Date.now()) {
      handleLogout();
      currentUser=null
    }
  } else {
    currentUser = null;
  }
  const path = request.nextUrl.pathname;
  if (
    !currentUser &&
    (path === "/offers"|| path==="/chats" || path === "/profile")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    currentUser &&
    (path === "/offers" || path==="/chats") &&
    currentUser?.user?.role === "user"
  ) {
    return NextResponse.redirect(new URL("/register/user", request.url));
  } else if (currentUser && (path === "/login" || path === "/register"|| (currentUser?.user?.role != "user" &&path === "/register/user"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
