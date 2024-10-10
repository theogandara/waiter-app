import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard/Orders";
import * as S from "./styles";
import { api } from "../../utils/api";
import socketIo from "socket.io-client";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("order@new", (newOrder: Order) => {
      setOrders((prevState) => prevState.concat(newOrder));
    });
  }, []);

  useEffect(() => {
    api.get("/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const waitingOrders = orders.filter((order) => order.status === "WAITING");
  const preparingOrders = orders.filter(
    (order) => order.status === "IN_PRODUTION"
  );
  const readyOrders = orders.filter((order) => order.status === "DONE");

  function handleCancelOrder(orderId: string) {
    setOrders((prevOrders) => prevOrders.filter((odr) => odr._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order["status"]) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  }

  return (
    <S.Container>
      <OrdersBoard
        orders={waitingOrders}
        title="Fila de espera"
        icon="🕚"
        onCancel={handleCancelOrder}
        onStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        orders={preparingOrders}
        title="Em preparação"
        icon="👨🏻‍🍳"
        onCancel={handleCancelOrder}
        onStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        orders={readyOrders}
        title="Pronto!"
        icon="✅"
        onCancel={handleCancelOrder}
        onStatusChange={handleOrderStatusChange}
      />
    </S.Container>
  );
}
