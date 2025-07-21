"use client";

import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { use } from "react";
import { useState } from "react";
import { OrderContext } from "@/providers/order";

export function Modalorder() {
  const { onRequestClose, order, FinishOrder } = use(OrderContext);
  const [loading, setLoading] = useState(false);

  async function handleFinishOrder() {
    setLoading(true);
    try {
      await FinishOrder(order[0].order.id);
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <X size={40} color="#3fffa3" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do Pedido</h2>

          <div className={styles.header}>
            <span className={styles.table}>
              Mesa: <b>{order[0].order.table}</b>
            </span>
            {order[0].order?.name && (
              <span className={styles.table}>
                Garçon: <b>{order[0].order.name}</b>
              </span>
            )}
          </div>

          <ul className={styles.itemList}>
            {order.map((item) => (
              <li key={item.id} className={styles.item}>
                <img src={item.product.banner} alt={item.product.name} className={styles.itemImage}/>
                <div className={styles.itemRow}>
                  <span className={styles.productName}>
                    {item.product.name}
                  </span>
                  <span className={styles.unitPrice}>
                    R$ {Number(item.product.price).toFixed(2)}
                  </span>
                </div>
                <div className={styles.itemRow}>
                  <span className={styles.quantity}>
                    Quantidade: {item.amount}
                  </span>
                  <span className={styles.subtotal}>
                    Subtotal: R$ {(Number(item.product.price) * item.amount).toFixed(2)}
                  </span>
                </div>
                {item.product.description && (
                  <div className={styles.description}>
                    {item.product.description}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total do Pedido:</span>
            <span className={styles.totalValue}>
              R$ {
                order.reduce(
                  (acc, item) => acc + Number(item.product.price) * item.amount,
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          <button
            className={styles.buttonOrder}
            onClick={handleFinishOrder}
            disabled={loading}
          >
            {loading ? "Finalizando..." : "Concluir Pedido"}
          </button>
        </article>
      </section>
    </dialog>
  );
}
