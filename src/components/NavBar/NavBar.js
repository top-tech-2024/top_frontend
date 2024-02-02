import React, { useState } from 'react'
import styles from './nav_bar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/icons/menu_icon.svg';
import freshie_icon from '../../assets/icons/man.png'
import NavMenu from '../../components/NavMenu/NavMenu.js';

const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const openMenu = () => {
        setMenu(!menu)
    }

    return (
        <div>
            <div className={styles.navbar}>
                <MenuIcon className={styles.menu_icon} onClick={openMenu}/>
                {menu && <NavMenu/>}
                <h2>
                    SCSE TOP
                </h2>
                <img src={freshie_icon} alt="freshie_icon" className={styles.freshie_icon}/>
            </div>
        </div>
    )
}

export default NavBar