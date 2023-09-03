import {
  useNavigate,
  useRouteLoaderData,
  json,
  redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem/EventItem";

export default function EventDetail() {
  const navigate = useNavigate();
  const data = useRouteLoaderData("event-detail");
  // console.log(data);

  return (
    <>
      <EventItem event={data.event} />
      <button
        onClick={() => {
          navigate("edit");
        }}
      >
        Edit Event
      </button>
    </>
  );
}

export const loader = async ({ req, params }) => {
  // console.log(req);
  // console.log(params);
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    return json(
      { message: "could not fetch individial event data" },
      { status: 500 }
    );
  } else {
    return response;
  }
};

export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return json(
      { message: "could not fetch individial event data" },
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
};
