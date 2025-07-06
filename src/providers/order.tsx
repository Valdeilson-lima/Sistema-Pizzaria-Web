"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface OrderItemPRops {
    id: string
    amount: number
    createdAt: string
    orderId: string
    productId: string
    product: {
      id: string
      name: string
      price: number
      description: string
      banner: string
      categoryId: string
    };
    order: {
      id: string
      table: number
      name: string | null
      draft: boolean
      status: boolean
    }
}

type OrderConstextData = {
  isOpen: boolean;
  onRequestOpen: (orderId: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemPRops[];
  FinishOrder: (orderId: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderConstextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemPRops[]>([]);
  const router = useRouter();



  async function onRequestOpen(orderId: string) {


    const token = await getCookieClient();


    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        orderId : orderId
      },


    });
    



    setOrder(response.data);
    setIsOpen(true);
  }



  function onRequestClose() {
    setIsOpen(false);
  }

  async function FinishOrder(orderId: string) {
    const token = await getCookieClient();

    const data ={
      orderId: orderId
    }

    try {
      const response = await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      })
        
      
    } catch (error) {
      console.log(error)
      toast.error("Erro ao finalizar pedido")
      
    }
    toast.success("Pedido finalizado com sucesso!")
    router.refresh()
    setIsOpen(false);


  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        order,
        FinishOrder
        
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
