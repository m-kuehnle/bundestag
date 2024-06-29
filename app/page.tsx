import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  Protocol,
  fetchProtocol,
  AllPersons,
  fetchAllPersons,
} from "../lib/api";

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
      <h1 className="text-4xl font-bold mb-4 text-center">Deutscher Bundestag</h1>
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
        <div>
          {allPersons.documents.map((person, index) => (
            <div key={index} className="border p-4 mb-4">
              <p>{index}</p>
              <p className="font-bold">
                {" "}
                {person.vorname} {person.nachname}
              </p>

              <p>Position: {parseTitle(person.titel).position}</p>
              <p>Fraktion: {parseTitle(person.titel).fraktion}</p>
              <p>Wahlperiode: {person.wahlperiode}</p>
            </div>
          ))}
        </div>

        <p></p>
      </div>
    </div>
  );
}
