import React from 'react';

import classes from './layout.module.css';

import Aux from '../../hoc/Aux';


const layout = (props) => (
    <Aux>
        <div>Toolbar, Side Drawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;