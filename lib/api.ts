export interface PersonRole {
  funktionszusatz: string;
  funktion: string;
  bundesland: string;
  nachname: string;
  vorname: string;
  wahlperiode_nummer: number[];
}

export interface Person {
  id: string;
  nachname: string;
  vorname: string;
  typ: string;
  wahlperiode: number;
  aktualisiert: string;
  person_roles: PersonRole[];
  titel: string;
  datum: string;
  basisdatum: string;
}

export async function fetchPerson(): Promise<Person> {
  console.log("fetchPerson...");
  const res = await fetch(
    "https://search.dip.bundestag.de/api/v1/person/1?format=json&apikey=I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21",
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export interface Protocol {
  numFound: number;
  documents: {
    id: string;
    dokumentart: string;
    typ: string;
    dokumentnummer: string;
    wahlperiode: number;
    herausgeber: string;
    datum: string;
    aktualisiert: string;
    titel: string;
    fundstelle: {
      id: string;
      dokumentart: string;
      pdf_url: string;
      dokumentnummer: string;
      datum: string;
      drucksachetyp: string;
      herausgeber: string;
      urheber: string[];
      verteildatum: string;
      seite: string;
      anfangsseite: number;
      endseite: number;
      anfangsquadrant: string;
      endquadrant: string;
      frage_nummer: string;
      anlagen: string;
      top: number;
      top_zusatz: string;
    };
    pdf_hash: string;
    vorgangsbezug: {
      id: string;
      titel: string;
      vorgangstyp: string;
    }[];
    vorgangsbezug_anzahl: number;
    sitzungsbemerkung: string;
    text: string;
  }[];
}

export async function fetchProtocol(): Promise<Protocol> {
  console.log("fetchProtocol...");
  const res = await fetch(
    "https://search.dip.bundestag.de/api/v1/plenarprotokoll-text?format=json&apikey=I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21",
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}



export interface Person {
  id: string;
  name: string;
}

export interface AllPersons {
  numFound: number;
  documents: Person[];
}

export async function fetchAllPersons(): Promise<AllPersons> {
  console.log("fetchAllPersons...");
  const url = "https://search.dip.bundestag.de/api/v1/person?f.wahlperiode=20&format=json&apikey=I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21";

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  // Ensure data.numFound and data.documents are correctly mapped to AllPersons interface
  const allPersonsResponse: AllPersons = {
    numFound: data.numFound,
    documents: data.documents,
  };

  return allPersonsResponse;
}

