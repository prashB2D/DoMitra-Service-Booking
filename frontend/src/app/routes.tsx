import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { ServiceDetail } from "./pages/ServiceDetail";
import { AddService } from "./pages/AddService";
import { MyServices } from "./pages/MyServices";
import { HowItWorks } from "./pages/HowItWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/service/:id",
        Component: ServiceDetail,
      },
      {
        path: "/add-service",
        Component: AddService,
      },
      {
        path: "/my-services",
        Component: MyServices,
      },
      {
        path: "/how-it-works",
        Component: HowItWorks,
      },
    ],
  },
]);
