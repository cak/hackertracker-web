export const fetcher = async (...args: Parameters<typeof fetch>) =>
  await fetch(...args).then(async (res) => await res.json());

export const toEventsData = (events: HTEvent[]): EventData[] => {
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  return events.map((e) => ({
    id: e.id,
    begin: e.begin,
    beginTimestampSeconds: e.begin_timestamp.seconds,
    end: e.end,
    title: e.title,
    location: e.location.name,
    color: e.type.color,
    category: e.type.name,
    speakers: formatter.format(e.speakers.map((s) => s.name)),
  }));
};

export const displayConference = (
  code: string | null,
  conferences: HTConference[]
) => {
  if (code != null || code !== "") {
    const findConfByCode = conferences.find(
      (c) => c.code.toString().toLowerCase() === code?.toLowerCase()
    );
    if (findConfByCode !== undefined) {
      return findConfByCode;
    }
  }

  const now = new Date().getTime() / 1000;

  console.log(now);
  console.log(conferences[0].start_timestamp.seconds);
  const findConfByDate = conferences.sort(
    (a, b) =>
      Math.abs(now - a.start_timestamp.seconds) -
      Math.abs(now - b.start_timestamp.seconds)
  );

  console.log(findConfByDate.map((c) => c.name));

  return findConfByDate[0] ?? [];
};
