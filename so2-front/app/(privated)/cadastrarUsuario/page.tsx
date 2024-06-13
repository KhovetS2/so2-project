"use client"
import { BACKEND_URL } from "@/app/constants";
import { useState } from "react";

export default function CadastrarUsuarioPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resquest = await fetch(BACKEND_URL + "/users/", {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        "password": senha,
      })
    })
    if (resquest.ok) {
      setName("")
      setEmail("")
      setSenha("")
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-96 flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 bg-zinc-500 p-16 rounded">
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-sans font-bold text-lg">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="ml-4 rounded text-zinc-600"
            />
          </div>
          <button type="submit" className="bg-sky-400 w-40 font-sans font-bold text-lg rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  )
};

