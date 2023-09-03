import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList/EventsList";

function EventsPage() {
  // loader will automatically parse the json data
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const loader = async () => {
  try {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
      // throw new Response(
      //   JSON.stringify({ message: "Could not fetch events" }),
      //   { status: 500 }
      // );

      return json(
        { message: "Could not fetch events" },
        {
          status: 500,
        }
      );
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// while returning a response object the react router data will automatically extract the data in the response, automatically parse the JSON that is
