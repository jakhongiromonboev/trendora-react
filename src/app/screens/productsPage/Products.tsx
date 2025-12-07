import type { CartItem } from "../../../lib/types/search";

interface ProductProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(prop: ProductProps) {
  return <div>HI</div>;
}
