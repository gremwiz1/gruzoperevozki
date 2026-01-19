import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [{ id: 'orders', icon: '📄', label: 'Заявки с сайта', path: ROUTES.ORDERS }];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`${styles.sidebar} ${isHovered ? styles.expanded : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className={styles.nav}>
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            <span className={styles.icon}>{item.icon}</span>
            {isHovered && <span className={styles.label}>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};
