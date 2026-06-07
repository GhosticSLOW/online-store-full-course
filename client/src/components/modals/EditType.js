import React, {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {updateType} from "../../http/deviceAPI";

const EditType = ({show, onHide, type}) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (type && show) {
            setValue(type.name || '')
        }
    }, [type, show])

    const handleUpdate = () => {
        updateType(type.id, {name: value}).then(data => {
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
                    Редактировать тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
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

export default EditType;
