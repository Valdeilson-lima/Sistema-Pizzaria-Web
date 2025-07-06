import Button from "../components/button";
import styles from "./styles.module.scss";
import { api } from "@/services/api";
import { getCookiesServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category() {
  async function handleRegisterCagory(formData: FormData) {
    "use server";

    const name = formData.get("name");

    if (!name) {
      return;
    }

    const data = {
      name,
    };

    const token = await getCookiesServer();

    try {
      const response = await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    redirect("/dashboard");
  }

  return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form action={handleRegisterCagory} className={styles.form}>
        <input
          type="text"
          name="name"
          id="name"
          required
          className={styles.input}
          placeholder="Nome da Categoria, Ex: Pizza"
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
