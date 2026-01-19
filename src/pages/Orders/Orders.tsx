import { useEffect, useState } from 'react';
import { Table, Pagination, Spin, message, Breadcrumb } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { apiClient } from '@/lib/api';
import { formatDate } from '@/utils/formatters';
import { OrderDetailModal } from '@/components/OrderDetailModal';
import type { Order } from '@/@types';
import styles from './Orders.module.css';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiClient.getOrders(page);
      setOrders(response.data);
      setTotalItems(response.pagination.totalitems);
      setItemsPerPage(response.pagination.itemsperpage);
      setCurrentPage(response.pagination.currentpage);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchOrders(page);
  };

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (e: React.MouseEvent, orderId: number) => {
    e.stopPropagation(); // Предотвращаем открытие модалки при клике на кнопку
    // TODO: Реализовать удаление заявки
    console.log('Delete order:', orderId);
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Дата',
      dataIndex: 'createdat',
      key: 'createdat',
      width: 180,
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Откуда',
      dataIndex: ['json', 'fromAddress'],
      key: 'fromAddress',
      width: 150,
    },
    {
      title: 'Куда',
      dataIndex: ['json', 'toAddress'],
      key: 'toAddress',
      width: 150,
    },
    {
      title: 'Клиент',
      dataIndex: ['json', 'name'],
      key: 'name',
      width: 200,
    },
    {
      title: 'Телефон',
      dataIndex: ['json', 'phoneNumber'],
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: ['json', 'email'],
      key: 'email',
      width: 200,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => <span className={styles.statusText}>{status || '-'}</span>,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 150,
      render: (_: unknown, record: Order) => (
        <button
          className={styles.deleteButton}
          onClick={e => handleDeleteOrder(e, record.id)}
          type="button"
        >
          Удалить заявку
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Заказы</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.header}>
        <h1 className={styles.title}>Заявки с сайта</h1>
      </div>
      <div className={styles.tableContainer}>
        {!loading && totalItems > 0 && (
          <div className={styles.paginationTop}>
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
              className={styles.pagination}
            />
            <div className={styles.paginationInfo}>
              Показано {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, totalItems)} из {totalItems} записей
            </div>
          </div>
        )}
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            pagination={false}
            onRow={record => ({
              onClick: () => handleRowClick(record),
              style: { cursor: 'pointer' },
            })}
            scroll={{ x: 1200 }}
          />
        </Spin>
      </div>
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} open={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};
