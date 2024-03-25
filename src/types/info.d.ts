/* eslint-disable no-use-before-define */
declare module "@heroicons/*";

interface EventSearching {
  event: EventSearch;
  active: boolean;
}

interface EventSearch {
  id: number;
  title: string;
  color: string;
}

interface EventData {
  id: number;
  begin: string;
  beginTimestampSeconds: number;
  end: string;
  title: string;
  location: string;
  color: string;
  category: string;
  speakers: string;
}

interface CategoryData {
  name: string;
  data: HTEventType | undefined;
}

interface TagData {
  name: string;
  data: Tag;
}

interface Speaker {
  name: string;
  id: number;
}
