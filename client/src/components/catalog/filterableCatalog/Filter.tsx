import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Offcanvas} from "react-bootstrap";
import "../../../styles/FilterStyle.css"
import {Dropdown} from 'semantic-ui-react'
import {Category} from "../../../types/category";
import 'semantic-ui-css/semantic.min.css'
import {useSearchParams} from "react-router-dom";
import {Filter as FilterObj} from "../../../types/filter";
import {getAllItemsRequest} from "../../../HTTPRequests/store/getItemsRequest";

interface FilterProps {
    changeArray: (arg: string) => void; // Предположим, функция принимает строку и не возвращает результат
}

const Filter = ({changeArray}: FilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const catalogQuery = searchParams.getAll('categories') || ""
    const [show, setShow] = useState(false);

    const [currentCategory, setCurrentCategory] = useState<string[]>(catalogQuery)
    const [categories, setCategories] = useState<{
        key: string;
        text: string;
        value: string;
    }[]>([])

    useEffect(() => {
        setCategories(Object.keys(Category).map((category) => {
            return {key: category, text: category, value: category}
        }))
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeFilterCategory = (value: string[]) => {
        setCurrentCategory(value)
        setSearchParams({categories: value})
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        console.log(formData.getAll("maxPrice") + "" + formData.getAll("minPrice") + "" + formData.getAll("query"))
        let filterParams: FilterObj = {}
        formData.forEach((value, key) => {
            switch (key) {
                case "query":
                    if ( value.toString()){
                        filterParams.query = value.toString()
                    }
                    break
                case "maxPrice":
                    if (Number(value) !== 0){
                        filterParams.maxPrice = Number(value)
                    }
                    break
                case "minPrice":
                    if (Number(value) !== 0){
                        filterParams.minPrice = Number(value)
                    }
                    break
                case "maxWeight":
                    if (Number(value) !== 0){
                        filterParams.maxWeight = Number(value)
                    }
                    break
                case "minWeight":
                    if (Number(value) !== 0){
                        filterParams.minWeight = Number(value)
                    }
                    break
            }
        });
        if (currentCategory.length !== 0) {
            filterParams.categories = currentCategory
        }
        getAllItemsRequest(filterParams).then((array)=>{
            changeArray(array)
        })
    }

    return (
        <>
            <button onClick={handleShow} className="open_filter_button">
                &#9776; Фильтр
            </button>

            <Offcanvas show={show} scroll={true} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Фильтр</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={submit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                            <Form.Control
                                name="query"
                                placeholder=""
                                aria-label="query"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <Form.Group controlId="formPrice"  className="mb-3">
                            <Form.Label>Цена</Form.Label>
                            <div style={{display: "inline-flex"}}>
                                <Form.Floating>
                                    <Form.Control
                                        name="minPrice"
                                        id="minPrice"
                                        type="number"
                                        placeholder=""
                                    />
                                    <label htmlFor="minPrice">мин</label>
                                </Form.Floating>
                                <Form.Floating style={{marginLeft: "5px"}}>
                                    <Form.Control
                                        name="maxPrice"
                                        id="maxPrice"
                                        type="number"
                                        placeholder=""
                                    />
                                    <label htmlFor="maxPrice">макс</label>
                                </Form.Floating>
                            </div>
                            <Dropdown className="dropdown_custom"
                                      placeholder='Категория'
                                      fluid multiple selection
                                      options={categories}
                                      value={currentCategory}
                                      onChange={(e, data) =>
                                          changeFilterCategory(data.value as string[])}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWeight"  className="mb-3">
                            <Form.Label>Вес товара</Form.Label>
                            <div style={{display: "inline-flex"}}>
                                <Form.Floating>
                                    <Form.Control
                                        name="minWeight"
                                        id="minWeight"
                                        type="number"
                                        placeholder=""
                                    />
                                    <label htmlFor="minWeight">мин</label>
                                </Form.Floating>
                                <Form.Floating style={{marginLeft: "5px"}}>
                                    <Form.Control
                                        name="maxWeight"
                                        id="maxWeight"
                                        type="number"
                                        placeholder=""
                                    />
                                    <label htmlFor="maxWeight">макс</label>
                                </Form.Floating>
                            </div>
                        </Form.Group>
                        {/*<Form.Group controlId="formWeight">*/}
                        {/*    <Form.Label>Вес</Form.Label>*/}
                        {/*    <div style={{display: "inline-flex"}}>*/}
                        {/*        <Form.Floating>*/}
                        {/*            <Form.Control*/}
                        {/*                name="minWeight"*/}
                        {/*                id="minWeight"*/}
                        {/*                type="number"*/}
                        {/*                placeholder=""*/}
                        {/*            />*/}
                        {/*            <label htmlFor="minWeight">мин</label>*/}
                        {/*        </Form.Floating>*/}
                        {/*        <Form.Floating style={{marginLeft: "5px"}}>*/}
                        {/*            <Form.Control*/}
                        {/*                name="maxWeight"*/}
                        {/*                id="maxWeight"*/}
                        {/*                type="number"*/}
                        {/*                placeholder=""*/}
                        {/*            />*/}
                        {/*            <label htmlFor="maxWeight">макс</label>*/}
                        {/*        </Form.Floating>*/}
                        {/*    </div>*/}
                        {/*</Form.Group>*/}
                        <Button type="submit">Поиск</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Filter;
