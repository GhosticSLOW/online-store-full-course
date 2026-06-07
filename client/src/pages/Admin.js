import React, {useState, useEffect} from 'react';
import {Button, Container, Table, Image, Badge, Tabs, Tab} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import EditDevice from "../components/modals/EditDevice";
import EditBrand from "../components/modals/EditBrand";
import EditType from "../components/modals/EditType";
import {fetchDevices, deleteDevice, fetchBrands, deleteBrand, fetchTypes, deleteType} from "../http/deviceAPI";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    
    const [editBrandVisible, setEditBrandVisible] = useState(false)
    const [editTypeVisible, setEditTypeVisible] = useState(false)
    const [editDeviceVisible, setEditDeviceVisible] = useState(false)
    
    const [devices, setDevices] = useState([])
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])
    
    const [editingDevice, setEditingDevice] = useState(null)
    const [editingBrand, setEditingBrand] = useState(null)
    const [editingType, setEditingType] = useState(null)
    
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = () => {
        loadDevices()
        loadBrands()
        loadTypes()
    }

    const loadDevices = () => {
        setLoading(true)
        fetchDevices(null, null, 1, 100).then(data => {
            setDevices(data.rows)
        }).catch(error => {
            console.error('Ошибка загрузки товаров:', error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const loadBrands = () => {
        fetchBrands().then(data => {
            setBrands(data)
        }).catch(error => {
            console.error('Ошибка загрузки брендов:', error)
        })
    }

    const loadTypes = () => {
        fetchTypes().then(data => {
            setTypes(data)
        }).catch(error => {
            console.error('Ошибка загрузки типов:', error)
        })
    }

    const handleDeleteDevice = async (id, name) => {
        if (window.confirm(`Вы уверены, что хотите удалить товар "${name}"?`)) {
            try {
                await deleteDevice(id)
                setDevices(devices.filter(device => device.id !== id))
                alert('Товар успешно удален!')
            } catch (error) {
                alert('Ошибка при удалении товара!')
                console.error(error)
            }
        }
    }

    const handleDeleteBrand = async (id, name) => {
        if (window.confirm(`Вы уверены, что хотите удалить бренд "${name}"?`)) {
            try {
                await deleteBrand(id)
                setBrands(brands.filter(brand => brand.id !== id))
                alert('Бренд успешно удален!')
            } catch (error) {
                alert('Ошибка при удалении бренда!')
                console.error(error)
            }
        }
    }

    const handleDeleteType = async (id, name) => {
        if (window.confirm(`Вы уверены, что хотите удалить тип "${name}"?`)) {
            try {
                await deleteType(id)
                setTypes(types.filter(type => type.id !== id))
                alert('Тип успешно удален!')
            } catch (error) {
                alert('Ошибка при удалении типа!')
                console.error(error)
            }
        }
    }

    const handleEditDevice = (device) => {
        setEditingDevice(device)
        setEditDeviceVisible(true)
    }

    const handleEditBrand = (brand) => {
        setEditingBrand(brand)
        setEditBrandVisible(true)
    }

    const handleEditType = (type) => {
        setEditingType(type)
        setEditTypeVisible(true)
    }

    const handleDeviceAdded = () => {
        setDeviceVisible(false)
        loadDevices()
    }

    const handleBrandAdded = () => {
        setBrandVisible(false)
        loadBrands()
    }

    const handleTypeAdded = () => {
        setTypeVisible(false)
        loadTypes()
    }

    const handleDeviceUpdated = () => {
        setEditDeviceVisible(false)
        loadDevices()
    }

    const handleBrandUpdated = () => {
        setEditBrandVisible(false)
        loadBrands()
    }

    const handleTypeUpdated = () => {
        setEditTypeVisible(false)
        loadTypes()
    }

    return (
        <Container className="mt-4 mb-5">
            <div className="mb-4">
                <h2 className="mb-4">Админ панель</h2>
                <div className="d-flex gap-2 flex-wrap">
                    <Button
                        variant={"outline-primary"}
                        onClick={() => setTypeVisible(true)}
                    >
                        ➕ Добавить тип
                    </Button>
                    <Button
                        variant={"outline-primary"}
                        onClick={() => setBrandVisible(true)}
                    >
                        ➕ Добавить бренд
                    </Button>
                    <Button
                        variant={"outline-primary"}
                        onClick={() => setDeviceVisible(true)}
                    >
                        ➕ Добавить устройство
                    </Button>
                </div>
            </div>

            <Tabs defaultActiveKey="devices" className="mb-4">
                {/* Таб с товарами */}
                <Tab eventKey="devices" title={`Товары (${devices.length})`}>
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : devices.length === 0 ? (
                        <p className="text-muted">Нет товаров</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Фото</th>
                                        <th>Название</th>
                                        <th>Бренд</th>
                                        <th>Цена</th>
                                        <th>Рейтинг</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map(device => (
                                        <tr key={device.id}>
                                            <td>{device.id}</td>
                                            <td>
                                                <Image 
                                                    src={process.env.REACT_APP_API_URL + device.img}
                                                    width={40}
                                                    height={40}
                                                    rounded
                                                />
                                            </td>
                                            <td>{device.name}</td>
                                            <td>{device.brand?.name || 'Не установлен'}</td>
                                            <td>
                                                <Badge bg="success">{device.price} ₽</Badge>
                                            </td>
                                            <td>
                                                <Badge bg="info">{device.rating} ⭐</Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditDevice(device)}
                                                >
                                                    ✏️ Редактировать
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteDevice(device.id, device.name)}
                                                >
                                                    🗑️ Удалить
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Tab>

                {/* Таб с брендами */}
                <Tab eventKey="brands" title={`Бренды (${brands.length})`}>
                    {brands.length === 0 ? (
                        <p className="text-muted">Нет брендов</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brands.map(brand => (
                                        <tr key={brand.id}>
                                            <td>{brand.id}</td>
                                            <td>
                                                <Badge bg="secondary">{brand.name}</Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditBrand(brand)}
                                                >
                                                    ✏️ Редактировать
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteBrand(brand.id, brand.name)}
                                                >
                                                    🗑️ Удалить
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Tab>

                {/* Таб с типами */}
                <Tab eventKey="types" title={`Типы (${types.length})`}>
                    {types.length === 0 ? (
                        <p className="text-muted">Нет типов</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {types.map(type => (
                                        <tr key={type.id}>
                                            <td>{type.id}</td>
                                            <td>
                                                <Badge bg="warning" text="dark">{type.name}</Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditType(type)}
                                                >
                                                    ✏️ Редактировать
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteType(type.id, type.name)}
                                                >
                                                    🗑️ Удалить
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Tab>
            </Tabs>

            <CreateBrand show={brandVisible} onHide={() => handleBrandAdded()}/>
            <CreateDevice show={deviceVisible} onHide={() => handleDeviceAdded()}/>
            <CreateType show={typeVisible} onHide={() => handleTypeAdded()}/>
            
            <EditDevice show={editDeviceVisible} onHide={() => handleDeviceUpdated()} device={editingDevice}/>
            <EditBrand show={editBrandVisible} onHide={() => handleBrandUpdated()} brand={editingBrand}/>
            <EditType show={editTypeVisible} onHide={() => handleTypeUpdated()} type={editingType}/>
        </Container>
    );
};

export default Admin;
