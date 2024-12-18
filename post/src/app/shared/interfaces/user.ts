export interface User {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: number;
  role: {
    id: number;
    status: string;
}

}
