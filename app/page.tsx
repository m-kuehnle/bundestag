import React from "react";
import { fetchPerson, Person, Protocol, fetchProtocol } from "../lib/api";

export default async function Home() {
  const person: Person = await fetchPerson();
  const protocol: Protocol = await fetchProtocol();

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Willkommen im Bundestag Dashboard</h1>
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
        <p>Protokol:</p>
        <p>{protocol.numFound}</p>
        <p>Titel: {protocol.documents[0].titel}</p>
        <p>Text: {protocol.documents[0].text}</p>
      </div>
    </div>
  );
}