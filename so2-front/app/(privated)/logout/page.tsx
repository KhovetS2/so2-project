"use client"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()
  if (typeof window !== "undefined") {
    localStorage.removeItem("logado")
    router.replace("/login")
  }
  return (<>

  </>)
}
