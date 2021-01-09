import React from 'react';

import classes from './logo.module.css';

// why we import? this does not mean that webpack mixes the image with out JS code. It means we make webpack aware that we are using this image and it will then handle the image with a special plugin or module added to it to its config. Will handle the image, basically copy it to the destination directory it created(only in memory during dev) and will even optimize the image.
// Refer to a string in the end to the path where webpack stored the optimized and copied image
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;