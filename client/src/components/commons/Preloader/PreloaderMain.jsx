import React from 'react';
import spinner from '../../../img/spinner.svg';
import '../../css/commons/Preloader/PreloaderMain.css';

const Preloader = ({isLoading}) => {
    return (<div className="spinner-main">{isLoading ? <img src={spinner} alt="" /> : null}</div>);
}
export default Preloader;