export interface Person {
  id: string;
  nachname: string;
  vorname: string;
  typ: string;
  wahlperiode: number;
  aktualisiert: string;
  titel: string;
  datum: string;
  basisdatum: string;
}

export interface AllPersons {
  numFound: number;
  documents: Person[];
}

export async function fetchAllPersons(): Promise<AllPersons> {
  console.log("fetchAllPersons...");
  const url =
    "https://search.dip.bundestag.de/api/v1/person?f.wahlperiode=20&format=json&apikey=I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21";

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const allPersonsResponse: AllPersons = {
    numFound: data.numFound,
    documents: data.documents,
  };

  return allPersonsResponse;
}
