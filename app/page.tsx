import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  fetchPerson,
  Person,
  Protocol,
  fetchProtocol,
  AllPersons,
  fetchAllPersons,
} from "../lib/api";

// Hauptkomponente der Anwendung
export default async function Home() {
  // Daten der Person, Protokolle und aller Personen abrufen
  const person: Person = await fetchPerson();
  const protocol: Protocol = await fetchProtocol();
  const allPersons: AllPersons = await fetchAllPersons();

  // Funktion zum Aufteilen des Titels in Name, Position und Fraktion
  const parseTitle = (title: string) => {
    const parts = title.split(", ");
    return {
      name: parts[0],
      position: parts[1],
      fraktion: parts[2],
    };
  };

  // Erster Eintrag in der Liste aller Personen analysieren
  const personDetails = parseTitle(allPersons.documents[0].titel);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg px-4">
          <DashboardCard numFound={709} title={"Personen"} />
          <DashboardCard numFound={9} title={"Fraktionen"} />
          <DashboardCard numFound={20} title={"Wahlperiode"} />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        Willkommen im Bundestag Dashboard
      </h1>
      <div>
        <h2>Personendetails:</h2>
        <p>
          <strong>ID:</strong> {person.id}
        </p>
        <p>
          <strong>Name:</strong> {person.vorname} {person.nachname}
        </p>
        <p>
          <strong>Titel:</strong> {person.titel}
        </p>
        <p>
          <strong>Typ:</strong> {person.typ}
        </p>
        <p>
          <strong>Wahlperiode:</strong> {person.wahlperiode}
        </p>
        <p>
          <strong>Aktualisiert am:</strong>{" "}
          {new Date(person.aktualisiert).toLocaleDateString("de-DE")}
        </p>
        <p>
          <strong>Datum:</strong>{" "}
          {new Date(person.datum).toLocaleDateString("de-DE")}
        </p>
        <p>
          <strong>Basisdatum:</strong>{" "}
          {new Date(person.basisdatum).toLocaleDateString("de-DE")}
        </p>
        <h3>Rollen:</h3>
        <ul>
          {person.person_roles.map((role, index) => (
            <li key={index}>
              <p>
                <strong>Funktion:</strong> {role.funktion}
              </p>
              <p>
                <strong>Zusatzfunktion:</strong> {role.funktionszusatz}
              </p>
              <p>
                <strong>Bundesland:</strong> {role.bundesland}
              </p>
              <p>
                <strong>Wahlperioden Nummer:</strong>{" "}
                {role.wahlperiode_nummer.join(", ")}
              </p>
            </li>
          ))}
        </ul>
        <p>Protokoll:</p>
        <p>{protocol.numFound}</p>
        <p>Titel: {protocol.documents[0].titel}</p>
        <p>Text: {protocol.documents[0].text}</p>

        <h3 className="font-bold">Alle Personen:</h3>
        <p>Name: {personDetails.name}</p>
        <p>Wahlperiode: {allPersons.documents[0].wahlperiode}</p>
        <p>Aktualisiert am: {allPersons.documents[0].aktualisiert}</p>
        <p>Datum: {allPersons.documents[0].datum}</p>
        <p>Basisdatum: {allPersons.documents[0].basisdatum}</p>
        <p>Position: {personDetails.position}</p>
        <p>Fraktion: {personDetails.fraktion}</p>
      </div>
    </div>
  );
}
