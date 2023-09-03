import classes from "./EventItem.module.css";
import { Link, useSubmit } from "react-router-dom";

function EventItem({ event }) {
  const submit = useSubmit(); //

  function deleteHandler() {
    const proceed = window.confirm("are you sure?");

    if (proceed) {
      // allows us to trigger actions without a form
      //submit(data,{config})
      submit(null, { method: "delete" });
    } else {
      return;
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={deleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
