import classes from "./NewsletterSignup.module.css";
import { Form } from "react-router-dom";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

function NewsletterSignup() {
  // when we want to use action from another route without triggering a route transistion
  const fetcher = useFetcher();

  const { data, state } = fetcher;

  useEffect(() => {
    if (data && state === "idle" && data.message) {
      window.alert("singup successful!");
    }
  }, [data, state]);

  return (
    <fetcher.Form
      action="/newsletter"
      method="post"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
