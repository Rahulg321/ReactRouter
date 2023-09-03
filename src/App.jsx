import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import EventDetail from "./pages/EventDetail";
import EventPage from "./pages/Events";
import EditEventPage from "./pages/EventEdit/EventEdit";
import EventsRoot from "./pages/EventsRoot";
import { loader as EventsLoader } from "./pages/Events";
import {
  loader as EventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import PostRoot from "./pages/blogposts/PostRoot";
import Posts from "./pages/blogposts/Posts";
import { action as manipulateEventAction } from "./components/EventForm/EventForm";
import NewsletterPage from "./pages/Newsletter";
import { action as NewsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: NewsletterAction,
      },

      {
        path: "posts",
        element: <PostRoot />,
        children: [{ index: true, element: <Posts /> }],
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: EventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: EventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          { path: "new", element: <NewEvent />, action: manipulateEventAction },
        ],
      },
    ],
  },
]);

// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  return <RouterProvider router={router} />;
}

export default App;
