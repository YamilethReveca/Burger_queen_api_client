export interface OrderProduct {

  "qty": number;
  "product": {
    "id": number;
    "name": string;
    "price": number;
    "image": string;
    "type": string;
    "dateEntry": string;
  }

}