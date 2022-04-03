import React, { Component } from 'react'

export default class Footer extends Component {

    render() {

    return (
    <footer class="deneb_footer">
        <div class="widget_wrapper" style={{ backgroundImage: `url(http://demo.tortoizthemes.com/deneb-html/deneb-ltr/assets/images/footer_bg.png)` }}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="widget widegt_about">
                            <p>
                                A platform for students to learn from any course from a suitable professor of their choice, while parallely allowing professors to share their knowledge on course to enlighten the students and gain income!</p>
                            <ul class="social">
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="widget widget_link">
                            <div class="widget_title">
                                <h4>Links</h4>
                            </div>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Reviews</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="widget widget_contact">
                            <div class="widget_title">
                                <h4>Contact Us</h4>
                            </div>
                            <div class="contact_info">
                                <div class="single_info">
                                    <div class="icon">
                                        <i class="fas fa-phone-alt"></i>
                                    </div>
                                    <div class="info">
                                        <p><a href="tel:1800-121-3637">1800-121-3637</a></p>
                                        <p><a href="tel:+19246147999">+1 924-614-7999</a></p>
                                    </div>
                                </div>
                                <div class="single_info">
                                    <div class="icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="info">
                                        <p><a href="mailto:info@edify.com">info@edify.com</a></p>
                                        <p><a href="mailto:services@edify.com">contact@edify.com</a></p>
                                    </div>
                                </div>
                                <div class="single_info">
                                    <div class="icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="info">
                                        <p>800W, Richardson,<span>Texas.</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
  }
}
