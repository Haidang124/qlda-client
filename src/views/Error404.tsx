import React from 'react';
import image from '../assets/img/theme/fuel-404-logo.png';
import '../assets/css/error404.css';
const Error404 : React.FC = () => {
    return (<>
                <div className="wrap">
                    <div className="banner"><img src={image} alt="" /></div>
                    <div className="search">
                        <form>
                            <input type="text"  value="" placeholder="" />
                            <input type="submit" value="" />
                        </form>
                    </div>
                </div>
    </>)
}
export default Error404;
