
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
  persons: Person[];
  cursor?: string;
}

const API_BASE_URL = "https://search.dip.bundestag.de/api/v1/person";
const API_KEY = "I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21";
const WAHLPERIODE = 20;
const FETCH_DELAY_MS = 1000; // 1 second delay between API calls

async function fetchPersons(cursor?: string): Promise<AllPersons> {
  const params: Record<string, string | number> = {
    "f.wahlperiode": WAHLPERIODE,
    format: "json",
    apikey: API_KEY,
  };

  if (cursor) {
    params.cursor = cursor;
  }

  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key].toString())}`)
    .join("&");

  const url = `${API_BASE_URL}?${queryString}`;

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data, status: ${res.status}`);
    }

    const data = await res.json();

    return {
      numFound: data.numFound ?? 0,
      persons: data.documents ?? [],
      cursor: data.cursor,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

async function fetchAllPersons(): Promise<AllPersons> {
  let allPersons: Person[] = [];
  let cursor: string | undefined;
  let totalNumFound = 0;
  const seenCursors = new Set<string>();

  do {
    const response = await fetchPersons(cursor);

    // Replace initial cursor with specific cursor if encountered
    if (response.cursor === 'AoJw0OfIrJADK1BlcnNvbi0yMTAx' && !cursor) {
      cursor = 'AoJw0MOVwZADK1BlcnNvbi03MjU2';
    } else {
      cursor = response.cursor;
    }

    totalNumFound = response.numFound;
    allPersons.push(...response.persons);

    if (cursor && seenCursors.has(cursor)) {
      cursor = undefined; // End pagination if cursor is repeated
    } else if (cursor) {
      seenCursors.add(cursor);
      await delay(FETCH_DELAY_MS); // Introduce delay between API calls
    }
  } while (cursor);

  console.log("Total persons fetched:", allPersons.length);

  return {
    numFound: totalNumFound,
    persons: allPersons,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { fetchPersons, fetchAllPersons };

