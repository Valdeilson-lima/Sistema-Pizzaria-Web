import { Form } from "./components/form";
import { api } from "@/services/api";
import { getCookiesServer } from "@/lib/cookieServer";



export default async function Product() {

  const token = await getCookiesServer();


  const response = await api.get("/category/list", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })


  return (
   <main>
    <Form categories={response.data} />
   </main>
  )
}
