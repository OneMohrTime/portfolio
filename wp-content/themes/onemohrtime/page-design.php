<?php
/**
 * Project page template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context           = Timber::get_context();
$context['post']   = new Timber\Post();
$args = array(
	'post_type'      => 'design',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order',
	'order'          => 'ASC'
);
$context['gallery'] = Timber::get_posts( $args );
$context['roles']   = new TimberTerm('design');

Timber::render('pages/page-design.twig', $context);