export type CreditCardPaymentMethod = {
  type: 'Credit Card';
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};

export type GooglePayPaymentMethod = {
  type: 'Google Pay';
};

export type CashPaymentMethod = {
  type: 'Cash';
};

export type PaymentMethod =
  | CreditCardPaymentMethod
  | GooglePayPaymentMethod
  | CashPaymentMethod;
