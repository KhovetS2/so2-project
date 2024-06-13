"use client"

import { BACKEND_URL } from "@/app/constants";
import { User } from "@/app/type/User";
import { useEffect, useState } from "react";

export default function CadastrarReservaPage() {
  const [idReservation, setIdReservation] = useState('');
  const [name_room, setNameRoom] = useState('');
  const [localization, setLocalization] = useState('');
  const [start_hour, setStartHour] = useState('');
  const [end_hour, setEndHour] = useState('');
  const [use_reason, setUseReason] = useState('');
  const [general_info, setGeneralInfo] = useState('');
  const [foto, setFoto] = useState('');
  const [user, setUser] = useState(0);
  const [users, setUsers] = useState<User[]>([])
  const [convidados, setConvidados] = useState(new Array<User>())

  useEffect(() => {
    (async () => {
      const request = await fetch(BACKEND_URL + "/users")
      const response: User[] = await request.json()
      setUsers(response)
    })();

    return () => {
    }
  }, [])

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader()

    reader.onloadend = () => {
      const base64String = reader.result as string
      setFoto(base64String)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resquest = await fetch(BACKEND_URL + "/reservations/", {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idReservation,
        name_room,
        localization,
        start_hour,
        end_hour,
        responsible: user,
        use_reason,
        general_info,
        foto,
      })
    })
    if (resquest.ok) {
      setIdReservation("")
      setNameRoom("")
      setUseReason("")
      setGeneralInfo("")
      const response = await resquest.json()
      const request = convidados.map((convidado) => {
        return fetch(BACKEND_URL + "/invites/", {
          method: "POST",
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: convidado.id,
            reservation_id: response.id,
          })
        })

      })
      const resolve = await Promise.all(request)
      setConvidados(new Array<User>())
    }
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-96 flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 bg-zinc-500 p-16 rounded">
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Id da Reserva</label>
            <input
              type="text"
              value={idReservation}
              onChange={(e) => setIdReservation(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Nome da Sala</label>
            <input
              type="text"
              value={name_room}
              onChange={(e) => setNameRoom(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Local da Sala</label>
            <input
              type="text"
              value={localization}
              onChange={(e) => setLocalization(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Data de Uso</label>
            <input
              type="date"
              value={start_hour.split('T')[0]}
              onChange={(e) => {
                const date = e.target.value;
                setStartHour(date + 'T' + start_hour.split('T')[1]);
                setEndHour(date + 'T' + end_hour.split('T')[1]);
              }}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Hora de Início</label>
            <input
              type="time"
              value={start_hour.split('T')[1]}
              onChange={(e) => setStartHour(start_hour.split('T')[0] + 'T' + e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Hora Final</label>
            <input
              type="time"
              value={end_hour.split('T')[1]}
              onChange={(e) => setEndHour(end_hour.split('T')[0] + 'T' + e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Responsável pelo Uso</label>
            <select
              className="ml-4 rounded text-zinc-600 h-8 pl-4"
              onChange={() => setUser(user)}
            >
              {users.map((user, index) => {
                return <option key={index} value={user.id}>{user.name}</option>
              })}
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Motivo do Uso</label>
            <input
              type="text"
              value={use_reason}
              onChange={(e) => setUseReason(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Informações Gerais</label>
            <input
              type="text"
              value={general_info}
              onChange={(e) => setGeneralInfo(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Foto Ilustrativa</label>
            <input
              className="ml-4 rounded text-zinc-600"
              onChange={(e: any) => onFileChange(e)}
              type="file" />

          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Convidados</label>
            <select
              className="ml-4 rounded text-zinc-600 h-8 pl-4"
            >
              {users.map((user, index) => {
                return <option key={index} onClick={() => setConvidados(convidados.concat(user))}>{user.name}</option>
              })}
            </select>
            <div className="flex flex-col gap-4">
              <ul>
                {convidados.map((user, index) => {
                  return <li key={index} >{user.name}</li>
                })}
              </ul>

            </div>
          </div>
          <button type="submit" className="bg-sky-400 w-40 font-sans font-bold text-lg rounded">
            Cadastrar
          </button>
        </form>
      </div >
    </main >
  )
}
