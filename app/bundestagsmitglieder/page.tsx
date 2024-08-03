import { Person, columns } from "./columns";
import { DataTable } from "./data-table";


async function getData(): Promise<Person[]> {
  // Fetch data from your API here.
  return [
    {
        id: 34,
        name: "Alice",
        position: "CEO",
        association: "Company A",
        wahlperiode: 20,
      },
      {
        id: 35,
        name: "Bob",
        position: "CTO",
        association: "Company B",
        wahlperiode: 20,
      },
      {
        id: 36,
        name: "Charlie",
        position: "CFO",
        association: "Company C",
        wahlperiode: 20,
      },
      {
          id: 34,
          name: "Alice",
          position: "CEO",
          association: "Company A",
          wahlperiode: 20,
        },
        {
          id: 35,
          name: "Bob",
          position: "CTO",
          association: "Company B",
          wahlperiode: 20,
        },
        {
          id: 36,
          name: "Charlie",
          position: "CFO",
          association: "Company C",
          wahlperiode: 20,
        },
        {
          id: 34,
          name: "Alice",
          position: "CEO",
          association: "Company A",
          wahlperiode: 20,
        },
        {
          id: 35,
          name: "Bob",
          position: "CTO",
          association: "Company B",
          wahlperiode: 20,
        },
        {
          id: 36,
          name: "Charlie",
          position: "CFO",
          association: "Company C",
          wahlperiode: 20,
        },
        {
          id: 34,
          name: "Alice",
          position: "CEO",
          association: "Company A",
          wahlperiode: 20,
        },
        {
          id: 35,
          name: "Bob",
          position: "CTO",
          association: "Company B",
          wahlperiode: 20,
        },
        {
          id: 36,
          name: "Charlie",
          position: "CFO",
          association: "Company C",
          wahlperiode: 20,
        },
    {
      id: 34,
      name: "Alice",
      position: "CEO",
      association: "Company A",
      wahlperiode: 20,
    },
    {
      id: 35,
      name: "Bob",
      position: "CTO",
      association: "Company B",
      wahlperiode: 20,
    },
    {
      id: 36,
      name: "Charlie",
      position: "CFO",
      association: "Company C",
      wahlperiode: 20,
    },
    {
        id: 34,
        name: "Alice",
        position: "CEO",
        association: "Company A",
        wahlperiode: 20,
      },
      {
        id: 35,
        name: "Bob",
        position: "CTO",
        association: "Company B",
        wahlperiode: 20,
      },
      {
        id: 36,
        name: "Charlie",
        position: "CFO",
        association: "Company C",
        wahlperiode: 20,
      },
      {
        id: 34,
        name: "Alice",
        position: "CEO",
        association: "Company A",
        wahlperiode: 20,
      },
      {
        id: 35,
        name: "Bob",
        position: "CTO",
        association: "Company B",
        wahlperiode: 20,
      },
      {
        id: 36,
        name: "Charlie",
        position: "CFO",
        association: "Company C",
        wahlperiode: 20,
      },
      {
        id: 34,
        name: "Alice",
        position: "CEO",
        association: "Company A",
        wahlperiode: 20,
      },
      {
        id: 35,
        name: "Bob",
        position: "CTO",
        association: "Company B",
        wahlperiode: 20,
      },
      {
        id: 36,
        name: "Charlie",
        position: "CFO",
        association: "Company C",
        wahlperiode: 20,
      },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
