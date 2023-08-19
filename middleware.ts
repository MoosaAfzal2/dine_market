import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes : ["/","/api/stripe-webhook","/products","/Male","/Female","/kids","/product/:path"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};