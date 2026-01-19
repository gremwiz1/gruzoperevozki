import { useEffect } from 'react';
import { Modal } from 'antd';
import type { Order } from '@/@types';
import styles from './OrderDetailModal.module.css';

interface OrderDetailModalProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

export const OrderDetailModal = ({ order, open, onClose }: OrderDetailModalProps) => {
  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  return (
    <Modal
      title={`Заявка № ${order.id}`}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      className={styles.modal}
      maskClosable
      onOk={handleCancel}
    >
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Статус</h3>
          <select
            className={styles.select}
            value={order.status}
            onChange={e => {
              // Здесь можно добавить логику обновления статуса
              console.log('Status changed:', e.target.value);
            }}
          >
            <option value="Не обработана">Не обработана</option>
            <option value="В обработке">В обработке</option>
            <option value="Архивирована">Архивирована</option>
            <option value="Выполнена">Выполнена</option>
          </select>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Информация о клиенте</h3>
          <div className={styles.field}>
            <span className={styles.label}>Тип клиента:</span>
            <span className={styles.value}>{order.json.clientType}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>ФИО:</span>
            <span className={styles.value}>{order.json.name}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Телефон:</span>
            <span className={styles.value}>{order.json.phoneNumber}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>ИНН:</span>
            <span className={styles.value}>{order.json.inn || '-'}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{order.json.email}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Маршрут доставки</h3>
          <div className={styles.field}>
            <span className={styles.label}>Откуда:</span>
            <span className={styles.value}>{order.json.fromAddress}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Куда:</span>
            <span className={styles.value}>{order.json.toAddress}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Срочность доставки и даты</h3>
          <div className={styles.field}>
            <span className={styles.label}>Срочность доставки:</span>
            <span className={styles.value}>
              {order.json.orderDate.type === 'urgent' ? 'urgent' : 'non-urgent'}
            </span>
          </div>
          {order.json.orderDate.type === 'urgent' && order.json.orderDate.urgentDate && (
            <div className={styles.field}>
              <span className={styles.label}>Дата срочной доставки:</span>
              <span className={styles.value}>{order.json.orderDate.urgentDate}</span>
            </div>
          )}
          {order.json.orderDate.type === 'non-urgent' && (
            <>
              <div className={styles.field}>
                <span className={styles.label}>Несрочная доставка, с:</span>
                <span className={styles.value}>
                  {order.json.orderDate.nonUrgentStartDate || '-'}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Несрочная доставка, по:</span>
                <span className={styles.value}>{order.json.orderDate.nonUrgentEndDate || '-'}</span>
              </div>
            </>
          )}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Тип транспорта</h3>
          <div className={styles.field}>
            <span className={styles.label}>Транспорт (тип доставки):</span>
            <span className={styles.value}>{order.json.selectedTransport.type}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Информация о грузе</h3>
          <div className={styles.field}>
            <span className={styles.label}>Длина груза:</span>
            <span className={styles.value}>{order.json.sizes.length}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Высота груза:</span>
            <span className={styles.value}>{order.json.sizes.height}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Ширина груза:</span>
            <span className={styles.value}>{order.json.sizes.width}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Вес груза:</span>
            <span className={styles.value}>{order.json.sizes.weight}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Количество груза:</span>
            <span className={styles.value}>{order.json.sizes.quantity}</span>
          </div>
          {order.json.selectedCargo.length > 0 && (
            <div className={styles.field}>
              <span className={styles.label}>Грузы:</span>
              <div className={styles.cargoList}>
                {order.json.selectedCargo.map((cargo, index) => (
                  <div key={cargo.id} className={styles.cargoItem}>
                    {index + 1}: {cargo.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
