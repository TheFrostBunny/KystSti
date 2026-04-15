import { Outlet } from "react-router-dom";
import { Onboarding } from "@/components/Onboarding";

export default function App() {
  return (
    <>
      <Onboarding />
      <Outlet />
    </>
  );
}
