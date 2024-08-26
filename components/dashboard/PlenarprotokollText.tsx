"use client";

import { useState } from "react";
import { Plenarprotokoll } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PlenarprotokollText = ({
  plenarprotokoll,
}: {
  plenarprotokoll: Plenarprotokoll;
}) => {
  // State for the input field
  const [inputValue, setInputValue] = useState("");
  // State for the search term
  const [suchbegriff, setSuchbegriff] = useState("");

  // Count occurrences of the search term
  const vorkommen =
    plenarprotokoll.text.match(new RegExp(suchbegriff, "gi"))?.length || 0;

  // Update search term when the form is submitted
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSuchbegriff(inputValue);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Plenarprotokolle</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-sm items-center space-x-2 justify-center mb-6"
      >
        <Input
          type="text"
          placeholder="Suchbegriff . . ."
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <Button type="submit">Suchen</Button>
      </form>

      {/* Result Box */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-md w-full">
        <p className="text-center text-lg">
          Anzahl der Vorkommen des Suchbegriffs{" "}
          <span className="font-semibold">"{suchbegriff}"</span>:{" "}
          <span className="font-semibold">{vorkommen}</span>
        </p>
      </div>
    </div>
  );
};

export default PlenarprotokollText;
