"use client"

import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import logoImg from "/public/logo.svg";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter()

  async function handleLogout(){
    deleteCookie("token", {
      path: "/"
    })
    router.replace("/")
  }
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Logo Pizzaria"
            src={logoImg}
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>
        <nav >
          <Link href="/dashboard/category">Categoria</Link>

          <Link href="/dashboard/product">Produtos</Link>

          <form action={handleLogout}>
            <button type="submit">
               <LogInIcon size={24} color="#fff"/>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
