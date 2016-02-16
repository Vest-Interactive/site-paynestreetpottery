<?php

get_header();

    if (have_posts()): while (have_posts()) : the_post(); 

        $meta = get_post_meta($post->ID);
        //$terms = wp_get_post_terms($post->ID, array('Type'));
        $events = array();
        array_push($events,
            array(
                'id' => $post->ID,
                'title' => get_the_title( $post->ID ),
                'description' => get_the_content( $post->ID ),
                'begin_date' => $meta['start_date'][0],
                'class_type' => $meta['class_type'][0],
                'duration_of_session' => $meta['duration_of_session'][0],
                'price' => $meta['price'][0],
                'total_seats' => $meta['total_seats'][0],
                'seats_available' => $meta['seats_available'][0],
                'number_of_weeks' => $meta['number_of_weeks'][0],
                'link' => get_permalink( $post->ID )
            )
        );          

    endwhile;
    endif; 
?>

<section role="main" id="pagewrap" class="tertiary">
    
    <article class="description supplies-equipment">        

        <div class="body">

            <p class="return-to-calendar">
                <a  href="/events/calendar/" title="Return to Calendar"><i class="fa fa-arrow-left"></i> &nbsp; Calendar</a>
            </p>

            <ul id="cal-detail" class="eventsCalendar-list">
                
            </ul>

            <h2 class="availability"><?php print_r($events[0]['seats_available']); ?> Seats Available, Sign Up Below!</h2>
            <form id="class-registration">
                <p>If you have a promotional coupon, please DO NOT register for the class here. Instead, email Tonya at <a href="mailto:tonya@paynestreetpottery.com">tonya@paynestreetpottery.com</a></p>
                <ul>
                    <li>
                        <input id="name" type="text" name="name" placeholder="Name" onfocus="if(this.value=='Name') this.value='';" onblur="if(this.value=='') this.value='Name';" title="Please add your Name" value="Name">
                        <label id="name_label" for="name"> Name </label>
                    </li>
                    <li>
                        <input id="email" type="text" name="email" onfocus="if(this.value=='Email') this.value='';" onblur="if(this.value=='') this.value='Email';" value="Email" placeholder="Email">
                        <label id="contact_label" for="email"> Email </label>
                    </li>
                    <li>
                        <input id="phone" type="text" name="phone" onfocus="if(this.value=='Phone') this.value=''; if(this.value=='(') this.value='';" onblur="if(this.value=='') this.value='Phone';" value="Phone" placeholder="Phone">
                        <label id="contact_phone" for="phone"> Phone </label>
                    </li>                        
                    <li>
                          <button disabled="true" 
                        class="snipcart-add-item"
                        data-item-id="2"
                        data-item-name="<?php print_r($events[0]['title']); ?> " 
                        data-item-price="35.00"
                        data-item-weight="0"
                        data-item-url="<?php print_r($events[0]['link']); ?>"
                        data-item-description="<?php print_r($events[0]['description']); ?>" 
                        data-item-custom1-type="label"
                        type="submit"> Submit </button>
                        <div class="unsuccessfulMessage"></div> 
                    </li>
                </ul>
            </form>

            <h2 class="waitlist-availability">Join the Waitlist!</h2>
            <form id="waitlist-registration">
                <p>If you have a promotional coupon, please DO NOT register for the class here. Instead, email Tonya at <a href="mailto:tonya@paynestreetpottery.com">tonya@paynestreetpottery.com</a></p>
                <ul>
                    <li>
                        <input id="wait-name" type="text" name="name" placeholder="Name" onfocus="if(this.value=='Name') this.value='';" onblur="if(this.value=='') this.value='Name';" title="Please add your Name" value="Name">
                        <label id="name_label" for="wait-name"> Name </label>
                    </li>
                    <li>
                        <input id="wait-email" type="text" name="email" onfocus="if(this.value=='Email') this.value='';" onblur="if(this.value=='') this.value='Email';" value="Email" placeholder="Email">
                        <label id="contact_label" for="wait-email"> Email </label>
                    </li>
                    <li>
                        <input id="wait-phone" type="text" name="phone" onfocus="if(this.value=='Phone') this.value='';" onblur="if(this.value=='') this.value='Phone';" value="Phone" placeholder="Phone">
                        <label id="contact_phone" for="wait-phone"> Phone </label>
                    </li>                        
                    <li>
                        <button type="submit"> Submit </button>
                        <div class="unsuccessfulMessage"></div>
                    </li>
                </ul>
            </form>
        </div>
        <div class="slide-btn"> <i class="fa fa-chevron-left"></i> </div>
    </article>

    <section class="details">
        <ul class="slideshow">
            <li style="background-image: url('/wp-content/themes/paynestreetpottery/dist/img/participate/bg-special-events-1.jpg')" class="active"></li>
            <li style="background-image: url('/wp-content/themes/paynestreetpottery/dist/img/participate/bg-special-events-2.jpg')"></li>
            <li style="background-image: url('/wp-content/themes/paynestreetpottery/dist/img/participate/bg-special-events-3.jpg')"></li>
            <li style="background-image: url('/wp-content/themes/paynestreetpottery/dist/img/participate/bg-special-events-4.jpg')"></li>
        </ul>       
        <div class="slide-btn-details description-hide"> <i class="fa fa-chevron-right"></i> </div>
    </section>

</section>


<script type="text/javascript" 
  id="snipcart" 
  src="https://app.snipcart.com/scripts/snipcart.js"
  data-api-key="NTk5N2EwNDYtZGNjMi00YWQzLThhOWEtZTM1MDJjNTJkYmJi">


  </script>

<link type="text/css"
  id="snipcart-theme"
  href="https://app.snipcart.com/themes/base/snipcart.css" 
  rel="stylesheet" />

  <script src="/wp-content/themes/paynestreetpottery/dist/js/en.js" type="text/javascript"></script>

    <script type="text/javascript" src="/wp-content/themes/paynestreetpottery/dist/js/lib/meowmask.js"></script>
    <script>

    
(function( root, $, undefined ) {
    "use strict";

    //Snipcart.execute('registerLocale', 'en-US');


    $(function () { 
        
            var singleEvent = <?php echo json_encode($events); ?>,
                singleEvent = singleEvent[0];

            var weeks = function() {
                        if(singleEvent.number_of_weeks == 0) { 
                            return '1 day';
                        } else { 
                            return singleEvent.number_of_weeks + ' weeks';
                        }
                    };

            var theEvent = {
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

                beginDate : moment.unix(singleEvent.begin_date).add(4, 'h').format('MM-DD-YYYY'),
                postDate : moment.unix(singleEvent.begin_date).add(4, 'h').format('l')
            };

            //apeend to button
            $('#class-registration button').attr('data-item-custom1-name', theEvent.beginDate); 

            var post = '<li id="'+theEvent.id+'" class="class">'+
                        '<div class="eventDate-Header">'+
                            '<span class="eventDate">'+theEvent.postDate+'</span>'+
                            '<h3><a href="#" target="_self" class="eventTitle">'+theEvent.classType+'</a></h3>'+
                        '</div>'+
                        '<p class="eventDesc ">'+theEvent.description+'</p>'+
                        '<ul class="eventDetails">'+
                            '<li class="eventDetails-day">'+theEvent.day+'</li>'+
                            '<li class="eventDetails-time">'+theEvent.durationOfSession+'</li>'+
                            '<li class="eventDetails-duration">'+theEvent.weeks+'</li>'+
                            '<li class="eventDetails-price">'+theEvent.price+'</li>'+
                        '</ul>'+
                    '</li>';

            $('#cal-detail').append(post);

            // mask
            $('#phone').setMask({ mask : '(999) 999-9999' }); 
            $('#wait-phone').setMask({ mask : '(999) 999-9999' });
            // Init mask and set the value to default, bug was causing this to be '('
            //$('#phone').mask('(000) 000-0000');
            $('#phone').val('Phone'); 
            $('#phone').keyup(function() {
                var $this = $(this);

                if ($this.val().length == 14) {

                    $this.blur(); 

                    var form = {
                    action: 'signup',
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    theEvent: theEvent
                }

                         if( (form.name != 'Name' && form.name != '') && 
                        (form.email != 'Email' && form.name != '') && 
                        (form.phone != 'Phone' && form.message != '') ) {

                        //$this.find('button').attr('disabled',false);
                    $('#class-registration').find('button').attr('disabled',false);

                    }
                }
            });

             $('#wait-phone').keyup(function() {
                var $this = $(this);

                if ($this.val().length == 14) {

                    $this.blur(); 

                    var form = {
                    action: 'signup',
                    name: $('#wait-name').val(),
                    email: $('#wait-email').val(),
                    phone: $('#wait-phonephone').val(),
                    theEvent: theEvent
                }

                         if( (form.name != 'Name' && form.name != '') && 
                        (form.email != 'Email' && form.name != '') && 
                        (form.phone != 'Phone' && form.message != '') ) {

                        //$this.find('button').attr('disabled',false);
                    $('#waitlist-registration').find('button').attr('disabled',false);

                    }
                }
            });


            if(theEvent.seats == 0 || theEvent.seats < 0) {     
                // Hide the Sign Up Form
                $('#class-registration').addClass('hide');
                $('.availability').addClass('hide');
                // Show the Waitlist Form
                $('.waitlist-availability').fadeIn();
                $('#waitlist-registration').fadeIn();
            }

            //var 

            $('#class-registration input').blur(function(){
                var $this = $(this);

                var form = {
                    action: 'signup',
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    theEvent: theEvent
                }

                if( (form.name != 'Name' && form.name != '') && 
                    (form.email != 'Email' && form.name != '') && 
                    (form.phone != 'Phone' && form.message != '') ) {

                    //$this.find('button').attr('disabled',false);
                $('#class-registration').find('button').attr('disabled',false);

                } else {
                    var error = ' * Please fill out entire form ';
                    $('.unsuccessfulMessage').html(error);
                }
                
            });


            Snipcart.execute('bind', 'order.completed', function (order) {
            
                console.log('enter completed cored');

                 var form = {
                    action: 'signup',
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    theEvent: theEvent
                }

                if( (form.name != 'Name' && form.name != '') && 
                    (form.email != 'Email' && form.name != '') && 
                    (form.phone != 'Phone' && form.message != '') ) {

                    var $this = $('#class-registration'),
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
                            $('.availability').text('Thank you for signing up');

                        }
                      }
                    });

                } else {
                    var error = ' * Please fill out entire form ';
                    $('.unsuccessfulMessage').html(error);
                }

            });


            // Wait and Fire ajax call when the submit their information
            $('#class-registration').on('submit', function(e){
                e.preventDefault();

                var form = {
                    action: 'signup',
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    theEvent: theEvent
                }

                console.log(form.theEvent);

                if( (form.name != 'Name' && form.name != '') && 
                    (form.email != 'Email' && form.name != '') && 
                    (form.phone != 'Phone' && form.message != '') ) {

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
                            $('.availability').text('Thank you for signing up');

                        }
                      }
                    });

                } else {
                    var error = ' * Please fill out entire form ';
                    $('.unsuccessfulMessage').html(error);
                }
            });


             // Waitlist - Fire ajax call when the submit their information
            $('#waitlist-registration').on('submit', function(e){
                e.preventDefault();

                var form = {
                    action: 'waitlist',
                    name: $('#wait-name').val(),
                    email: $('#wait-email').val(),
                    phone: $('#wait-phone').val(),
                    theEvent: theEvent
                }

                if( (form.name != 'Name' && form.name != '') && 
                    (form.email != 'Email' && form.name != '') && 
                    (form.phone != 'Phone' && form.message != '') ) {

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
                            $('.waitlist-availability').text('You are added to the Waitlist');

                        }
                      }
                    });

                } else {
                    var error = ' * Please fill out entire form ';
                    $('.unsuccessfulMessage').html(error);
                }
            });




    });

} ( this, jQuery ));


</script>

<?php 

get_footer();

?>