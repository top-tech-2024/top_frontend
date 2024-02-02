import React from 'react'
import styles from './nav_menu.module.scss'

const NavMenu = () => {
  return (
    <div className={styles.nav_memu}>
        <div className={styles.nav_menu_item}><h3>Dashboard</h3> </div>
        <div className={styles.nav_menu_item}><h3>Profile</h3> </div>
        <div className={styles.nav_menu_item}><h3>Games</h3> </div>
        <div className={styles.nav_menu_item}><h3>Map</h3> </div>
        <div className={styles.nav_menu_item}><h3>Home</h3> </div>
    </div>
  )
}

export default NavMenu