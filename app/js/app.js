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

    function initWorksSlider() {
        const $worksSlider = document.querySelector('.works__slider');
        if ($worksSlider) {
            const worksSlider = new Swiper('.works__slider', {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                    clickable: true,
                    el: ".works__pagination",
                    type: "fraction",
                },
                navigation: {
                    nextEl: ".works__button-next",
                    prevEl: ".works__button-prev",
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    600: {
                        slidesPerView: 2
                    },
                    900: {
                        slidesPerView: 3
                    },
                },
            });
        }
    }

    function initMastersSlider() {
        const $mastersSlider = document.querySelector('.masters__slider');
        if ($mastersSlider) {
            const mastersSlider = new Swiper('.masters__slider', {
                slidesPerView: 3.6,
                spaceBetween: 100,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".masters__button-next",
                    prevEl: ".masters__button-prev",
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2.6,
                        spaceBetween: 20,
                    },
                    1024: {
                        spaceBetween: 40,
                        slidesPerView: 2.6,
                    },
                    1280: {
                        slidesPerView: 3.6,
                        spaceBetween: 100,
                    }
                },
            });
        }
    }

    function initReviewsSlider() {
        const $reviewsSlider = document.querySelector('.reviews__slider');
        if ($reviewsSlider) {
            const reviewsSlider = new Swiper('.reviews__slider', {
                slidesPerView: 1,
                navigation: {
                    nextEl: ".reviews__button-next",
                    prevEl: ".reviews__button-prev",
                },
                fadeEffect: {
                    crossFade: true
                },
                effect: "fade",
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

    function initButtonsAnimations() {
        const buttons = document.querySelectorAll('.btn'),
            forEach = Array.prototype.forEach;
            let buttonClass = 'pulse';

        if (buttons.length > 0) {
            forEach.call(buttons, function (b) {
                b.addEventListener('click', addElement);
                if (b.classList.contains('btn--white')) buttonClass = 'pulse-white';
                else buttonClass = 'pulse';
            });
            function addElement(e) {
                var addDiv  = document.createElement('div'),
                    mValue  = Math.max(this.clientWidth, this.clientHeight),
                    rect    = this.getBoundingClientRect();
                    sDiv    = addDiv.style,
                    px      = 'px';
    
                sDiv.width  = sDiv.height = mValue + px;
                sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
                sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;

    
                addDiv.classList.add(buttonClass);
                this.appendChild(addDiv);
            }
        }
        
    }

    function initPhoneMasks() {
        const $phones = document.querySelectorAll('.phone-mask');

        $phones.forEach(item => {
            IMask(item, {
                    mask: '+{38}(000)000-00-00'
            });
        })

    }

    disableTransitionsBeforePageLoading();
    holdHeader();
    initMenu();

    initModals();
    initSelects();
    initPhoneMasks();

    initWorksSlider();
    initMastersSlider();
    initReviewsSlider();

    initButtonsAnimations();
});
