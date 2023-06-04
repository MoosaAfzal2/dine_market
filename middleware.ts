import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes : ["/","/products","/Male","/Female","/kids","/product/:path"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};