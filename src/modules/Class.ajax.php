<?php 


	/* 
	 *  JSON custom_post_type meta field generator 
	 *  - This will get the recitals and student's lesson times.
	 */	

	if (isset($_POST['type'])) {

		require_once("../../../../../wp-load.php");

		$events = array();

		/* Iterate and get the Recital/Calendar Times */
		$args = array(
				'post_type' => 'Class',
				'posts_per_page' => -1,
				'orderby' => 'meta_value_num',
				'meta_key' => 'start_date',
				'order' => 'ASC'
			);
		$loop = new WP_Query( $args );
		 while ( $loop->have_posts() ) : $loop->the_post(); 
		 	$meta = get_post_meta($post->ID);
		 	$terms = wp_get_post_terms($post->ID, array('Type'));
		 	
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
    				'link' => get_permalink( $post->ID ),
    				'available' => $meta['availability'][0]
				)
    		);    		
		 endwhile; wp_reset_query();

		 /* Iterate and get the Student Times
		$args = array(
			'post_type' => 'student',
			'posts_per_page' => -1
		);
		$loop = new WP_Query( $args );
		 while ( $loop->have_posts() ) : $loop->the_post(); 
		 	$meta = get_post_meta($post->ID);
		 	$terms = wp_get_post_terms($post->ID, array('Type'));
		 	
		 	array_push($events,
    			array(
    				'id' => $post->ID,
    				'title' => 'Reserved',
    				'begin_date' => $meta['student_start_lesson'][0],
    				'end_date' => $meta['student_end_lesson'][0]    				
				)
    		);    		
		 endwhile; wp_reset_query(); */

	echo json_encode(array( "success" => 1, "events" => $events));

	}

?>
