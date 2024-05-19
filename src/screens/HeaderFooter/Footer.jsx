import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram, faGoogle, faXTwitter, faFacebook} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,  } from '@fortawesome/free-regular-svg-icons';




<FontAwesomeIcon icon={faInstagram} />


const Footer = () => {
    return (
        <div>
                <footer
                    className="text-center text-lg-start text-white"
                    style={{backgroundColor: "#45526e"}}
                >
                    {/* <!-- Grid container --> */}
                    <div className="footer-container pb-0 pt-3">
                        {/* <!-- Section: Links --> */}
                        <section className="">
                            {/* <!--Grid row--> */}
                            <div className="row">
                                {/* <!-- Grid column --> */}
                                <div className="col-3">
                                    <div className='row footer-logo'>
                                    <img src={require('C:/Users/2150058/Videos/ReactJs_POCS/Mini_ShopperAPP/mini_shopper_frontend/src/assets/mini-shopper-for-dark.png')} alt='logo' className='footer-logo'/>
                                    </div>
                                    <div className='row' style={{width: '100px'}}>
                                    <select name='English' className='footer-select'>
                                        <option value= 'English'>English</option>
                                        <option value= 'Hindi'>Hindi</option>
                                        <option value= 'Spanish'>French</option>
                                        <option value= 'Spanish'>Japanese</option>
                                        <option value= 'Spanish'>Korean</option>
                                    </select>
                                    </div>
                                </div>
                                {/* <!-- Grid column --> */}

                                <hr className="w-100 clearfix d-md-none" />

                                {/* <!-- Grid column --> */}
                                <div className="col-2 ">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                    <p>
                                        <a className="text-white">Men</a>
                                    </p>
                                    <p>
                                        <a className="text-white">Women</a>
                                    </p>
                                    <p>
                                        <a className="text-white">Kids</a>
                                    </p>
                                    <p>
                                        <a className="text-white">Beauty</a>
                                    </p>
                                </div>
                                {/* <!-- Grid column --> */}

                                <hr className="w-100 clearfix d-md-none" />

                                {/* <!-- Grid column --> */}
                                <div className="col-2 ">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">
                                        Customer Support
                                    </h6>
                                    <p>
                                        <a className="text-white">About Us</a>
                                    </p>
                                    <p>
                                        <a className="text-white">FAQs</a>
                                    </p>
                                    <p>
                                        <a className="text-white">T&C</a>
                                    </p>
                                    <p>
                                        <a className="text-white">Privacy Policy</a>
                                    </p>
                                </div>

                                {/* <!-- Grid column --> */}
                                <hr className="w-100 clearfix d-md-none" />

                                {/* <!-- Grid column --> */}
                                <div className="col-5 ">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact Us</h6>
                                    <h5>Subscribe to our News Letter</h5>
                                    <p className="text-white">For more products announcement and exclusive insights</p>
                                    <p className="text-white"><FontAwesomeIcon icon={faEnvelope} transform='down-3' style={{marginRight: '20px', marginLeft: '5px'}}/> 
                                     miniShopper@gmail.com   <button type='button' className='subscribe-button'>Subscribe</button></p>
                                </div>
                                {/* <!-- Grid column --> */}
                            </div>
                            {/* <!--Grid row--> */}
                        </section>
                        {/* <!-- Section: Links --> */}

                        <hr/>

                        {/* <!-- Section: Copyright --> */}
                        <section className="p-1 pt-0">
                            <div className="row d-flex align-items-center">
                                {/* <!-- Grid column --> */}
                                <div className="col-md-7 col-lg-8 text-md-start">
                                    {/* <!-- Copyright --> */}
                                    <div className="p-3 text-end" style={{marginRight: '80px'}}>
                                        © 2024 :
                                        <a className="text-white" href="https://mdbootstrap.com/"
                                        > Minishopper, Inc. All rights reserved </a
                                        >
                                    </div>
                                </div>

                                <div className="col-md-5 col-lg-4 ml-lg-0 text-center">
                                    <a style={{marginRight: '10px'}}><FontAwesomeIcon icon={faFacebook} /></a>

                                    <a style={{marginRight: '10px'}}><FontAwesomeIcon icon={faXTwitter} /></a>

                                    <a style={{marginRight: '10px'}}><FontAwesomeIcon icon={faGoogle} /></a>

                                    <a style={{marginRight: '10px'}}><FontAwesomeIcon icon={faInstagram} /></a>
                                </div>
                            </div>
                        </section>
                    </div>
                </footer>
            {/* </div> */}
        </div>
    )
}

export default Footer
