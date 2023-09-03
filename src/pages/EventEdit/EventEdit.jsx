import { useParams } from "react-router-dom";
import classes from "./EventEdit.module.css";
import EventForm from "../../components/EventForm/EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditEventPage() {
  const params = useParams();
  const data = useRouteLoaderData("event-detail");
  console.log(data);

  return (
    <div className={classes.content}>
      <h1>Edit Event Page {params.eventId}</h1>
      <EventForm event={data.event} />
    </div>
  );
}
