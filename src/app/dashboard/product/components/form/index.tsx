"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Button from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoriesProps {
  id: number;
  name: string;
}

interface Props {
  categories: CategoriesProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();

  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handleRegisterProduct(formData: FormData) {
    try {
      const categoryIndex = formData.get("categoryId");
      const name = formData.get("name");
      const price = formData.get("price");
      const description = formData.get("description");

      if (!categoryIndex || !name || !price || !description || !image) {
        toast.error("Todos os campos são obrigatórios, incluindo a imagem");
        return;
      }

      const data = new FormData();

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append(
        "categoryId", categoryIndex
       
      );
      data.append("file", image);

      const token = await getCookieClient();

      if (!token) {
        toast.error("Token não encontrado. Faça login novamente.");
        return;
      }

      const response = await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setImage(undefined);
        setPreviewImage("");
        toast.success("Produto cadastrado com sucesso!");
        router.push("/dashboard");
      }
      console.log(data);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast.error("Erro ao cadastrar produto. Por favor, tente novamente.");
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato de imagem inválido");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Cadastro de Produto</h1>
      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="var(--white)" />
          </span>

          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              src={previewImage}
              alt="Imagem do produto"
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="categoryId">
          <option>Selecione Uma Categoria</option>
          {categories.map((category, index) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Preço do produto"
          className={styles.input}
        />

        <textarea
          name="description"
          placeholder="Descrição do produto"
          className={styles.input}
        />

        <Button name="Cadastrar Produto" />
      </form>
    </main>
  );
}
