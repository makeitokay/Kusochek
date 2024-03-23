import React, {useState} from 'react';
import {Container, Row, Col, Image, Tabs, Tab, Form, Button} from 'react-bootstrap';
import EditableField from "../components/account/EditableFiled";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {selectUser, setUser} from "../store/slices/user";
import {User} from "../types/user";
import {changePhotoRequest} from "../HTTPRequests/user/changePhotoRequest";
import {infoUserRequest} from "../HTTPRequests/user/infoUserRequest";
import {setLoading} from "../store/slices/appState";
import m from "../images/snapedit_1707841598808.png"
import {changePasswordRequest} from "../HTTPRequests/user/changePasswordRequest";
import {toast} from "react-toastify";
const UserProfile: React.FC = () => {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    // const [user, setUser] = useState<User>(user);
    const [password, setPassword] = useState("")
    const notifyError = (message:string) => toast.error(message);
    const notifySuccess = (message:string) => toast.success(message);
    const isImageFile = (file: any) => {
        // MIME типы для изображений начинаются с "image/"
        return file && file.type.startsWith('image/');
    };
    // Обработка изменения аватара
    const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (isImageFile(file)) {
                const formData = new FormData();
                formData.append('file', file);
                changePhotoRequest(formData).then(() => {
                    return infoUserRequest()
                }).then((user) => {
                    dispatch(setUser(user))
                    dispatch(setLoading(false))
                    localStorage.setItem("isAuth", "true")
                    notifySuccess("Аватарка изменена")
                }).catch((e) => notifyError("Не удалось изменить аватар. Попробуйте еще раз"))
            } else {
                notifyError("Не тот формат файла")
            }
        }
    };

    const handleChangePassword = (password:string) => {

        changePasswordRequest(password).then(()=> notifySuccess("Пароль изменен")).catch((e)=> notifyError("Не удалось изменить пароль"))
        // Пример вывода, в реалии здесь должно быть действие по смене пароля
        console.log(password);
    };

    return (
        <Container>
            <Row className="align-items-center my-3">
                <Col xs={12} md={4} className="text-center">
                    <Image src={'/images/snapedit_1707841598808.png'} roundedCircle style={{width: "150px", height: "150px"}}/>
                </Col>
                <Col xs={12} md={4}>
                    <h4>{user.firstName} {user.lastName}</h4>
                    <p>{user.mobilePhone}</p>
                </Col>
                <Col xs={12} md={4}>
                    <div style={{height: "130px"}}>
                        <Tabs defaultActiveKey="avatar" id="user-info-tabs" className="mb-3">
                            <Tab eventKey="password" title="Изменить пароль">
                                <Form.Label>Выберите новый пароль</Form.Label>
                                <EditableField label="Выберите новый пароль" initialValue={password}
                                               onSave={handleChangePassword}/>
                                {/*<Form>*/}
                                {/*    <Form.Group controlId="passwordChange">*/}
                                {/*        <Form.Label>Новый пароль</Form.Label>*/}
                                {/*        <Form.Control type="password" placeholder="Введите новый пароль" />*/}
                                {/*    </Form.Group>*/}
                                {/*    <Button variant="primary" onClick={handleChangePassword}>Сохранить пароль</Button>*/}
                                {/*</Form>*/}
                            </Tab>
                            <Tab eventKey="avatar" title="Изменить аватар">
                                <Form>
                                    <Form.Group controlId="avatarChange">
                                        <Form.Label>Выберите новую аватарку</Form.Label>
                                        <Form.Control type="file" onChange={handleChangeAvatar}/>
                                    </Form.Group>
                                </Form>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;

// import React, {useState} from 'react';
// import {Button, Col, Container, Row} from 'react-bootstrap';
// import EditableField from '../components/account/EditableFiled';
// import AddressList from '../components/account/Addresslist';
// import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
// import {selectUser} from "../store/slices/user";
// import {User} from "../types/user";
//
// const UserProfile: React.FC = () => {
//     const user = useAppSelector(selectUser)
//     const [userTempInfo, setUserTempInfo] = useState<User>(user);
//     const [addresses, setAddresses] = useState<string[]>(['Адрес 1', 'Адрес 2']);
//     const [isVisible, setIsVisible] = useState(false);
//
//     const toggleVisibility = () => setIsVisible(!isVisible);
//     const updateUser = (field: keyof User, value: string) => {
//         setUserTempInfo((prev) => ({...prev, [field]: value}));
//     };
//
//     return (
//         <Container className="my-5">
//             <Row>
//                 {/* Первая половина экрана */}
//                 <Col sm={12} md={6}>
//                     <h2>Профиль пользователя</h2>
//                     <EditableField label="Имя" initialValue={userTempInfo.name}
//                                    onSave={(value) => updateUser('name', value)}/>
//                     <EditableField label="Фамилия" initialValue={userTempInfo.lastName}
//                                    onSave={(value) => updateUser('lastName', value)}/>
//                     <EditableField label="Электронная почта" initialValue={userTempInfo.email}
//                                    onSave={(value) => updateUser('email', value)}/>
//                     <EditableField label="Телефон" initialValue={String(userTempInfo.phone)}
//                                    onSave={(value) => updateUser('phone', value)}/>
//                 </Col>
//
//                 {/* Вторая половина экрана */}
//                 <Col sm={12} md={6}>
//                     <div>
//                         <Button onClick={toggleVisibility} variant="primary">
//                             {isVisible ? 'Скрыть адреса' : 'Показать адреса'}
//                         </Button>
//                         {isVisible && (
//                             <div className="mt-3">
//                                 <AddressList initialAddresses={addresses} onUpdate={setAddresses}/>
//                             </div>
//                         )}
//                     </div>
//                 </Col>
//             </Row>
//             <Button>Сохранить изменения</Button>
//             {/*<h2>Профиль пользователя</h2>*/}
//             {/*<EditableField label="Имя" initialValue={user.firstName} onSave={(value) => updateUser('firstName', value)} />*/}
//             {/*<EditableField label="Фамилия" initialValue={user.lastName} onSave={(value) => updateUser('lastName', value)} />*/}
//             {/*<EditableField label="Электронная почта" initialValue={user.email} onSave={(value) => updateUser('email', value)} />*/}
//             {/*<EditableField label="Телефон" initialValue={user.phone} onSave={(value) => updateUser('phone', value)} />*/}
//             {/*<div>*/}
//             {/*    <Button onClick={toggleVisibility} variant="primary">*/}
//             {/*        {isVisible ? 'Скрыть' : 'Показать'}*/}
//             {/*    </Button>*/}
//             {/*    {isVisible && (*/}
//             {/*        <div className="mt-3">*/}
//             {/*            <AddressList initialAddresses={addresses} onUpdate={setAddresses} />*/}
//             {/*        </div>*/}
//             {/*    )}*/}
//             {/*</div>*/}
//         </Container>
//     );
// };
//
// export default UserProfile;
