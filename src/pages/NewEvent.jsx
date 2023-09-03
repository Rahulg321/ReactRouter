import EventForm from "../components/EventForm/EventForm";
import { json, redirect } from "react-router-dom";

export default function NewEvent() {
  return (
    <>
      <h1>Create a new Event</h1>
      <EventForm method="POST" />
    </>
  );
}
