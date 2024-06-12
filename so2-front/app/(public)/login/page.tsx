"use client"

import { BACKEND_URL } from "@/app/constants"
import { useRouter } from "next/navigation"
import { FormEventHandler, useState } from "react"

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const router = useRouter()

	const onSubmiti = async (e: any) => {
		e.preventDefault()
		const request = await fetch(BACKEND_URL + "/login", {
			method: "POST",
			headers: {
				'accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})

		})
		if (request.ok) {
			router.replace("/")
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex w-96 flex-col">

				<form onSubmit={onSubmiti} className="flex flex-col items-center gap-4 bg-zinc-500 p-16 rounded">
					<div className="flex flex-col gap-4">
						<label className=" font-sans font-bold text-lg ">E-mail</label>
						<input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} className="ml-4 rounded text-zinc-600" />
					</div>
					<div className="flex flex-col gap-4">
						<label className=" font-sans font-bold text-lg ">Senha</label>
						<input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} className="ml-4 rounded text-zinc-600" />
					</div>
					<button className="bg-sky-400 w-40 font-sans font-bold text-lg rounded">Logar</button>
				</form>
			</div>
		</main>
	)

}
