export interface AuthRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  twofactor?: string;
  jwt_token: string;
}

export interface Order {
  id: number;
  json: OrderJson;
  status: string;
  createdat: string;
  isdeleted: boolean;
}

export interface OrderJson {
  fromAddress: string;
  toAddress: string;
  intermediatePoints: string[];
  sizes: {
    length: string;
    width: string;
    height: string;
    weight: string;
    quantity: number;
  };
  selectedCargo: Array<{
    id: number;
    name: string;
  }>;
  selectedRate: string;
  orderDate: {
    type: 'urgent' | 'non-urgent';
    urgentDate?: string;
    nonUrgentStartDate?: string;
    nonUrgentEndDate?: string;
  };
  selectedTransport: {
    type: string;
  };
  clientType: 'natural' | 'legal';
  inn: string;
  name: string;
  phoneNumber: string;
  email: string;
  showAdditionalFields: boolean;
  showThirdStage: boolean;
  isDoorModalOpen: boolean;
  isKeyModalOpen: boolean;
  sizesConfirmed: boolean;
  transportConfirmed: boolean;
}

export interface Pagination {
  totalpages: number;
  currentpage: number;
  itemsperpage: number;
  totalitems: number;
  Offset: number;
}

export interface OrdersResponse {
  status: string;
  method: string;
  data: Order[];
  pagination: Pagination;
}

export interface ApiError {
  message: string;
  status?: number;
}
