'use client'
import Image from "next/image";
import { useState } from "react";
import { Reservation } from "../type/Reservation";

export default function Home() {

  const [reservations, setReservations] = useState(new Array<Reservation>())
  const teste = fetch("http://localhost:8000/reservations")


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

      </div>
    </main>
  );
}
