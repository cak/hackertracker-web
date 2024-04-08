"use client";

import { useState } from "react";
import { tabDateTitle } from "../../lib/utils/dates";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "./Search";
import EventCell from "./EventCell";
import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
} from "@/components/ui/table";

export default function Events({
  conf,
  dateGroup,
}: {
  conf: HTConference;
  dateGroup: Map<string, EventData[]>;
}) {
  const [day, setDay] = useState(
    (dateGroup.keys().next().value as string) ?? ""
  );

  return (
    <div>
      <div className="ml-2 md:ml-5 items-center grid bg-background py-3 align-middle grid-cols-1 md:grid-cols-4 gap-1">
        <div>
          <h1 className="text-base sm:text-base md:text-lg lg:text-xl font-bold">
            {conf.name}
          </h1>
        </div>
        <div className="col-span-2 order-last md:order-none md:items-center md:justify-center">
          <Tabs
            value={day}
            defaultValue={day}
            onValueChange={(value) => {
              setDay(value);
            }}
          >
            <TabsList>
              {Array.from(dateGroup).map(([tabDay]) => (
                <TabsTrigger value={tabDay} key={tabDay}>
                  <p className="text-xs md:text-sm">{tabDateTitle(tabDay)}</p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="justify-self-end pr-5 items-center align-middle">
          <Search dateGroup={dateGroup} />
        </div>
      </div>
      <div className="mb-10">
        <Table>
          <TableCaption>Events for {conf.name}</TableCaption>
          <TableBody>
            {(dateGroup.get(day) ?? []).map((htEvent) => (
              <TableRow key={htEvent.id} id={`e-${htEvent.id}`}>
                <EventCell event={htEvent} confCode={conf.code} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
