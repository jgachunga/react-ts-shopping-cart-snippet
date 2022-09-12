import { Offcanvas, Stack } from "react-bootstrap";
import { toggleOpenCart } from "../features/StoreHome/storeSlice";

import { useAppDispatch, useAppSelector } from "../hooks/reactHooks";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";


export function ShoppingCart() {
    const { storeItems, isOpen, cartItems } = useAppSelector((state) => state.cartStore)
    const dispatch = useAppDispatch()
    
    return <Offcanvas show={isOpen} placement='end' onHide={() => dispatch(toggleOpenCart())}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item}/>
                ))}
            </Stack>
            <div className="ms-auto fw-bold">
                Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                    const item =  storeItems.find(i => i.id === cartItem.id)
                    return total + (item?.price || 0)  * cartItem.quantity
                }, 0)
                )}
            </div>
        </Offcanvas.Body>
    </Offcanvas>
}