import { Col, Row } from 'react-bootstrap';
import { StoreItem } from './StoreItem';
import { useAppSelector, useAppDispatch } from '../../hooks/reactHooks';
import { useEffect } from 'react';
import { fetchStoreitems } from './storeSlice';

export function StoreCart() {
    const storeItems = useAppSelector((state) => state.cartStore.storeItems)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchStoreitems())
    }, [])

    return (
    <>
    <h1>Store</h1>
    <Row md={2} xs={1} lg={4} className="g-3 mb-5">
        {storeItems.map(item => (
            <Col key={item.id}>
                <StoreItem {...item}/>
            </Col>
        ))}
    </Row>
    </>)
}