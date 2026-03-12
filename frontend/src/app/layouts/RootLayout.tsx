import { Outlet } from "react-router";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

/**
 * Root layout component that handles authentication redirects
 * All routes are rendered as children of this layout
 */
export function RootLayout() {
  // Handle redirects after OAuth2 authentication
  useAuthRedirect();

  return <Outlet />;
}
