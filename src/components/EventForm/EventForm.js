import { useNavigate, useNavigation, useActionData } from "react-router-dom";

import { Form, json, redirect } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation(); //for getting the current state of submission
  const actionData = useActionData(); //allows us to access data returned from our action

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form className={classes.form} method={method}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values.map(actionData.errors).map((err) => {
            return <li key={err}>{err}</li>;
          })}
        </ul>
      )}

      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={isSubmitting} onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  const formBody = await request.formData();
  const method = request.method;

  const eventData = {
    title: formBody.get("title"),
    image: formBody.get("image"),
    description: formBody.get("description"),
    date: formBody.get("date"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    url = `http://localhost:8080/events/${params.eventId}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // if our form data fails validation
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    console.log("request failed, could not post");
    throw new json({ message: "Could not save event" }, { status: 500 });
  }

  return redirect("/events");
};
