import React, {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import EditableField from './EditableFiled';

const AddressList: React.FC<{
    initialAddresses: string[],
    onUpdate: (addresses: string[]) => void
}> = ({initialAddresses, onUpdate}) => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const handleSave = (index: number, value: string) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
        onUpdate(newAddresses);
    };

    const handleDelete = (index: number) => {
        const newAddresses = addresses.filter((_, idx) => idx !== index);
        setAddresses(newAddresses);
        onUpdate(newAddresses);
    };

    const handleAdd = () => {
        // Пустой адрес для нового поля
        setAddresses([...addresses, '']);
    };

    return (
        <>
            <Row>
                {/* Первая половина экрана */}
                <Col sm={12} md={6}>
                    <Button variant="outline-primary" onClick={handleAdd} className="mb-3">
                        Добавить Адрес
                    </Button>
                </Col>

                {/* Вторая половина экрана */}
                <Col sm={12} md={6}>
                    <div style={{
                        maxHeight: "30vh",
                        background: "white",
                        border: "1px black solid",
                        borderRadius: "15px",
                        padding:"15px"
                    }}
                         className="columnPhotos">
                        {addresses.map((address, index) => (
                            <EditableField
                                key={index}
                                label={`Адрес ${index + 1}`}
                                initialValue={address}
                                onSave={(value) => handleSave(index, value)}
                                onDelete={() => handleDelete(index)}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AddressList;