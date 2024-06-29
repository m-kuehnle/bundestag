import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  Protocol,
  fetchProtocol,
  AllPersons,
  fetchAllPersons,
} from "../lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const protocol: Protocol = await fetchProtocol();
  const allPersons: AllPersons = await fetchAllPersons();
  const numPersons = allPersons.numFound;

  // Funktion zum Aufteilen des Titels in Name, Position und Fraktion
  const parseTitle = (title: string) => {
    const parts = title.split(", ");
    return {
      name: parts[0],
      position: parts[1],
      fraktion: parts[2],
    };
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Deutscher Bundestag
      </h1>
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg px-4">
          <DashboardCard numFound={numPersons} title={"Personen"} />
          <DashboardCard numFound={7} title={"Fraktionen"} />
          <DashboardCard numFound={20} title={"Wahlperiode"} />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold my-8">Protokolle:</h2>
        <p>Titel: {protocol.documents[0].titel}</p>
        <p>Text: {protocol.documents[0].text}</p>

        <h3 className="text-3xl font-bold my-8">Bundestagsmitglieder:</h3>

        <Table>
          <TableCaption>Bundestagsmitglieder</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Fraktion</TableHead>
              <TableHead className="text-right">Wahlperiode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPersons.documents.map((person, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {person.vorname} {person.nachname}
                </TableCell>
                <TableCell>{parseTitle(person.titel).position}</TableCell>
                <TableCell>{parseTitle(person.titel).fraktion}</TableCell>
                <TableCell className="text-right">
                  {person.wahlperiode}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
