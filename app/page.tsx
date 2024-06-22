import React from 'react';
import { fetchPerson, Person } from '../lib/api';

export default async function Home() {
  const person: Person = await fetchPerson();

  return (
    <div className="">Hallo Welt!</div>
   
  );
}
