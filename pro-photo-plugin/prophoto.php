<?php

/*
Plugin Name: Pro Photo
Plugin URI:
Description:
Author: Keyston Clay
Version: 0.1
Network: True
*/

class Pro_Photo
{

    public $plugin_domain;
    public $views_dir;
    public $version;

    public function __construct()
    {
        $this->plugin_domain = 'pro-photo';
        $this->views_dir = trailingslashit(dirname(__FILE__)) . 'server/views';
        $this->version = '1.0';
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('wp_ajax_pp_load_posts', array(&$this, 'ajax_load_posts'));
        add_action('rest_api_init', array(&$this, 'setup_rest_api'));
    }

    public function ajax_load_posts()
    {

    }

    public function setup_rest_api()
    {
        register_rest_route('pro-photo/v1', '/posts/', array(
            'methods' => 'DELETE',
            'callback' => array(&$this, 'rest_bulk_delete_posts'),
        ));
    }

    function rest_bulk_delete_posts(WP_REST_Request $request)
    {

        $ids = array_map('intval', explode(',', $request->get_param('ids')));

        $response = array(
            'deleted' => array()
        );
        foreach ($ids as $id) {
            if (wp_delete_post($id)) {
                $response['deleted'][] = $id;
            }
        }

        return $response;

    }

    public function admin_menu()
    {
        $title = __('Pro Photo', $this->plugin_domain);

        $hook_suffix = add_menu_page($title, $title, 'edit_posts', $this->plugin_domain, array(
            $this,
            'load_admin_view',
        ));

        add_action('load-' . $hook_suffix, array($this, 'load_bundle'));
    }

    public function load_view($view)
    {
        $path = trailingslashit($this->views_dir) . $view;

        if (file_exists($path)) {
            include $path;
        }
    }

    public function load_admin_view()
    {
        $this->load_view('admin.php');
    }

    public function load_bundle()
    {
        $handle = $this->plugin_domain . '-bundle';
        wp_enqueue_script($handle, plugin_dir_url(__FILE__) . 'dist/bundle.js', array(), $this->version, 'all');

        wp_localize_script($handle, 'wpApiSettings', array(
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest')
        ));
        wp_enqueue_media();
    }
}

new Pro_Photo();