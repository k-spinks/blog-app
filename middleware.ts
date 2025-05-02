// Middleware is used as a protective layer which intercepts requests before they reach the final handler. This piece of middleware is used to scan all routes if the user is authorized

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function middleware() {}, {
  // Middleware runs on all routes, but doesn't run on the publicPaths array
  publicPaths: ["/"],
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
