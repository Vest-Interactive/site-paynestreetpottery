(function( root, $, undefined ) {
	"use strict";

	$(function () { 

 		//Used to Hide Logo
        // $('.nav-container').on('mouseenter mouseleave',function() {
        //     $('.logo').toggleClass('logo-pull-left');
        //     $('#headerfooter').toggleClass('fadeOut-headerfooter ');
        //     var $this = $(this);

        //     //$this.css('background-image', 'url("http://paynestreetpottery.local:8888/wp-content/themes/paynestreetpottery/src/img/bg-menu-active.png")');
        // });

    $('.bg-hover').mouseover(function(){
      var $this = $(this);
      $this.addClass('bg-hover-yellow');

      $('.nav-container').addClass('active-nav');

      $('.logo').addClass('logo-pull-left');
      $('#headerfooter').addClass('fadeOut-headerfooter ');
    }).mouseleave(function(){
      var $this = $(this);
      $this.removeClass('bg-hover-yellow');

      $('.nav-container').removeClass('active-nav');

      $('.logo').removeClass('logo-pull-left');
      $('#headerfooter').removeClass('fadeOut-headerfooter ');
    });


		// Tertiary Pages
        (function() {
            if ($('#pagewrap').hasClass('tertiary')) {
                var $visibleDrawerBtn = $('.slide-btn-details'),
                    $article = $('article');

                $('.slide-btn').on('click', function() {        
                    $article.addClass('description-hide');
                    setTimeout(function() {
                        $visibleDrawerBtn.removeClass('description-hide');
                    }, 1000);
                });

                $visibleDrawerBtn.on('click', function() {
                    $visibleDrawerBtn.addClass('description-hide');
                    setTimeout(function() {
                        $article.removeClass('description-hide');
                    }, 1000);

                });

                $('.slideshow').slide();
            }
        })();


        // Contact Google Map
        (function() {
            if ($('.tertiary>article').hasClass('contact')) {
                google.maps.event.addDomListener(window, 'load', function() {
                  var mapOptions = {
                    center: { lat: 38.262723, lng: -85.700915},
                    zoom: 16,
                    zoomControl: false,
                    disableDoubleClickZoom: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    //scrollwheel: false,
                    panControl: false,
                    streetViewControl: false,
                    //draggable : false,
                    overviewMapControl: false,
                    overviewMapControlOptions: {
                        opened: false,
                    },
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{featureType:"administrative",
                    stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"simplified"}]},{featureType:"road",stylers:[{visibility:"simplified"}]},{featureType:"water",stylers:[{visibility:"simplified"}]},{featureType:"transit",stylers:[{visibility:"simplified"}]},{featureType:"landscape",stylers:[{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{visibility:"off"}]},

                        {featureType:"road.local",stylers:[{visibility:"on"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"road.arterial",stylers:[{visibility:"on"}]},{featureType:"water",stylers:[{color:"#5f94ff"},{lightness:26},{gamma:2.86}]},{},{featureType:"road.highway",stylers:[{weight:0.8},{saturation:-85},{lightness:61}]},{featureType:"road"},{},{featureType:"landscape",stylers:[{hue:"#0066ff"},{saturation:74},{lightness:100}]}],
                  };
                 
                  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            
                  var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(38.262723, -85.700915)
                    });

                  map.panBy(-200, 0);
                
                });
            }
        })();

        // Send Email from Form
        (function() {
            $('#send-generic-email').on('submit', function(e){
                e.preventDefault();

                var form = {
                    action: 'message',
                    name: $('#name').val(),
                    email: $('#email').val(),
                    subject: $('#subject').val(),
                    message: $('#message').val()
                }

                if( (form.name != 'Name' && form.name != '') && 
                    (form.email != 'Email' && form.email != '') && 
                    (form.subject != 'Subject' && form.subject != '') && 
                    (form.message != 'Message' && form.message != '') ) {

                    var $this = $(this),
                        contact = form;

                     $.ajax({
                      type: 'POST',
                      beforeSend: function(x) {
                        if (x && x.overrideMimeType) {
                         x.overrideMimeType("application/j-son;charset=UTF-8");
                        }
                      },
                      dataType: "json",
                      url: "/wp-content/themes/paynestreetpottery/dist/modules/Contact.ajax.php",
                      data: { contact : JSON.stringify(contact) },
                      success: function(msg) {
                        if (msg.hasOwnProperty('success')) {
                            
                            $this.fadeOut();
                            var success = '<div class="successefulMessage"> You\'re Message was sent successfully</div>';
                            $('.body').append(success);

                        }
                      }
                    });                

                } else {
                    var error = ' * Please fill out entire form ';
                    $('.unsuccessfulMessage').html(error);
                }

                // Send Ajax stuff return with success, fadeOut block.

               
            })
        })();



        // Artists
        (function() {
            if($('body').hasClass('artists')) {
                /**
                 *  Goal - Click a link, replace the background image with image from array of images
                 */
                 var _dir = '/wp-content/themes/paynestreetpottery/dist/img/Artists/'

                 var artists = [
                     {
                        'id': 0,
                        'image': _dir+'tonya-johnson',
                        'name': 'Tonya Johnson',
                        'title': '',
                        'description': 'Cooking and feeding people – lots of people – has always been an important part of my life. Consequently, I find myself drawn to large vessels for holding and serving food and when creating, naturally, my focus is functional ceramics. As a traditional craftsperson in our modern world, I find life warmer and richer through the use of handmade pieces in everyday life, especially now when machine manufactured items are plentiful, convenient, and inexpensive. As a potter and artist, my goal is to create utilitarian pieces that are durable and practical, yet expressive and aesthetically pleasing. My work reflects who I am and what is significant to me. In a cabinet full of dishes, my one-of-a-kind pieces take on their own personality. You will find yourself looking for your favorite mug, a certain bowl, or that one dish that feels just the way you like. My pots are large, full, sturdy forms that capture and hold intentional marks in the malleable clay. I complete them by dipping and pouring with food-safe glazes that drape and enhance their strong traditional forms, before high-firing them in gas and electric kilns – creating my own enduring legacy in clay.'
                     },
                     {
                        'id': 1,
                        'image': _dir+'ken-cordle',
                        'name': 'Ken Cordle',
                        'title': '',
                        'description': "Ken Cordle is a classically trained musician with a 25-year career in Human Resources and Business Administration. He's always had a passion for ceramic art since his college days, when a dear artist friend gave him clay to play with while hanging out in the ceramic studio. After collecting pottery for many years, he met Tonya Johnson who offered to teach him to make his own collections. Clay opens infinite avenues for creative exploration. A musician plays the same piece of music, the same way as all other musicians do. As a potter, Ken integrates all facets of himself to create exclusive pieces that explore shape, form, texture, and finish. Ken's work continues to be influenced by his love of music and social awareness."
                     },
                     {
                        'id': 2,
                        'image': _dir+'tony-glore',
                        'name': 'Tony Glore',
                        'title': '',
                        'description': "Tony Glore is a native of Louisville, Kentucky, where he first began working with clay to bring creative balance into his life in 2007 at Payne Street Pottery. Tony is drawn to creating work that encourages community and connection. For him, that means pieces that can be used for food and gatherings, such as platters, bowls, and candle stands. It also includes pieces used in ceremony, such as incense holders, Raku-fired smudge pots and cremation vessels. Currently, Tony is exploring his curiosity about fermented foods by creating a variety of styles and sizes of fermentation crocks."
                     },
                     {
                        'id': 3,
                        'image': _dir+'ted-herman',
                        'name': 'Ted Herman',
                        'title': '',
                        'description': "Ted Herman’s first experience with clay was when he signed up for a pottery class at Payne Street Pottery in January of 2011. He fell in love with the medium immediately and began to rent studio space as soon as his class session was complete. Studio rental allowed Ted to spend countless hours working on his own, while gleaning information from fellow potter friends and his mentor, Tonya Johnson. Ted loves working in clay because of the endless variety of functional vessels that are possible, and he wants to try to make everything. Ted says, “The experience of pottery making has made my life complete.” He is currently focusing on making canteens, bottles, and casserole dishes."
                     },
                     {
                        'id': 4,
                        'image': _dir+'jamie-isenberg',
                        'name': 'Jamie Isenberg',
                        'title': '',
                        'description': "A world of whimsical elegance can be found throughout Jamie Isenberg's body of work, where she focuses on the importance of detail in each piece, from every angle. Form and function are most prevalent in determining what she creates, though not always utilitarian or traditional in form. Jamie works with high-fire porcelain clay, each piece resting softly on a ruffled foot ring and adorned with her signature bird. The glaze palette is very lively, achieved by mixing bright mason stains into traditional glazes. Her work is constantly evolving and growing, and she finds great joy and satisfaction in honing her craft."
                     },
                     {
                        'id': 5,
                        'image': _dir+'tammy-moran',
                        'name': 'Tammy Moran',
                        'title': '',
                        'description': "Tami Moran has lived in the Louisville area all her life. She first became involved in the arts during high school, where she focused on painting and drawing. She continued this interest into her adult life by painting on wooden lamps, tables, and boxes. She added quilting to her repertoire with the birth of her first child in 1990. It was in 1999 that Tami first began working in clay with Tonya Johnson. She started out hand-building and slowly added wheel-thrown elements and it was in these early years that she made her first little birdbath. She continued to develop this form and sold the birdbaths at the Kentucky Craft Market and the Philadelphia Buyers Market in 2007. Today, Tami works at Payne Street Pottery as an instructor while continuing to make a variety of hand-built and wheel-thrown decorative pieces whose popularity continues to grow."
                     },
                     {
                        'id': 6,
                        'image': _dir+'candace-portman',
                        'name': 'Candace Portman',
                        'title': '',
                        'description': "It's been over 10 years since Candace signed up for her first 6-week pottery course at Payne Street Pottery. Initially, she thought it would be fun for her and a friend to dabble in the mud using the potter's wheel, but after a few months of wheel-throwing lessons, she discovered her true passion for creating through the art of hand-building. Candace enjoys transforming layers of smooth and textured clay into decorative, functional, one-of-a-kind art pieces. Candace is best known for her Brothers and Sisters family of wine chillers. Currently she is working on pieces that combine both wheel-thrown and hand-built elements. "
                     },
                     {
                        'id': 7,
                        'image': _dir+'richard-reinberg',
                        'name': 'Richard Reinberg',
                        'title': '',
                        'description': "Originally from the West Texas town of Fort Davis, Richard Reinberg was first encouraged to pursue the arts by a high school teacher. But it wasn’t until after a term in the military, being stationed in the Philippines, Thailand, Taiwan, and Japan, that he came home to Texas and studied ceramics with Bill Worrel at Odessa College in 1977. Unfortunately, he was unable to continue due to his job and spent several years living in California, Texas, Louisiana, and in 1996, Louisville, Kentucky. In 2007 he met Tonya Johnson and enrolled in her classes at Payne Street Pottery, where he was finally able to seriously pursue his lifelong dream to become a potter. Richard’s passion is throwing on the potter’s wheel, making sturdy, yet flirtatious functional pieces, using high-fired stoneware. His work is finished with layered, multicolored surfaces that are lustrous and durable. Today, Richard works with Johnson as an apprentice and assistant at Payne Street Pottery and in local art fairs."
                     },
                     {
                        'id': 8,
                        'image': _dir+'amy-rench',
                        'name': 'Amy Rench',
                        'title': '',
                        'description': "Growing up, Amy was always involved in some form of creative arts, especially music and drawing. In 2004 she enrolled in a ceramics course led by Tonya Johnson at Jefferson Community College. Intrigued by the use of fire to create permanent vessels out of earth, Amy decided to pursue ceramics seriously at the University of Louisville, where she earned her bachelor's degree in fine art in 2008. After graduation, Amy was offered an apprenticeship at Payne Street Pottery, working as a teacher and studio manager while participating in local sales and art fairs. Amy finds creating functional art heartwarming, and loves knowing her pieces are tangible, intimate connections between artist and customer, allowing her to become a participant in the many rituals associated with food and drink without being physically present. Amy enjoys sharing her creative and technical skills with students, sparking a love of clay in everyone that enters the studio, and also following her love of making functional pots."
                     }
                 ]

                 var html = '';

                 artists.forEach(function(el, index, ar) {
                    html += '<section>'+
                                '<img src="'+el.image+'.jpg"> '+
                                '<h2 data-artist-id="'+el.id+'">'+el.name+'</h2>'+
                                '<p>'+el.description+'</p><br/>'+                                
                            '</section>';
                 });




                 var $artistbucket = $('#artists-bucket');
                 
                 $artistbucket.append(html);

                 // $artistbucket.on('click', 'h2', function(e) {
                 //    var $this = $(this);

                 //    $('#artist-bg-img').css('background-image', 'url('+artists[$this.data('artist-id')].image+'.jpg)')
                 //    //$this.data('artist-id')

                 //    //console.log($this.data('artist-id').image);
                 // });

            }
        })();


        //Calendar
        (function() {
            if ($('body').hasClass('calendar')) {
                 // var _caldata = {
                 //        '02-12-2015' : '<li id="0" class="class"><time datetime="Thu Dec 11 2014 17:30:00 GMT-0500 (EST)"><em>12/11/2014</em><small>17:30</small></time><span class="eventDate">12/11/2014</span><h3><a href="#" target="_self" class="eventTitle">5-week intermediate class</a></h3><p class="eventDesc ">Lorem ipsum dolor sit amet, eos ea odio inciderint, id quodsi saperet cotidieque vis. Animal tractatos voluptatum sea ea. An exerci tibique adolescens sea, an putent platonem vim.</p><ul class="eventDetails"><li class="eventDetails-day">Monday</li><li class="eventDetails-time">5PM - 7PM</li><li class="eventDetails-duration">5-weeks</li><li class="eventDetails-price">$140</li></ul><a href="#" class="eventDetails-button">Sign Up!</a></li>',
                 //        '02-13-2015' : '<li id="0" class="class"><time datetime="Thu Dec 11 2014 17:30:00 GMT-0500 (EST)"><em>12/11/2014</em><small>17:30</small></time><span class="eventDate">12/11/2014</span><h3><a href="#" target="_self" class="eventTitle">5-week intermediate class</a></h3><p class="eventDesc ">Lorem ipsum dolor sit amet, eos ea odio inciderint, id quodsi saperet cotidieque vis. Animal tractatos voluptatum sea ea. An exerci tibique adolescens sea, an putent platonem vim.</p><ul class="eventDetails"><li class="eventDetails-day">Monday</li><li class="eventDetails-time">5PM - 7PM</li><li class="eventDetails-duration">5-weeks</li><li class="eventDetails-price">$140</li></ul><a href="#" class="eventDetails-button">Sign Up!</a></li>',
                 //        '02-14-2015' : '<li id="0" class="class"><time datetime="Thu Dec 11 2014 17:30:00 GMT-0500 (EST)"><em>12/11/2014</em><small>17:30</small></time><span class="eventDate">12/11/2014</span><h3><a href="#" target="_self" class="eventTitle">5-week intermediate class</a></h3><p class="eventDesc ">Lorem ipsum dolor sit amet, eos ea odio inciderint, id quodsi saperet cotidieque vis. Animal tractatos voluptatum sea ea. An exerci tibique adolescens sea, an putent platonem vim.</p><ul class="eventDetails"><li class="eventDetails-day">Monday</li><li class="eventDetails-time">5PM - 7PM</li><li class="eventDetails-duration">5-weeks</li><li class="eventDetails-price">$140</li></ul><a href="#" class="eventDetails-button">Sign Up!</a></li>',
                 //          '03-04-2015' : '<li id="0" class="class"><time datetime="Thu Dec 11 2014 17:30:00 GMT-0500 (EST)"><em>12/11/2014</em><small>17:30</small></time><span class="eventDate">12/11/2014</span><h3><a href="#" target="_self" class="eventTitle">5-week intermediate class</a></h3><p class="eventDesc ">Lorem ipsum dolor sit amet, eos ea odio inciderint, id quodsi saperet cotidieque vis. Animal tractatos voluptatum sea ea. An exerci tibique adolescens sea, an putent platonem vim.</p><ul class="eventDetails"><li class="eventDetails-day">Monday</li><li class="eventDetails-time">5PM - 7PM</li><li class="eventDetails-duration">5-weeks</li><li class="eventDetails-price">$140</li></ul><a href="#" class="eventDetails-button">Sign Up!</a></li>'
                 //    };


             //Gather the post dates
                $.ajax({
                    type: 'POST',
                    beforeSend: function(x) {
                        if (x && x.overrideMimeType) {
                         x.overrideMimeType("application/j-son;charset=UTF-8");
                        }
                    },
                    dataType: "json",
                    url: "/wp-content/themes/paynestreetpottery/dist/modules/Class.ajax.php",
                    data: { type : JSON.stringify('event_dates') },
                    success: function(msg) {            
                        // Success
                        if (msg.hasOwnProperty('success')) {                
                            
                            //console.log(msg);

                            var listEvents = {                  
                                //'11-DD-2014' : {content : '<span>Ex: {\'11-DD-2014\' : {content : \'Something\', end : 20}}</span>', start : 10, end : 20},
                                'addEvent' : function(eventPost) {                                   

                                    var now = moment().format('MM-DD-YYYY');
                                    //console.log(now < eventPost.beginDate); 
                                    // console.log(eventPost);

                                        // Check for there being a post on this date
                                        if(now < eventPost.beginDate) {
                                            
                                          // Check to ensure this day is available  
                                          if(eventPost.available === 'Available') {

                                              // Ensure There are Seats Available for this (otherwise disable signup btn)
                                              if(eventPost.seats > 0){

                                                   this[eventPost.beginDate] = '<li class="class">'+
                                                      '<div class="eventDate-Header"><span class="eventDate">'+eventPost.postDate+'</span>'+
                                                      '<h3><a href="#" target="_self" class="eventTitle">'+eventPost.classType+'</a></h3></div>'+
                                                      '<p class="eventDesc ">'+eventPost.description+'</p>'+
                                                      '<ul class="eventDetails">'+
                                                          '<li class="eventDetails-day">'+eventPost.day+'</li>'+
                                                          '<li class="eventDetails-time">'+eventPost.durationOfSession+'</li>'+
                                                          '<li class="eventDetails-duration">'+eventPost.weeks+'</li>'+
                                                          '<li class="eventDetails-price">'+eventPost.price+'</li>'+
                                                     '</ul>'+
                                                      '<a href="'+eventPost.link+'" class="eventDetails-button">Sign Up!</a>'+
                                                  '</li>';
                                              } else {
                                                  this[eventPost.beginDate] = '<li class="class">'+
                                                      '<div class="eventDate-Header"><span class="eventDate">'+eventPost.postDate+'</span>'+
                                                      '<h3><a href="#" target="_self" class="eventTitle">'+eventPost.classType+'</a></h3></div>'+
                                                      '<p class="eventDesc ">'+eventPost.description+'</p>'+
                                                      '<ul class="eventDetails">'+
                                                          '<li class="eventDetails-day">'+eventPost.day+'</li>'+
                                                          '<li class="eventDetails-time">'+eventPost.durationOfSession+'</li>'+
                                                          '<li class="eventDetails-duration">'+eventPost.weeks+'</li>'+
                                                          '<li class="eventDetails-price">'+eventPost.price+'</li>'+
                                                     '</ul>'+
                                                      '<a href="'+eventPost.link+'" class="eventDetails-button">Waitlist</a>'+
                                                  '</li>';
                                              }


                                          } else {

                                            //console.log(eventPost.available);
                                            this[eventPost.beginDate] = '<li class="class">'+
                                                      '<div class="eventDate-Header"><span class="eventDate">'+eventPost.postDate+'</span>'+
                                                      '<h3><a href="#" target="_self" class="eventTitle">Reserved</a></h3></div>'+
                                                      '<p class="eventDesc ">'+eventPost.description+'</p>'+
                                                      '<a href="#" class="eventDetails-button">Closed</a>'+
                                                      '</li>';
                                          }

                                        } else {

                                            //this[eventPost.beginDate] = '<a href="#" data-post_id="'+eventPost.id+'">'+ eventPost.title + '</a>';
                                            if(eventPost.seats > 0){
                                                this[eventPost.beginDate] = '<li class="class">'+
                                                    '<div class="eventDate-Header"><span class="eventDate">'+eventPost.postDate+'</span>'+
                                                    '<h3><a href="#" target="_self" class="eventTitle">'+eventPost.classType+'</a></h3></div>'+
                                                    '<p class="eventDesc ">'+eventPost.description+'</p>'+
                                                    '<ul class="eventDetails">'+
                                                        '<li class="eventDetails-day">'+eventPost.day+'</li>'+
                                                        '<li class="eventDetails-time">'+eventPost.durationOfSession+'</li>'+
                                                        '<li class="eventDetails-duration">'+eventPost.weeks+'</li>'+
                                                        '<li class="eventDetails-price">'+eventPost.price+'</li>'+
                                                   '</ul>'+
                                                    '<a href="#" class="eventDetails-button">Closed</a>'+
                                                '</li>';
                                            } else {
                                                this[eventPost.beginDate] = '<li class="class">'+
                                                    '<div class="eventDate-Header"><span class="eventDate">'+eventPost.postDate+'</span>'+
                                                    '<h3><a href="#" target="_self" class="eventTitle">'+eventPost.classType+'</a></h3></div>'+
                                                    '<p class="eventDesc ">'+eventPost.description+'</p>'+
                                                    '<ul class="eventDetails">'+
                                                        '<li class="eventDetails-day">'+eventPost.day+'</li>'+
                                                        '<li class="eventDetails-time">'+eventPost.durationOfSession+'</li>'+
                                                        '<li class="eventDetails-duration">'+eventPost.weeks+'</li>'+
                                                        '<li class="eventDetails-price">'+eventPost.price+'</li>'+
                                                   '</ul>'+
                                                    '<a href="#" class="eventDetails-button">Closed</a>'+
                                                '</li>';
                                            }
                                    }
                                }
                            }                                   

                            //Append dates data to the object, accomodate EST from UTC in time.
                            for(var x=0; x<msg['events'].length; x++) {

                                var singleEvent = msg['events'][x],
                                    weeks = function() {
                                                if(singleEvent.number_of_weeks == 0) { 
                                                    return '1 day';
                                                } else { 
                                                    return singleEvent.number_of_weeks + ' weeks';
                                                }
                                            }, 
                                    eventPost = {
                                        id : singleEvent.id,
                                        title: singleEvent.title,
                                        description: singleEvent.description,
                                        classType: singleEvent.class_type,
                                        durationOfSession: singleEvent.duration_of_session,
                                        price: singleEvent.price,
                                        day: moment.unix(singleEvent.begin_date).add(4,'4').format('dddd'),
                                        weeks: weeks(),
                                        link: singleEvent.link,
                                        seats: singleEvent.seats_available,
                                        available: singleEvent.available,

                                        beginDate : moment.unix(singleEvent.begin_date).add(4, 'h').format('MM-DD-YYYY'),
                                        postDate : moment.unix(singleEvent.begin_date).add(4, 'h').format('l')
                                    }          

                                listEvents.addEvent(eventPost);

                                //Duplicate Reserved Event Out 12 months...
                                // if (singleEvent.title == 'Reserved') {
                                //     var x=0, daysOut = 7;
                                //     while(x<52) {
                                //         eventPost = {
                                //             id  : 999,
                                //             title : 'Reserved',
                                //             beginDate : moment.unix(singleEvent.begin_date).add(daysOut, 'd').format('MM-DD-YYYY'),                                           
                                //             endDate : moment.unix(singleEvent.end_date).add(daysOut, 'd').format('MM-DD-YYYY')
                                //         }
                                //         x++, daysOut += 7;
                                //         listEvents.addEvent(eventPost);
                                //     }
                                // }
                            }

                            // Lets look at the Object that was created for Testing
                            console.log(listEvents);

                            //Go and add the object to the calendar
                            generateCalendar(listEvents);
                        }
                    }
                });




            var generateCalendar = function(_caldata) {
                
                    var updateMonthYear = function() {                
                        $month.html( cal.getMonthName() );
                        $year.html( cal.getYear() );
                    }

                    var showEvents = function( isEvent, $contentEl, dataProperties ) {
                        var month = dataProperties.month,
                                day = dataProperties.day,
                                year = dataProperties.year;
                            if (month < 10) month = '0' + month;
                            if (day < 10) day = '0' + day;

                            var date = month+'-'+day+'-'+year;   

                            $calMonth.html(dataProperties.monthname+' '+day+', '+year); 

                        if(isEvent) {                         
                            $calDetails.html(_caldata[date]);

                        } else {
                            $calDetails.html('<li class="eventsCalendar-noEvents"><h6 class="eventTitle">There are no events on this Day</h6><p class="eventDesc">The studio is available on this date! Click the link below to reserve studio space.</p><a href="/contact/" class="eventDetails-button">Reserve the Studio!</a></li>');
                        }
                    }

                  
                    // Identify the specific events in this month
                    var MonthEvents = function(_caldata, month, year) {
                        // Determine if any events are in this month
                        if (month < 10) month = '0' + month;
                        var arr = [],
                            monthEvents = '';

                        Object.getOwnPropertyNames(_caldata).forEach(function(val,idx,array) {
                            var _date = val.split('-');
                            if (_date[0] == month && _date[2] == year) {
                               //console.log(val + ' : ' + _caldata[val]);   
                               monthEvents += _caldata[val];
                               //console.log(_caldata[val]);
                            }                        
                         });

                        if (monthEvents == '') {

                            return '<li class="eventsCalendar-noEvents"><h6 class="eventTitle">There are no events on this Day</h6><p class="eventDesc">The studio is available on this date! Click the link below to reserve studio space.</p><a href="/contact/" class="eventDetails-button">Reserve the Studio!</a></li>';
                        } else {
                            return monthEvents;
                        }
                    }

              
                    /**
                     *  Begin Calendar jQuery Plugin
                     */
                    var transEndEventNames = {
                            'WebkitTransition' : 'webkitTransitionEnd',
                            'MozTransition' : 'transitionend',
                            'OTransition' : 'oTransitionEnd',
                            'msTransition' : 'MSTransitionEnd',
                            'transition' : 'transitionend'
                        },
                        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
                        $wrapper = $( '#custom-inner' ),
                        $calendar = $( '#calendar' ),
                        $calDetails = $('#cal-detail'),
                        $calMonth = $('#calDetail-month'),
                        cal = $calendar.calendario( {
                            onDayClick : function( $el, $contentEl, dateProperties ) {
                                /*if( $contentEl.length > 0 ) {
                                    showEvents( $contentEl, dateProperties );

                                }*/
                                $('.fc-row > div').removeClass('fc-today');
                                $el.addClass('fc-today');

                                if ( $contentEl.context.className == 'fc-content fc-today') {
                                    //console.log($contentEl);
                                    showEvents(true, $contentEl, dateProperties );
                                } else {
                                    showEvents(false, $contentEl, dateProperties);
                                }                      
                            },
                            caldata : _caldata,
                            displayWeekAbbr : true
                        } ),
                        $month = $( '#custom-month' ).html( cal.getMonthName() ),
                        $year = $( '#custom-year' ).html( cal.getYear() );

                    $( '#custom-next' ).on( 'click', function() {
                        cal.gotoNextMonth( updateMonthYear );
                        // Display the Month List of Events
                      //  console.log(MonthEvents(_caldata, cal.getMonth(), cal.getYear()));
                      $calDetails.html(MonthEvents(_caldata, cal.getMonth(), cal.getYear()));
                      $calMonth.html(cal.getMonthName() + ' Events');

                    } );
                    $( '#custom-prev' ).on( 'click', function() {
                        cal.gotoPreviousMonth( updateMonthYear );
                       //  console.log(MonthEvents(_caldata, cal.getMonth(), cal.getYear()));
                       //  console.log(cal.getMonth()+ ' '+ cal.getYear())
                        $calDetails.html(MonthEvents(_caldata, cal.getMonth(), cal.getYear()));
                        $calMonth.html(cal.getMonthName() + ' Events');
                    } );

                    

                    // On page load put current month events in the details window
                    $calMonth.html(cal.getMonthName() + ' Events');
                    $calDetails.html(MonthEvents(_caldata, cal.getMonth(), cal.getYear()));


                    
                    // Month Clikcs...
                    $('#custom-month, #custom-year').on('click', function() {
                      $calDetails.html(MonthEvents(_caldata, cal.getMonth(), cal.getYear()));
                      $calMonth.html(cal.getMonthName() + ' Events');
                    });
                }
            }



  
        })();




	});

} ( this, jQuery ));