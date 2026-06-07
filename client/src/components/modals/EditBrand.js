import React, {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {updateBrand} from "../../http/deviceAPI";

const EditBrand = ({show, onHide, brand}) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (brand && show) {
            setValue(brand.name || '')
        }
    }, [brand, show])

    const handleUpdate = () => {
        updateBrand(brand.id, {name: value}).then(data => {
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={handleUpdate}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditBrand;
