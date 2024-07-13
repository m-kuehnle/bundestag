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

async function fetchPersons(cursor?: string): Promise<AllPersons> {
  console.log("fetchPersons...");

  // Construct the base URL with wahlperiode=20
  let url = `https://search.dip.bundestag.de/api/v1/person?f.wahlperiode=20`;
  if (cursor) {
    url += `&cursor=${cursor}`;
    console.log("aktueller cursor:", cursor);
  }
  url += `&format=json&apikey=I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21`;

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });

    // Check if the response is ok
    if (!res.ok) {
      throw new Error(`Failed to fetch data, status: ${res.status}`);
    }

    // Parse the JSON response
    const data = await res.json();

    // Construct the response object
    const allPersonsResponse: AllPersons = {
      numFound: data.numFound,
      persons: data.documents,
      cursor: data.cursor,
    };

    return allPersonsResponse;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllPersons(): Promise<AllPersons> {
  console.log("fetchAllPersons...");

  const allPersons: Person[] = [];
  let cursor: string | undefined = undefined;
  let totalNumFound: number | undefined = undefined;

  // Continue fetching until the cursor does not change anymore
  let lastCursor: string | undefined = undefined;
  do {
    const response = await fetchPersons(cursor);
    if (totalNumFound === undefined) {
      totalNumFound = response.numFound;
    }
    allPersons.push(...response.persons);
    lastCursor = cursor;
    cursor = response.cursor;

    // Add a delay between API calls
    if (cursor && cursor !== lastCursor) {
      await delay(1000); // delay for 1 second
    }
  } while (cursor && cursor !== lastCursor);

  return {
    numFound: totalNumFound ?? 0,
    persons: allPersons,
  };
}
