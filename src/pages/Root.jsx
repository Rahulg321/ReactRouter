import MainNavigation from "../components/MainNavigation/MainNavigation";
import { Outlet } from "react-router-dom";
// import { useNavigation } from "react-router-dom";

export default function Root() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading....</p>} */}
        <Outlet />
      </main>
    </>
  );
}
