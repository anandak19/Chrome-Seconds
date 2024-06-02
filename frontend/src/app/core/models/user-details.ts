export interface UserDetails {
  fullName: string;
  email: string;
  password: string;
  phone?: Number;
  profileImage?: string;
  address?: string;
  pincode?: Number;
}

export interface UserLogin {
  email: string;
  password: string;
}