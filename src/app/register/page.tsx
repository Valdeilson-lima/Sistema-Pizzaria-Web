import styles from "../page.module.scss";
import logoImg from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Register() {
  async function handleRegister(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });

      console.log("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }

    redirect("/");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <form action={handleRegister}>
            <h1>Registre-se</h1>

            <input
              type="text"
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail..."
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha..."
              className={styles.input}
            />

            <button type="submit" className={styles.buttonLogin}>
              Cadastrar
            </button>
          </form>
          <Link href="/" className={styles.text}>
            Já possue uma conta? Faça Login
          </Link>
        </section>
      </div>
    </>
  );
}
