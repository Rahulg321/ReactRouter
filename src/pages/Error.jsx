import PageContent from "../components/PageContent/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let description = "Could not fetch data";

  if (error.status === 500) {
    description = error.data.message;
    console.log("description", description);
  }
  if (error.status === 404) {
    title = "PAGE NOT FOUND!!!";
    description = "Could not fetch data resources for this";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{description}</p>
      </PageContent>
    </>
  );
}
