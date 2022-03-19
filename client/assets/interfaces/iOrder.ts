import { GameInterface } from "./iGame";
import { AddressInterface } from "./iAddress";

export interface OrderInterface {
  id: string;
  game: GameInterface;
  addressShipping: AddressInterface;
  totalPayment: number;
  createdAt: string;
};
