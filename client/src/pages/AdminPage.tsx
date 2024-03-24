import React, {useState, ChangeEvent, useEffect} from 'react';
import {Tab, Tabs, Form, Button, Container} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {Dropdown} from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import {addProductRequest} from "../HTTPRequests/admin/addProductRequest";
import {activateStory, addStoryRequest, addVideoStory} from "../HTTPRequests/admin/addStoryRequest";
import {getAllItemsRequest} from "../HTTPRequests/store/getItemsRequest";
import {Item} from "../types/ItemCard";
import {addPromotionRequest} from "../HTTPRequests/admin/addPromotionRequest";
import {Category} from "../types/category";
import SettingOrder from "../components/admin/SettingOrder";


type Story = {
    preview: File | null;
    videoFiles: File[];
    title: string
};

type Product = {
    name: string,
    price: number,
    weight: number,
    category: string,
    description: string,
    quantity: number
};
type Im = {
    key: string,
    text: string,
    value: string
}

const AdminPage: React.FC = () => {
    const [key, setKey] = useState<string>('story');
    const [story, setStory] = useState<Story>({preview: null, videoFiles: [], title: ""});
    const [product, setProduct] = useState<Product>({
        name: "",
        price: 0,
        weight: 0,
        category: "",
        description: "",
        quantity: 0
    });
    const [promotion, setPromotion] = useState({productId: 0, promotionPrice: 0, expirationDate: ""})
    const [products, setProducts] = useState<Im[]>([])
    const [categories, setCategories] = useState<{
        key: string;
        text: string;
        value: string;
    }[]>([])
    const [currentCategory, setCurrentCategory] = useState<string>("")
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    const isVideoFile = (file: any) => {
        // MIME типы для видео файлов начинаются с "video/"
        return file && file.type.startsWith('video/');
    };
    const isImageFile = (file: any) => {
        // MIME типы для изображений начинаются с "image/"
        return file && file.type.startsWith('image/');
    };
    // Обработчики изменения состояний
    const handleStoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setStory({...story, title: e.target.value});
        }
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (e.target.name === 'preview') {
                if (isImageFile(files[0])) {
                    setStory({...story, preview: files[0]});
                } else {
                    notifyError('Неправильный тип файла')
                }
            } else {
                for (let video of files) {
                    if (!isVideoFile(video)) {
                        notifyError('Неправильный тип файла')
                        return
                    }
                }
                setStory({...story, videoFiles: files});
            }
        }
    };
    const handlePromotionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "expirationDate") {
            const date = new Date(value + "T00:00:00Z").toISOString();
            setPromotion(prev => ({
                ...prev,
                [name]: date,
            }));
        } else {
            setPromotion({...promotion, [name]: value});
        }
    };
    const changeDropdown = (data: any) => {
        const selectedOption = products.find(option => option.value === data.value);
        const selectedKey = selectedOption ? selectedOption.key : undefined;
        setPromotion({...promotion, productId: Number(selectedKey)})
    }
    const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, files} = e.target;
        if (files) {
            console.log(files)
            for (let picture of Array.from(files)) {
                if (!isImageFile(picture)) {
                    notifyError('Неправильный тип файла')
                    return
                }
            }
            setProduct({...product, [name]: files});
        } else {
            setProduct({...product, [name]: value});
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key === 'story') {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const videos = formData.getAll("videoFiles");
            formData.delete("videoFiles")
            const now = new Date();
            const tomorrowTimestamp = now.getTime() + 86400000;
            const tomorrowUtc = new Date(tomorrowTimestamp);
            formData.append("expirationDate", tomorrowUtc.toISOString())
            addStoryRequest(formData).then((id) => {
                videos.reduce(async (promiseChain: Promise<void>, currentItem: any) => {
                    await promiseChain;
                    try {
                        const formData = new FormData();
                        formData.append("video", currentItem)
                        const data = await addVideoStory(id, formData);
                        console.log(data); // Обработка полученных данных
                    } catch (error) {
                        notifyError("не удалось создать историю")
                        return
                    }
                }, Promise.resolve()).then(() => activateStory(id)).then(() => notifySuccess("История создана")).catch(() => notifyError("не удалось создать историю"));

            })
        } else if (key === 'product') {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const images = formData.getAll("image");
            formData.delete("image")
            for (let i of images) {
                formData.append("images", i)
            }
            formData.append("category", currentCategory)
            addProductRequest(formData).then(() => notifySuccess("Товар добавлен")).catch(e => notifyError("Не удалоь добавить товар"))
            console.log('Product submitted:', product);
        } else if (key === "promotion") {
            addPromotionRequest(promotion).then(() => notifySuccess("Акция добавлена")).catch(() => notifyError("Не удалось добавить акцию"))
        }
    };

    // Функция для получения текущей даты в московском часовом поясе в формате YYYY-MM-DD
    function getCurrentDateInMoscow() {
        // Создаем объект Date для текущего момента
        const now = new Date();

        // Получаем текущее время в миллисекундах
        const currentTime = now.getTime();

        // Получаем смещение московского времени от UTC в миллисекундах (UTC+3 часа)
        const offset = 3 * 60 * 60 * 1000;

        // Создаем новый объект Date, представляющий московское время
        const moscowTime = new Date(currentTime + offset);

        // Форматируем дату в формат YYYY-MM-DD
        const year = moscowTime.getUTCFullYear();
        const month = `0${moscowTime.getUTCMonth() + 1}`.slice(-2); // Месяцы начинаются с 0
        const day = `0${moscowTime.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
    }

    const changeFilterCategory = (value: string) => {
        setCurrentCategory(value)
    }

    const currentDate = getCurrentDateInMoscow()

    useEffect(() => {
        let array
        getAllItemsRequest().then((answer) => {
            array = answer.map((pr: Item) => {
                return {
                    key: pr.id,
                    text: pr.name,
                    value: pr.name
                }
            })
            setProducts(array)
        }).catch((e) => console.log(e))
        setCategories(Object.keys(Category).map((category) => {
            return {key: category, text: Category[category as keyof typeof Category], value: category}
        }))
    }, [])
    return (
        <Container>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => k && setKey(k)}
                className="mb-3">
                <Tab eventKey="story" title="Создание истории">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Превью изображение</Form.Label>
                            <Form.Control type="file" name="preview" onChange={handleStoryChange}/>
                        </Form.Group>
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label>Название истории</Form.Label>
                            <Form.Control type="text" name="title" onChange={handleStoryChange}/>
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Видео файлы</Form.Label>
                            <Form.Control type="file" multiple name="videoFiles" onChange={handleStoryChange}/>
                        </Form.Group>
                        <Button variant="primary" type={"submit"} style={{background: "black", borderColor: "black"}}>
                            Отправить историю
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="product" title="Создание продукта">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название"
                                name="name"
                                value={product.name}
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productWeight">
                            <Form.Label>Вес</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите вес"
                                name="weight"
                                value={product.weight}
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productCategory">
                            <Form.Label>Категория</Form.Label>
                            <Dropdown className="dropdown_custom"
                                      placeholder='Категория'
                                      fluid
                                      search
                                      selection
                                      options={categories}
                                      value={currentCategory}
                                      onChange={(e, data) =>
                                          changeFilterCategory(data.value as string)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Введите описание"
                                name="description"
                                value={product.description}
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productQuantity">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите количество"
                                name="quantity"
                                value={product.quantity}
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productImage">
                            <Form.Label>Изображения</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                multiple
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productPrice">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите цену"
                                name="price"
                                value={product.price}
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type={"submit"} style={{background: "black", borderColor: "black"}}>
                            Добавить продукт
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="promotion" title="Создание акции">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="newPrice">
                            <Form.Label>Новая цена</Form.Label>
                            <Form.Control
                                type="number"
                                name="promotionPrice"
                                onChange={handlePromotionChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="expirationDate">
                            <Form.Label>Дата окончания</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Введите дату"
                                name="expirationDate"
                                min={currentDate} // Устанавливаем минимальную дату в UTC
                                onChange={handlePromotionChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="obj">
                            <Form.Label>Выбери продукт</Form.Label>
                            <Dropdown
                                placeholder='State'
                                fluid
                                search
                                selection
                                options={products}
                                onChange={(e, data) => changeDropdown(data)}
                            />
                        </Form.Group>
                        <Button variant="primary" type={"submit"} style={{background: "black", borderColor: "black"}}>
                            Добавить акцию
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="Order" title="Редактирование заказа">
                    <Form onSubmit={handleSubmit}>
                        <SettingOrder/>
                    </Form>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default AdminPage;
