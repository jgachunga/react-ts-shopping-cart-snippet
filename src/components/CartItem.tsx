import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useAppDispatch, useAppSelector } from "../hooks/reactHooks";
import { removeFromCart } from "../features/StoreHome/storeSlice";

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem( {id, quantity} : CartItemProps) {
    const dispatch = useAppDispatch()
    const storeItems = useAppSelector((state) => state.cartStore.storeItems)
    const item = storeItems.find(item => item.id === id)
    if (item == null) return null
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{width : "125px", height: "125px", objectFit : "cover"}}/>
        <div className="me-auto">
            <div>
                {item.name} {quantity > 1 && <span className="text-muted" style={{fontSize : ".65rem"}}>
                   X {quantity}</span>}
            </div>
            <div className="text-muted" style={{fontSize: ".75rem"}}>
                {formatCurrency(item.price)}
            </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>&times;</Button>
        </Stack>
    )
}