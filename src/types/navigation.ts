import { Contact } from "./contact";

export type RootStackParamList = {
      Home: undefined;
      PaymentStack: {screen: string};
      Error:  { title: string };
    };
export type PaymentStackParamList = {
  PaymentContactsList: undefined;
  PaymentCreateContact: undefined;
  PaymentAmount: { contact: Contact}
    };