document.addEventListener("DOMContentLoaded", function () {
    const $html = document.querySelector('html');
    let scrollTop = window.pageYOffset;
    
    function hideScroll() {
        document.body.classList.add('block-scroll');
        // Блокировка скролла для Safari
        if (window.innerWidth <= 1024) {
            $html.style.scrollBehavior = 'auto';
            scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
            document.body.style.position = 'fixed';
            document.body.style.top = -scrollTop + 'px';
            $html.style.scrollBehavior = '';
        }
    }

    function showScroll() {
        document.body.classList.remove('block-scroll');

        // Блокировка скролла для Safari
        if (window.innerWidth <= 1024) {
            $html.style.scrollBehavior = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scroll(0, scrollTop);
            $html.style.scrollBehavior = '';
        }
    }

    function initMenu() {
        const $header = document.querySelector('.header');
        const $headerBtn = document.querySelector('.header__menu-btn');
        const $headerClose = document.querySelector('.menu__close');
        const $overlay = document.querySelector('.overlay');

        // setTimeout(function() {
        //     $mobileMenu.style.display = '';
        //     $headerOverlay.style.display = '';
        // }, transitionDelay)

        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1280
            if (window.innerWidth <= 1280) {
                $headerClose.addEventListener('click', () => {
                    $header.classList.remove('active');
                    $html.classList.remove('overflow-hidden');
                    $overlay.classList.remove('active');
                })
                
                $headerBtn.addEventListener('click', () => {
                    $header.classList.add('active');
                    $html.classList.add('overflow-hidden');
                    $overlay.classList.add('active');
                })
                $overlay.addEventListener('click', () => {
                    $header.classList.remove('active');
                    $html.classList.remove('overflow-hidden');
                    $overlay.classList.remove('active');
                })
                
            }
        }

        window.addEventListener('resize', checkScreenWidth);
        
        checkScreenWidth();
    }

    function initReviewsSlider() {
        const $reviewsSlider = document.querySelector('.reviews-slider');
        if ($reviewsSlider) {
            const reviewsSlider = new Swiper('.reviews-slider', {
                loop: true,
                slidesPerView: 2.5,
                spaceBetween: 30,
                centeredSlides: true,
                grabCursor: true,
                slidesOffsetBefore: 500,
                breakpoints: {
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 15,
                        slidesOffsetBefore: 0,
                    },
                    420: {
                        slidesPerView: 1.5,
                        slidesOffsetBefore: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        slidesOffsetBefore: 0,
                    },
                    900: {
                        slidesOffsetBefore: 0,
                    },
                    1280: {
                        slidesOffsetBefore: 300,
                        slidesPerView: 2.5,
                    },
                    1800: {
                        slidesOffsetBefore: 380,
                    },
                    1921: {
                        slidesPerView: 'auto',
                    },
                },
            });
        }
    }

    function initModals() {
        const $header = document.querySelector('.header');
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');
        const $modalOverlays = document.querySelectorAll('.modal__overlay');

        $modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                const modalId = overlay.closest('.modal').id;
                
                if (e.target.classList.contains('modal__container') || e.target.classList.contains('modal__overlay')) {
                    MicroModal.close(modalId);
                }
            })
        })
        
        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })

        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    hideScroll();
                    $header.style.pointerEvents = 'none';
                },
                onClose: (modal) => {
                    showScroll();
                    setTimeout(() => $header.style.pointerEvents = '', 500)
                },
                disableFocus: true,
                openClass: 'is-open', 
            });
        }
    }

    function disableTransitionsBeforePageLoading() {
        if (document.body.classList.contains('preload')) {
            document.body.classList.remove('preload');
        }
    }

    function initSelects() {
        const $selects = document.querySelectorAll('.custom-select select');
        const $phoneSelect = document.querySelector('.header__phone select');
        const $selectLink = document.querySelector('.header__phone-link');

        if ($selects.length > 0) {
            $selects.forEach(select => {
                NiceSelect.bind(select);
            })
        }


        if ($phoneSelect) {
            $phoneSelect.addEventListener('change', function() {
                const phoneNumber = this.options[this.options.selectedIndex].dataset.phone;
                $selectLink.href = 'tel: ' + phoneNumber;
                $selectLink.click();
            })
        }

    }

    function holdHeader() {
        const $header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= 120) {
                $header.classList.add('fixed');
            } else {
                $header.classList.remove('fixed');
            }
        })
        
    }

    disableTransitionsBeforePageLoading();
    holdHeader();
    initMenu();
    initModals();
    initSelects();

    initReviewsSlider();

});
