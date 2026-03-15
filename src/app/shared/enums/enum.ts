export enum ValidationMessages {
  REQUIRED = 'This field is required',
  EMAIL = 'Enter a valid email',
  MIN_LENGTH = 'Minimum length not met',
  MIN_VALUE = 'Value is below minimum',
}

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home',
  BOOKS = 'Books',
}

export enum ProductStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export enum Mode {
  CREATE = 'Create',
  UPDATE = 'Update',
}

export enum ColumnType {
  TEXT = 'text',
  DATE = 'date',
  CURRENCY = 'currency',
  STATUS = 'status',
  ACTION = 'action',
}

export enum ColumnAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}
