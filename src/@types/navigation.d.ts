export type ProductNavigationProps = {
  id?: string;
}

export type OrderNavigationProps = {
  id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      signIn: undefined;
      register: undefined;
      profile: undefined;
      editprofile: undefined;
      details: undefined;
      optionsprofile: undefined;
      meusprodutos: undefined;
      editdetails: undefined;
      cart: undefined;
      pedidoefetuado: undefined;
    }
  }
}
