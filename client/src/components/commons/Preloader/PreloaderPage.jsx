import React from 'react';
import spinner from '../../../img/spinner.svg';
import '../../css/commons/Preloader/PreloaderPage.css'

const PreloaderPage = ({isLoading}) => {
    return (<div className="preloader">{isLoading ? <img src={spinner} alt="" /> : null}</div>);
}
export default PreloaderPage;