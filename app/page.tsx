import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { AllPersons, fetchAllPersons } from "../lib/api";
import Bundestagsmitglieder from "@/components/dashboard/Bundestagsmitglieder";
import PiechartFraktion from "@/components/dashboard/PiechartFraktionen";
import DemoPage from "./bundestagsmitglieder/page";

export default async function Home() {
  const allPersons: AllPersons = await fetchAllPersons();
  const numPersons = allPersons.persons.length;

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
      <DemoPage />
      <Bundestagsmitglieder persons={allPersons.persons} />
    </div>
  );
}
