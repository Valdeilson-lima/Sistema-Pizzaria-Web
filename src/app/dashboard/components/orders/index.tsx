"use client"
import { use } from "react";  
import styles from "./styles.module.scss";
import { RefreshCcw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";
import { Modalorder } from "../modal";
import { OrderContext } from "@/providers/order";
import  { useRouter} from "next/navigation";
import { toast } from "sonner";



interface Props {
  orders: OrderProps[];
}

export default function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext);
  const router = useRouter();



  async function handleDetailORder(orderId: string) {
    await onRequestOpen(orderId);
  }
  
  function handleRefresh() {
    router.refresh()
    toast.success("Atualizado com sucesso!")
  }



  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Ultimos Pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>

          {orders.length === 0 && (
            <span className={styles.emptyIten}>Nenhum pedido encontrado</span>
          )}

          {orders.map((order) => (
            <button className={styles.orderItem} key={order.id} onClick={() => handleDetailORder(order.id )}>
              <div className={styles.tag}> </div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>


      {isOpen && <Modalorder  />}
    </>
  );
}
