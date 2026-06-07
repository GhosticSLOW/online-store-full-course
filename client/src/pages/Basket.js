import React, { useContext } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import Image from 'react-bootstrap/Image';

const Basket = observer(() => {
    const { device } = useContext(Context);
    const history = useHistory();

    const handleRemove = (id) => {
        device.removeFromBasket(id);
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            device.updateBasketQuantity(id, newQuantity);
        }
    };

    const handleCheckout = () => {
        alert(`Заказ оформлен! Общая сумма: ${device.basketTotal.toFixed(2)} ₽`);
        device.clearBasket();
    };

    if (device.basket.length === 0) {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h2 className="mb-4">Ваша корзина пуста</h2>
                        <p className="text-muted mb-4">
                            Добавьте товары в корзину для оформления покупки
                        </p>
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={() => history.push(SHOP_ROUTE)}
                        >
                            ← Вернуться в магазин
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={8}>
                    <h2 className="mb-4">Корзина покупок</h2>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {device.basket.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Image 
                                                src={process.env.REACT_APP_API_URL + item.img}
                                                width={50}
                                                height={50}
                                                rounded
                                                className="me-3"
                                            />
                                            <div>
                                                <div className="fw-bold">{item.name}</div>
                                                <small className="text-muted">{item.brand?.name}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <strong>{item.price.toFixed(2)} ₽</strong>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            >
                                                −
                                            </Button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                                style={{ width: '50px', textAlign: 'center' }}
                                                className="form-control form-control-sm"
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <strong>{(item.price * item.quantity).toFixed(2)} ₽</strong>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Col md={4}>
                    <Card className="sticky-top" style={{ top: '20px' }}>
                        <Card.Body>
                            <Card.Title className="mb-4">Итого</Card.Title>
                            
                            <div className="d-flex justify-content-between mb-3">
                                <span>Товаров ({device.basket.length}):</span>
                                <span>{device.basket.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                            </div>

                            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                <span>Стоимость товаров:</span>
                                <strong>{device.basketTotal.toFixed(2)} ₽</strong>
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                                <span className="h5">К оплате:</span>
                                <strong className="h5 text-success">{device.basketTotal.toFixed(2)} ₽</strong>
                            </div>

                            <Button 
                                variant="success" 
                                size="lg"
                                className="w-100 mb-2"
                                onClick={handleCheckout}
                            >
                                Оформить заказ
                            </Button>

                            <Button 
                                variant="outline-secondary" 
                                className="w-100"
                                onClick={() => history.push(SHOP_ROUTE)}
                            >
                                Продолжить покупки
                            </Button>

                            <hr className="my-4" />

                            <div className="text-muted small">
                                <p>✓ Бесплатная доставка от 1000 ₽</p>
                                <p>✓ Гарантия на все товары</p>
                                <p>✓ Поддержка 24/7</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default Basket;
