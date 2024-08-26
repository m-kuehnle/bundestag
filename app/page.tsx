import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  AllPersons,
  fetchAllPersons,
  Plenarprotokoll,
  fetchPlenarprotokoll,
} from "../lib/api";
import PiechartFraktion from "@/components/dashboard/PiechartFraktionen";
import Bundestagsmitglieder from "./bundestagsmitglieder/page";
import PlenarprotokollText from "@/components/dashboard/PlenarprotokollText";

export default async function Home() {
  const allPersons: AllPersons = await fetchAllPersons();
  const numPersons = allPersons.persons.length;
  const plenarprotokoll: Plenarprotokoll = await fetchPlenarprotokoll();

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Deutscher Bundestag
      </h1>
      <div className="flex justify-center mt-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg px-4">
          <DashboardCard numFound={numPersons} title={"Personen"} />
          <DashboardCard numFound={7} title={"Fraktionen"} />
          <DashboardCard numFound={20} title={"Wahlperiode"} />
        </div>
      </div>
      <PiechartFraktion persons={allPersons.persons}></PiechartFraktion>
      <Bundestagsmitglieder />
      <PlenarprotokollText plenarprotokoll={plenarprotokoll} />
    </div>
  );
}
