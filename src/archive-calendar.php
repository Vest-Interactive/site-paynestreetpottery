<?php 
/* Template Name: Class Archive */ 
//wp_head(); 
get_header(); ?>

<section id="pagewrap" class="secondary">

    <header>
        <div class="secondary-header">
            <h1> 
                CALENDAR OF EVENTS
            </h1>
            <div class="text-columns">
                <p>
                    Want to stay up-to-date on what’s going on here at Payne Street Pottery? Check out our calendar below! It includes everything from group classes to private sessions. We’re always adding new events, so check back often.
                </p>           
            </div>
        </div>
         <figure class="top-background">
                <img src="/wp-content/themes/paynestreetpottery/dist/img/background-calendar-top.jpg">
            </figure>
    </header>


    <ul class="calendar-container">
        <li class="col cal-month-container"> 
            <section class="main">
                <div class="custom-calendar-wrap">
                    <div id="custom-inner" class="custom-inner">
                        <div class="custom-header clearfix">
                            <nav>
                                <span id="custom-prev" class="custom-prev"></span>
                                <span id="custom-next" class="custom-next"></span>
                            </nav>
                            <div class="date-container">
                                <span id="custom-month" class="custom-month"></span>
                                <span id="custom-year" class="custom-year"></span>
                            </div>
                        </div>
                        <div id="calendar" class="fc-calendar-container"></div>
                    </div>
                </div>
            </section>
        </li>
        <li class="col" style="background-color: #969678;"> 
            <div class="calDetail-header">
                <h1 id="calDetail-month" class="month"> </h1>
            </div>
            <div class="calDetail-container">                        
                <ul id="cal-detail" class="eventsCalendar-list">  </ul>
            </div>
        </li>
    </ul>


</section> 

<?php get_footer(); ?>