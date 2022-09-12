import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../../utilities/formatCurrency"
import { decreaseCartQuantity, getItemQuantity, increaseCartQuantity, removeFromCart } from "./storeSlice"
import { useAppSelector, useAppDispatch } from '../../hooks/reactHooks';

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl} : StoreItemProps) {
    const quantity = useAppSelector((state) => getItemQuantity(state, id))
    const dispatch = useAppDispatch()

    return(
    <Card className="h-auto">
        <Card.Img variant="top" src={imgUrl} height="400px" style={{objectFit: "cover"}}></Card.Img>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className='w-100 outline-warning' variant="warning" onClick={() => dispatch(increaseCartQuantity(id))}>+ Add to Cart</Button>
                ): <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                    <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
                >
                <Button variant="warning" onClick={() => dispatch(decreaseCartQuantity(id))}>-</Button>
                
                <div>
                    <span className="fs-3">{quantity} in cart</span>
                </div>
                <Button variant="warning" onClick={() => dispatch(increaseCartQuantity(id))}>+</Button>
                </div>
                <Button className="bg-danger" size="sm" onClick={() => dispatch(removeFromCart(id))}>Remove</Button>
                </div>}
            </div>
        </Card.Body>
    </Card>
    )
}