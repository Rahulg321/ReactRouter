import EventForm from "../components/EventForm/EventForm";
import { json, redirect } from "react-router-dom";

export default function NewEvent() {
  return (
    <>
      <h1>Create a new Event</h1>
      <EventForm />
    </>
  );
}

export const action = async ({ request }) => {
  const formBody = await request.formData();
  const eventData = {
    title: formBody.get("title"),
    image: formBody.get("image"),
    description: formBody.get("description"),
    date: formBody.get("date"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    console.log("request failed, could not post");
    console.log(response);
    throw new json({ message: "Could not save event" }, { status: 500 });
  }

  console.log("in new event response -> ", response);
  return redirect("/events");
};
