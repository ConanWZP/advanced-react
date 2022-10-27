import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from '../router';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {

    const navigate = useNavigate();
    console.log(navigate)
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const items1 = [
        { label: 'Выйти', key: 'item-1', onClick: () => logout() },
    ];
    const items2 = [
        { label: 'Логин', key: 'item-1', onClick: () => navigate(RouteNames.LOGIN) },
    ];

   /* const dispatch = useDispatch<any>();*/
    const {logout} = useActions()

    return (
        <Layout.Header>
            <Row justify={'end'}>
                {isAuth ?
                    <>
                        <div style={{color: 'white', marginRight: 10}}>{user.username}</div>
                        <Menu theme={'dark'} mode="horizontal" selectable={false} items={items1} overflowedIndicator
                        />
                    </>
                    :
                    <>
                        {/*<Menu theme={'dark'} mode="horizontal" selectable={false}>
                            <Menu.Item onClick={() => navigate(RouteNames.LOGIN)}>Логин</Menu.Item>

                        </Menu>*/}

                        <Menu theme={'dark'} mode="horizontal" selectable={false} items={items2} overflowedIndicator />
                    </>
                }

            </Row>
        </Layout.Header>
    );
};

export default Navbar;