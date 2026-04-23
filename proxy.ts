import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// For Next.js 16 proxy compatibility
export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: [
    "/driver-portal/:path*", 
    "/ai-dispatch/:path*"
  ] 
};
