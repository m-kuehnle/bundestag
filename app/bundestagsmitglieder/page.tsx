import { Person, columns } from "./columns";
import { DataTable } from "./data-table";
import { AllPersons, fetchAllPersons } from "../../lib/api";

async function getData(): Promise<Person[]> {
  // Fetch data from API
  const allPersons: AllPersons = await fetchAllPersons();
  return allPersons.persons;
}

export default async function Bundestagsmitglieder() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
