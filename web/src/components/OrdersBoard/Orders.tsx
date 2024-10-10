import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal/OrderModal";
import * as S from "./styles";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancel: (orderId: string) => void;
  onStatusChange: (orderId: string, status: Order["status"]) => void;
};

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancel,
  onStatusChange,
}: OrdersBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  function handleChangeOrderStatus() {
    if (!selectedOrder) return;
    setIsLoading(true);

    const newStatus =
      selectedOrder.status === "WAITING" ? "IN_PRODUTION" : "DONE";

    api.patch(`/orders/${selectedOrder._id}`, { status: newStatus });

    toast.success(
      `Pedido da mesa ${selectedOrder.table} marcado como ${newStatus}`
    );
    onStatusChange(selectedOrder._id, newStatus);
    setIsLoading(false);
    setIsModalOpen(false);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder._id}`);
    toast.success(
      `Pedido da mesa ${selectedOrder.table} cancelado com sucesso!`
    );
    onCancel(selectedOrder._id);
    setIsLoading(false);
    setIsModalOpen(false);
  }

  return (
    <S.Board>
      <OrderModal
        order={selectedOrder}
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCancel={handleCancelOrder}
        isLoading={isLoading}
        onStatusChange={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>{order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
}
