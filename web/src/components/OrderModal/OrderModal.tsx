import * as S from "./styles";
import CloseIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

type OrderModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  order: Order | null;
  onCancel: () => Promise<void>;
  isLoading: boolean;
  onStatusChange: () => void;
};

export function OrderModal({
  isOpen,
  setIsOpen,
  order,
  onClose,
  onCancel,
  isLoading,
  onStatusChange,
}: OrderModalProps) {
  if (!isOpen || !order) {
    return null;
  }

  const total = order.products.reduce((acc, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  return (
    <S.Overlay onClick={() => setIsOpen(false)}>
      <S.ModalBody onClick={(e) => e.stopPropagation()}>
        <header>
          <strong>{order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={CloseIcon} alt="icone-fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>

          <div>
            <span>
              {order.status === "DONE" && "✅"}
              {order.status === "IN_PRODUTION" && "👨🏻‍🍳"}
              {order.status === "WAITING" && "🕚"}
            </span>

            <strong>
              {order.status === "DONE" && "Pronto!"}
              {order.status === "IN_PRODUTION" && "Em produção"}
              {order.status === "WAITING" && "Fila de espera"}
            </strong>
          </div>
        </div>

        <S.OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map((product) => (
              <div className="item" key={product._id}>
                <img
                  width="56"
                  height="28.51"
                  alt={product.product.name}
                  src={`http://localhost:3001/uploads/${product.product.imagePath}`}
                />

                <span className="quantity">{product.quantity}x</span>

                <div className="product-details">
                  <strong>{product.product.name}</strong>
                  <span>{formatCurrency(product.product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </S.OrderDetails>

        <S.Actions>
          {order.status !== "DONE" && (
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onStatusChange}
            >
              <span>{order.status === "WAITING" ? "👨🏻‍🍳" : "✅"}</span>
              <span>
                {order.status === "WAITING"
                  ? "Preparar pedido"
                  : "Concluir Pedido"}
              </span>
            </button>
          )}
          <button
            type="button"
            className="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar pedido
          </button>
        </S.Actions>
      </S.ModalBody>
    </S.Overlay>
  );
}
