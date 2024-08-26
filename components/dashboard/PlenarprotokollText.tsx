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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Plenarprotokolle
      </h1>

      {/* Document Info */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-lg w-full mb-8">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Ausgewähltes Plenarprotokoll
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Titel:</span>{" "}
          {plenarprotokoll.titel}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Datum:</span>{" "}
          {plenarprotokoll.datum}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">PDF:</span>{" "}
          <a
            href={plenarprotokoll.pdf_url}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {plenarprotokoll.pdf_url}
          </a>
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-lg items-center space-x-4 justify-center mb-8"
      >
        <Input
          type="text"
          placeholder="Suchbegriff eingeben..."
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <Button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
        >
          Suchen
        </Button>
      </form>

      {/* Result Box */}
      {suchbegriff && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-lg w-full">
          <p className="text-center text-lg text-gray-700">
            Anzahl der Vorkommen des Suchbegriffs{" "}
            <span className="font-semibold text-gray-800">"{suchbegriff}"</span>
            : <span className="font-bold text-blue-600">{vorkommen}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PlenarprotokollText;
