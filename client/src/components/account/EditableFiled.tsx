import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface EditableFieldProps {
    label: string;
    initialValue: string;
    onSave: (value: string) => void;
    onDelete?: () => void; // Опциональный пропс для удаления
}

const EditableField: React.FC<EditableFieldProps> = ({ label, initialValue, onSave, onDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(initialValue);

    return (
        <div className="mb-3">
            <InputGroup>
                <Form.Control
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button variant="outline-success" onClick={() => { onSave(value); setEditMode(false); }}>
                    <ion-icon name="checkmark-outline"></ion-icon>
                </Button>
            </InputGroup>
        </div>
    );
};

export default EditableField;
