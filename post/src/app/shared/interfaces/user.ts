export interface User {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: number;
  createdAt: Date;
  role: {
    id: number;
    status: string;
}

}
