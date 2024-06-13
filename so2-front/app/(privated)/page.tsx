'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reservation } from "../type/Reservation";
import CardReserva from "../components/CardReserva";
import { BACKEND_URL } from "../constants";

export default function Home() {

  const [reservations, setReservations] = useState(new Array<Reservation>())
  const [pesquisa, setPesquisa] = useState("")
  useEffect(() => {

    (async () => {
      const request = await fetch(BACKEND_URL + "/reservations")
      const response: Reservation[] = await request.json()
      setReservations(response.sort((a, b) => {
        const dateA = new Date(a.start_hour).getTime();
        const dateB = new Date(b.start_hour).getTime();
        return dateA - dateB;
      }))
    })();

    return () => {
    }
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <input className="rounded text-black mb-4 w-[50%] h-10" onChange={(e: any) => {
        setPesquisa(e.target.value)
      }} />
      <div className="z-10 w-full max-w-5xl items-center gap-8 font-mono text-sm lg:flex">
        {reservations.filter((reserva) => {
          if (reserva.name_room.includes(pesquisa)) {
            return reserva
          }
          return
        }).map((reserva, index) => {
          return <CardReserva key={index} reserva={reserva} />
        })}

      </div>
    </main>
  );
}
