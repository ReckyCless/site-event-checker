import { getEvents } from "@/utils";
import { HomeProps } from "@/types";
import { event_types } from "@/constants";
import {
  EventCard,
  ShowMore,
  SearchBar,
  CustomFilter,
  Hero,
} from "@/components";

export default async function Home({ searchParams }: HomeProps) {
  const allEvents = await getEvents(searchParams);

  const isDataEmpty =
    !Array.isArray(allEvents) || allEvents.length < 1 || !allEvents;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Мероприятия</h1>
          <p>Узнайте о ближайших мероприятиях</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="type" options={event_types} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 6) / 6}
              isNext={(searchParams.limit || 6) > allEvents.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              К сожалению, ничего не найдено
            </h2>
            <p>{allEvents?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
