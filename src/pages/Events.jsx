import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // loader will automatically parse the json data
  const data = useLoaderData();
  console.log(data);

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={data.events}>
        {(loadedEvents) => {
          return <EventsList events={loadedEvents} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    return json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};

// while returning a response object the react router data will automatically extract the data in the response, automatically parse the JSON that is
