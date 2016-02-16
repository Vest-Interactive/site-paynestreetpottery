<?php /* Template Name: Demo Page Template */ get_header(); ?>



		<?php if (have_posts()): while (have_posts()) : the_post(); ?>


				<?php the_content(); ?>

				<?php edit_post_link(); ?>


		<?php endwhile; ?>

		<?php else: ?>
			<article>
				<h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
			</article>
		<?php endif; ?>



<?php get_footer(); ?>
