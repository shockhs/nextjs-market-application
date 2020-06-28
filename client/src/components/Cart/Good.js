import React from 'react';
import { connect } from 'react-redux';
import { minusCartAction, plusCartAction } from '../../store/actions/cart';
import styles from './Good.module.css';

export default connect(null, { plusCartAction, minusCartAction })
    (function ({ name, count, id, plusCartAction, minusCartAction }) {

        const minusButtonClick = event => {
            event.preventDefault()
            minusCartAction(id)
        }

        const plusButtonClick = event => {
            event.preventDefault()
            plusCartAction(id)
        }

        return <div className={styles.good}>
            <div className={styles.name}>{name}</div>
            <div className={styles.countSection}>
                <button className={styles.minus} onClick={minusButtonClick}>Minus</button>
                {count}
                <button className={styles.plus} onClick={plusButtonClick}>Plus</button>
            </div>
        </div>
    })

