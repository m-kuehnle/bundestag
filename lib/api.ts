// Define the Person type
export type Person = {
  id: number;
  name: string;
  position: string;
  association: string;
  wahlperiode: number;
};

// Define the AllPersons interface
export interface AllPersons {
  numFound: number;
  persons: Person[];
  cursor?: string;
}

// Function to split the title into name, position, and association
const parseTitle = (title: string) => {
  // Ignore commas inside parentheses
  const parts = title.split(/, (?![^(]*\))/);
  return {
    name: parts[0] || "", // Default to an empty string if the part is undefined
    position: parts[1] || "",
    association: parts[2] || "",
  };
};

// API Configuration
const API_BASE_URL = "https://search.dip.bundestag.de/api/v1/person";
const API_KEY = "I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21";
const WAHLPERIODE = 20;
const FETCH_DELAY_MS = 500; // 1 second delay between API calls

// Function to fetch persons with optional cursor
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
    .map((key) => `${key}=${encodeURIComponent(params[key].toString())}`)
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

    // Transform the data by parsing the title for each person
    const persons: Person[] = (data.documents || []).map((doc: any) => {
      const { name, position, association } = parseTitle(doc.titel); // Extract name, position, and association using parseTitle
      return {
        id: doc.id, // Maintain the original id
        name, // Use the parsed name
        position, // Use the parsed position
        association, // Use the parsed association
        wahlperiode: doc.wahlperiode,
      };
    });

    return {
      numFound: data.numFound ?? 0,
      persons, // Use transformed persons list
      cursor: data.cursor,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Function to fetch all persons with pagination support
async function fetchAllPersons(): Promise<AllPersons> {
  let allPersons: Person[] = [];
  let cursor: string | undefined;
  let totalNumFound = 0;
  const seenCursors = new Set<string>();

  do {
    const response = await fetchPersons(cursor);

    // Replace initial cursor with specific cursor if encountered
    if (response.cursor === "AoJw0OfIrJADK1BlcnNvbi0yMTAx" && !cursor) {
      cursor = "AoJw0MOVwZADK1BlcnNvbi03MjU2";
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

// Utility function to introduce a delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Export functions
export { fetchPersons, fetchAllPersons };
