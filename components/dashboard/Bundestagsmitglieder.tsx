"use client";
import { Person } from "../../lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Bundestagsmitglieder = ({ persons }: { persons: Person[] }) => {
  const [filteredPersons, setFilteredPersons] = useState<Person[] | null>(
    persons
  );
  const [filterName, setFilterName] = useState<string>("");

  const filterPersons = (name?: string) => {
    let filteredPersons = persons || [];

    if (name && name.trim() !== "") {
      filteredPersons = filteredPersons.filter((person: { nachname: string }) =>
        person.nachname.toLowerCase().includes(name.toLowerCase())
      );
    }

    setFilteredPersons(filteredPersons);
  };

  // Funktion zum Aufteilen des Titels in Name, Position und Fraktion
  const parseTitle = (title: string) => {
    const parts = title.split(", ");
    return {
      name: parts[0],
      position: parts[1],
      fraktion: parts[2],
    };
  };

  return (
    <div>
      <h3 className="text-3xl font-bold my-8">Bundestagsmitglieder:</h3>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Filter nach Name"
          className="mr-2 max-w-fit dark:text-white"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            filterPersons(e.target.value);
          }}
        />
      </div>

      <Table>
        <TableCaption>Bundestagsmitglieder</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Fraktion</TableHead>
            <TableHead className="text-right">Wahlperiode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPersons &&
            filteredPersons.map((person, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {person.vorname} {person.nachname}
                </TableCell>
                <TableCell>{parseTitle(person.titel).position}</TableCell>
                <TableCell>{parseTitle(person.titel).fraktion}</TableCell>
                <TableCell className="text-right">
                  {person.wahlperiode}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Bundestagsmitglieder;
