import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from '../data/items.json'

export function ShoppingCart() {
    const { closeCart, isOpen, cartItems } = useShoppingCart()
    return <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
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