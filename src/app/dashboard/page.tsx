export const dynamic = 'force-dynamic';

import Orders from "./components/orders";
import { api } from "@/services/api";
import { getCookiesServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

async function getOrders(): Promise<OrderProps[] | []> {
  try {
    const token = await getCookiesServer();
    const respnse = await api.get("/orders/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return respnse.data.orders || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Dashboard() {
  const orders = await getOrders();

  return (
    <>
      <Orders orders={orders} />
    </>
  );
}
