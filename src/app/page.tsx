import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      

      // Armazenar o token de autenticação nos cookies
      const cookieStore = await cookies();
      cookieStore.set("token", response.data.token, {
        maxAge: 60 * 60 * 24, // 1 dia
        httpOnly: false, // Protege o cookie contra acesso via JavaScript
        path: "/", // Disponível em todo o site
        secure: process.env.NODE_ENV === "production", // Usar HTTPS em produção
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error("Erro detalhado do backend:", error.response.data);
      } else {
        console.error("Erro ao autenticar usuário:", error);
      }
    }
    redirect("/dashboard");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <form action={handleLogin}>
            <h1>Faça seu login</h1>
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
              Acessar
            </button>
          </form>
          <Link href="/register" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
