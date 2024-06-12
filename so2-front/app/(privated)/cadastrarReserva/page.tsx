"use client"
export default function CadastrarReservaPage() {

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader()

    reader.onloadend = () => {
      const base64String = reader.result as string
      console.log(base64String)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }



  return (
    <main>
      <input onChange={(e: any) => onFileChange(e)} type="file" />
    </main>
  )
}
