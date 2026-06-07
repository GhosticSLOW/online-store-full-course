import React, { useContext } from 'react';
import {Card, Col, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {Context} from "../index";

const DeviceItem = ({device}) => {
    const history = useHistory()
    const {device: deviceStore} = useContext(Context)

    const handleAddToBasket = (e) => {
        e.stopPropagation()
        deviceStore.addToBasket(device)
    }

    return (
        <Col md={3} className={"mt-3"}>
            <Card 
                style={{width: 150, cursor: 'pointer'}} 
                border={"light"}
                className="h-100 d-flex flex-column"
            >
                <div onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
                    <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center px-2">
                        <div>{device.brand?.name || 'Без бренда'}</div>
                        <div className="d-flex align-items-center">
                            <div>{device.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    <div className="px-2">{device.name}</div>
                    <div className="px-2 fw-bold text-success">{device.price} ₽</div>
                </div>
                <Button 
                    variant="primary" 
                    size="sm"
                    className="mt-auto mx-2 mb-2"
                    onClick={handleAddToBasket}
                >
                    В корзину
                </Button>
            </Card>
        </Col>
    );
};

export default DeviceItem;
