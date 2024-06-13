"use client"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()
  localStorage.removeItem("logado")
  router.replace("/login")
  return (<>

  </>)
}
