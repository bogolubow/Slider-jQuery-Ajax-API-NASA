$(function(){
    console.log('DOM!')
    
    var $header = $('header');
    var headerWidth; setHeaderWidth();
    
    var $loader = $header.find('.loader');
    var $ul = $header.find('ul');
    var $next = $header.find('.next');
    var $prev = $header.find('.prev');
    var $nav = $header.find('nav');
    
    var index = 0;
    var error = 0;
    
    function initBtn() {
        var time = 500;
        
        var widthNext = $next.parent().outerWidth();
        $next
            .animate({right: -(widthNext-10)+'px'}, time*3)
            .on('mouseenter', function(){
                $(this).stop().animate({right: 0}, time);
            })
            .on('mouseout', function(){
                $(this).stop().animate({right: -(widthNext-10)+'px'}, time);
            })
            .on('click', function(){
                index++;
            
                init('next');
            })

        var widthPrev = $next.parent().outerWidth();
        $prev
            .animate({left: -(widthPrev-10)+'px'}, time*3)
            .on('mouseenter', function(){
                $(this).stop().animate({left: 0}, time);
            })
            .on('mouseout', function(){
                $(this).stop().animate({left: -(widthPrev-10)+'px'}, time);
            })
            .on('click', function(){
                index--;
                init('prev');
            });
        
        $nav.on('click', 'a', function(){
            var indexOld = index;
            index = $(this).index();
            //console.log($(this).index());
            if(index !== indexOld) {
                $ul.fadeTo(1000, 0.3);
                animateImageElement(indexOld > index ? 'prev' : 'next', Math.abs(indexOld-index));
            }
        });
        
        
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function getRandomDate() {
        var year = getRandomInt(2010, 2016);
        var month = getRandomInt(1, 12);
        var day = getRandomInt(1, 28);
        
        return year+'-'+month+'-'+day;
    }
    
    function createDot(type) {
        var $a = $('<a>').css('bottom', '-50px');
        switch(type) {
            case 'init':
            case 'next':
                $nav.append($a);
                break;
            case 'prev':
                $nav.prepend($a);
                break;
        }
        
        $a.animate({bottom: 0}, 1000);
    }
    
    function setDotActive(){
        var list = $nav.find('a');
        list.removeClass('active');
        list.eq(index).addClass('active');
    }
    
    function createImageElement(type, url) {
        var $li = $('<li>').css({'background-image': 'url('+url+')'});
        
        if(type === 'init') {
            $ul.append($li);
        } else if(type === 'next') {
            $ul.append($li);
            
        } else if(type === 'prev') {
            $ul
                .prepend($li)
                .css('left', -((index+1) * headerWidth) + 'px')
        }
        
        setUlWidth();
        createDot(type);
        animateImageElement(type);
    }
    
    function setUlWidth() {
        console.log('set width', $ul.find('li').length, headerWidth, $ul.find('li').length*headerWidth);
        $ul.width($ul.find('li').length*headerWidth);
    }
    
    function setHeaderWidth() {
        headerWidth = $header.width();
    }
    
    function animateImageElement(type, num) {
        if(typeof num === 'undefined')
            num = 1;
        
        switch(type) {
            case 'init':
                // nie robie nic wyjątkowego! :)
                break;
            case 'next':
            case 'prev':
                $ul.animate({left: -(index*headerWidth)+'px'}, 1000*num)
                break;
        }
        
        $ul.fadeTo(1000, 1);
        setDotActive();
    }
    
    function loadImage(type) {
        $.ajax({
            url: 'https://api.nasa.gov/planetary/apod?api_key=scXZq06Z33nnXYB5Zx48eTCWbAtFwm851zbFxeFN&date='+getRandomDate()
        }).done(function(response){
            console.log(response, type);
            if(typeof response.url !== 'undefined' && response.media_type === 'image') {
                var url = response.hdurl;
                var $image = $('<img>').attr('src', url);
                $image
                    .on('load', function(){
                        console.log('image load');

                        $loader.hide();
                        createImageElement(type, url);
                    })
                    .on('error', function(){
                        console.log('error!');
                    
                        error++;
                    
                        if(error > 5) {
                            alert('Nie mogę pobrać zdjęć');
                        } else {
                            setTimeout(function(){
                                loadImage(type);
                            }, 1000)
                        }
                    });

            } else {
                loadImage(type);
            }
            //console.log(response);
        }).fail(function(){
            alert('Nie mogę połączyć się z API NASA');
        });
    }
    
    function init(type) {
        //console.log(typeof type, index)
        if(typeof type === 'undefined') {
            type = 'init';
        }
        
        
        $ul.fadeTo(1000, 0.3);
        
        var $li = $ul.find('li');
        console.log($li.length, index);
        if(type === 'init' || index >= $li.length || index < 0) {
            if(index < 0) {
                index = 0;
            }
            
            $loader.show();
            loadImage(type);
        } else {
            animateImageElement(type);
        }
        
        $(window).on('resize', function(){
            setHeaderWidth();
            setUlWidth();
            $ul.css({left: -(index*headerWidth)+'px'});
            //console.log('resize!!!');
        })
        
        
        
    }
    
    initBtn();
    init();
    
    
})