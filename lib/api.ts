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
    console.log('fetchPerson...');
    const res = await fetch('https://search.dip.bundestag.de/api/v1/person/1?format=json&apikey=I9FKdCn.hbfefNWCY336dL6x62vfwNKpoN2RZ1gp21', {
      headers: {
        'accept': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  }
  