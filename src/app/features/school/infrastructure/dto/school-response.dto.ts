export interface SchoolResponseDto {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  status: string;
  principalAdminId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchoolRequestDto {
  name: string;
  code: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  principalAdminId?: string;
}
