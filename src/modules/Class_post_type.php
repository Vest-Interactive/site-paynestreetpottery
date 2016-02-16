<?php

/* author @andrew
 * description @custom_post_type Class
 * - archive-Class.php, single-Class.php
 * - Create Page and make it the same title as the custom_post_type in order to direct to it, then replace the archive- with the page.
 */

// Register Custom Post Type
function Class_post_type() {

    $labels = array(
        'name'                => _x( 'Class', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Class', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Class', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Class:', 'text_domain' ),
        'all_items'           => __( 'All Class', 'text_domain' ),
        'view_item'           => __( 'View Class', 'text_domain' ),
        'add_new_item'        => __( 'Add New Class', 'text_domain' ),
        'add_new'             => __( 'New Class', 'text_domain' ),
        'edit_item'           => __( 'Edit Class', 'text_domain' ),
        'update_item'         => __( 'Update Class', 'text_domain' ),
        'search_items'        => __( 'Search Class', 'text_domain' ),
        'not_found'           => __( 'No Class found', 'text_domain' ),
        'not_found_in_trash'  => __( 'No Class found in Trash', 'text_domain' ),
    );
    $args = array(
        'label'               => __( 'Class', 'text_domain' ),
        'description'         => __( 'Class information pages', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array( 'title', 'editor', 'author',  ),
        //'taxonomies'          => array( 'category' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
         'taxonomies' => array(
            'Filter',
            'Capabilities'
        ) // Add Category and Post Tags support
    );

    register_post_type( 'Class', $args );
}
add_action( 'init', 'Class_post_type', 0 );


// Register Custom Taxonomy
function add_Class_taxonomies() {
  // Add new "Filter" taxonomy to Class
  register_taxonomy('Filter', 'Class', array(
    // Hierarchical taxonomy (like categories)
    'hierarchical' => true,
    // This array of options controls the labels displayed in the WordPress Admin UI
    'labels' => array(
      'name' => _x( 'Filter', 'taxonomy general name' ),
      'singular_name' => _x( 'Filter', 'taxonomy singular name' ),
      'search_items' =>  __( 'Search Filter' ),
      'all_items' => __( 'All Filter' ),
      'parent_item' => __( 'Parent Filter' ),
      'parent_item_colon' => __( 'Parent Filter:' ),
      'edit_item' => __( 'Edit Filter' ),
      'update_item' => __( 'Update Filter' ),
      'add_new_item' => __( 'Add New Filter' ),
      'new_item_name' => __( 'New Filter Name' ),
      'menu_name' => __( 'Filter' ),
    ),
    // Control the slugs used for this taxonomy
    'rewrite' => array(
      'slug' => 'Class', // This controls the base slug that will display before each term
      'with_front' => false, // Don't display the category base before "/locations/"
      'hierarchical' => false // This will allow URL's like "/locations/boston/cambridge/"
    ),
  ));

  // Add new "Capabilities" taxonomy to Class
  register_taxonomy('Capabilities', 'Class', array(
    // Hierarchical taxonomy (like categories)
    'hierarchical' => true,
    // This array of options controls the labels displayed in the WordPress Admin UI
    'labels' => array(
      'name' => _x( 'Capabilities', 'taxonomy general name' ),
      'singular_name' => _x( 'Capabilities', 'taxonomy singular name' ),
      'search_items' =>  __( 'Search Capabilities' ),
      'all_items' => __( 'All Capabilities' ),
      'parent_item' => __( 'Parent Capabilities' ),
      'parent_item_colon' => __( 'Parent Capabilities:' ),
      'edit_item' => __( 'Edit Capabilities' ),
      'update_item' => __( 'Update Capabilities' ),
      'add_new_item' => __( 'Add New Capabilities' ),
      'new_item_name' => __( 'New Capabilities Name' ),
      'menu_name' => __( 'Capabilities' ),
    ),
    // Control the slugs used for this taxonomy
    'rewrite' => array(
      'slug' => 'Class', // This controls the base slug that will display before each term
      'with_front' => false, // Don't display the category base before "/locations/"
      'hierarchical' => false // This will allow URL's like "/locations/boston/cambridge/"
    ),
  ));
}
add_action( 'init', 'add_Class_taxonomies', 0 );