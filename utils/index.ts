import { EventProps, FilterProps } from "@/types";

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set("event_type", value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

const api = process.env.API_HOST_PORT;
async function getEventByID(EventID: string) {
  const response = await fetch(`${api}/api/v1/public/events/${EventID}`, {
    method: "GET",
  });

  return response.json();
}

export async function EventID({ params }: any) {
  const events = await getEventByID(params.id);

  return events;
}

export async function getEvents(filters: FilterProps) {
  const { title, limit, event_type } = filters;
  const response = await fetch(`${api}/api/v1/public/events/`, {
    method: "GET",
  });

  var events = await response.json();

  if (event_type != undefined && event_type != "") {
    events = events.filter(
      (event) => event.type_name.toLowerCase() == event_type
    );
  }
  if (title != undefined && title != "") {
    events = events.filter((event) =>
      event.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  return events;
}
