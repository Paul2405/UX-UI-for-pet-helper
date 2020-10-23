var print;

        $('body').append('textarea');

        $.get("https://en.wikipedia.org/wiki/Special:Random").done(function (data) {

            print = data;
            $('body').append("<iframe id='print-modal-frame' name='print-modal-frame' src='slide_show_image.html'></iframe>");

        });


        const slide = {
            main: null,
            elementImg: null,
            imgSelected: 0,
            nextSlide: function () {
                if (this.imgSelected != null) {
                    if (this.imgSelected < (this.elementImg.length - 1)) {
                        this.imgSelected++;
                        this.normalizeSlide();
                    }
                }
            },
            prevSlide: function () {
                if (this.imgSelected != null) {
                    if (this.imgSelected > 0) {
                        this.imgSelected--;
                        this.normalizeSlide();
                    }
                }
            },
            normalizeSlide: function () {

                for (num = 0; num < this.elementImg.length; num++) {
                    this.elementImg[num].classList.remove("hideLeft", "prevLeftSecond", "prev", "selected", "next", "nextRightSecond", "hideRight");
                }

                this.elementImg[this.imgSelected].classList.add("selected");

                if (this.imgSelected > 2) {
                    this.elementImg[this.imgSelected - 2].classList.add("hideLeft");
                    this.elementImg[this.imgSelected - 2].classList.add("prevLeftSecond");
                    this.elementImg[this.imgSelected - 1].classList.add("prev");
                }
                else if (this.imgSelected > 1) {
                    this.elementImg[this.imgSelected - 2].classList.add("prevLeftSecond");
                    this.elementImg[this.imgSelected - 1].classList.add("prev");
                }
                else if (this.imgSelected > 0) {
                    this.elementImg[this.imgSelected - 1].classList.add("prev");
                }

                if ((this.imgSelected + 3) < this.elementImg.length) {
                    this.elementImg[this.imgSelected + 3].classList.add("hideRight");
                    this.elementImg[this.imgSelected + 2].classList.add("nextRightSecond");
                    this.elementImg[this.imgSelected + 1].classList.add("next");
                }
                else if ((this.imgSelected + 2) < this.elementImg.length) {
                    this.elementImg[this.imgSelected + 2].classList.add("nextRightSecond");
                    this.elementImg[this.imgSelected + 1].classList.add("next");
                }
                else if ((this.imgSelected + 1) < this.elementImg.length) {
                    this.elementImg[this.imgSelected + 1].classList.add("next");
                }
            }
        }

        window.onload = () => { 

            slide.main = document.getElementById("carousel");
            slide.elementImg = slide.main.getElementsByClassName("slideImg");

            for (num = 0; num < slide.elementImg.length; num++) {
                slide.elementImg[num].setAttribute("img-number", num);

                slide.elementImg[num].addEventListener("click", (event) => {
                    slide.imgSelected = parseInt(event.target.parentElement.getAttribute("img-number"));
                    slide.normalizeSlide();
                });

                if (slide.elementImg[num].classList.contains("selected")) {
                    slide.imgSelected = num;
                }
            }

            document.getElementById("prev").addEventListener("click", () => { slide.prevSlide() });
            document.getElementById("next").addEventListener("click", () => { slide.nextSlide() });

        }

        $(document).ready(function () {
            var buttons = document.getElementsByClassName('btnDelete');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener("click", function () { 
                    var x = document.getElementById($(this).val());
                    x.style.display="none"; 
                })
            }
        }); 
        $('.slider').each(function() {
            var $this = $(this);
            var $group = $this.find('.slide_group');
            var $slides = $this.find('.slide');
            var bulletArray = [];
            var currentIndex = 0;
            var timeout;
            
            function move(newIndex) {
              var animateLeft, slideLeft;
              
              advance();
              
              if ($group.is(':animated') || currentIndex === newIndex) {
                return;
              }
              
              bulletArray[currentIndex].removeClass('active');
              bulletArray[newIndex].addClass('active');
              
              if (newIndex > currentIndex) {
                slideLeft = '100%';
                animateLeft = '-100%';
              } else {
                slideLeft = '-100%';
                animateLeft = '100%';
              }
              
              $slides.eq(newIndex).css({
                display: 'block',
                left: slideLeft
              });
              $group.animate({
                left: animateLeft
              }, function() {
                $slides.eq(currentIndex).css({
                  display: 'none'
                });
                $slides.eq(newIndex).css({
                  left: 0
                });
                $group.css({
                  left: 0
                });
                currentIndex = newIndex;
              });
            }
            
            function advance() {
              clearTimeout(timeout);
              timeout = setTimeout(function() {
                if (currentIndex < ($slides.length - 1)) {
                  move(currentIndex + 1);
                } else {
                  move(0);
                }
              }, 4000);
            }
            
            $('.next_btn').on('click', function() {
              if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
              } else {
                move(0);
              }
            });
            
            $('.previous_btn').on('click', function() {
              if (currentIndex !== 0) {
                move(currentIndex - 1);
              } else {
                move(3);
              }
            });
            
            $.each($slides, function(index) {
              var $button = $('<a class="slide_btn">&bull;</a>');
              
              if (index === currentIndex) {
                $button.addClass('active');
              }
              $button.on('click', function() {
                move(index);
              }).appendTo('.slide_buttons');
              bulletArray.push($button);
            });
            
            advance();
          });