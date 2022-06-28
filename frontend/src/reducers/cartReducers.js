import { CART_REMOVE_ITEM, CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
            ...state,
            cartItems : state.cartItems.map(x => x.product===existItem.product?item : x )
        }

      } 
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      
    }
 
    case CART_REMOVE_ITEM: {
      const item = action.payload;
        return {
          ...state,
          cartItems: state.cartItems.filter(x => (x.product!=item))
        }
    }

    default: {
      return state;
    }
  }
};