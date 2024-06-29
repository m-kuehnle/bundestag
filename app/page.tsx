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

        <DashboardCard numFound={755} title={"Personen"} />
        <DashboardCard numFound={9} title={"Fraktionen"} />
        <DashboardCard numFound={93} title={"Irgendwas"} />

        <h3 className="font-bold">Alle Personen:</h3>
        <div>
          {allPersons.documents.map((person, index) => (
            <div key={index} className="border p-4 mb-4">
              <p>
                Name: {person.vorname} {person.nachname}
              </p>
              <p>ID: {person.id}</p>
              <p>Titel: {person.titel}</p>
              <p>Typ: {person.typ}</p>
              <p>Wahlperiode: {person.wahlperiode}</p>
              <p>
                Aktualisiert am:{" "}
                {new Date(person.aktualisiert).toLocaleDateString("de-DE")}
              </p>
              <p>Datum: {new Date(person.datum).toLocaleDateString("de-DE")}</p>
              <p>
                Basisdatum:{" "}
                {new Date(person.basisdatum).toLocaleDateString("de-DE")}
              </p>
            </div>
          ))}
        </div>

        <p></p>
      </div>
    </div>
  );
}
