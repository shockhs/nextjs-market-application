import React from 'react';
import Spinner from "../../../images/spinner.svg";

const Preloader = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
    </div>
}
export default Preloader;