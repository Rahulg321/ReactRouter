import EventForm from "../../components/EventForm/EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  console.log("in event edit");
  console.log(data);

  return <EventForm event={data.event} method="PATCH" />;
}
