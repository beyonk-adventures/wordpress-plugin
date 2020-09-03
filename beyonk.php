<?php
  /**
  * Plugin Name: Beyonk SDK
  * Plugin URI: https://sdk.beyonk.com/
  * Description: Plugin for integrating with the Beyonk Booking Platform
  * Version: 0.0.18
  * Author: Antony MacKenzie-Jones
  * Author URI: http://beyonk.com/
  **/

  include_once( plugin_dir_path( __FILE__ ) . 'updater.php');

  update_option('delivery_url', 'sdk.qa.beyonk.com');
  update_option('booking_form_width', '300px');
  update_option('booking_form_height', '510px');

  add_action( 'admin_menu', 'create_plugin_settings_page' );
  function create_plugin_settings_page () {
    $page_title = 'Beyonk SDK Settings';
    $menu_title = 'Beyonk SDK';
    $capability = 'manage_options';
    $slug = 'beyonk_fields';
    $callback = 'plugin_settings_page_content';
    $icon = 'dashicons-admin-plugins';
    $position = 100;

    add_settings_section( 'experience_details_section', 'Theme', 'section_callback', 'beyonk_fields' );
    add_settings_field( 'theme_colour', 'Theme Colour', 'theme_colour_callback', 'beyonk_fields', 'experience_details_section' );
    register_setting( 'beyonk_fields', 'theme_colour' );

    add_menu_page( $page_title, $menu_title, $capability, $slug, $callback, $icon, $position );
  }

  function section_callback () {
    return;
  }

  function theme_colour_callback( $arguments ) {
    echo '<input name="theme_colour" id="theme_colour" type="color" value="' . get_option( 'theme_colour' ) . '" />';
  }

  function plugin_settings_page_content() { ?>
    <div class="wrap">
        <h2>Beyonk SDK Settings<h2>
        <form method="post" action="options.php">
            <?php
                settings_fields( 'beyonk_fields' );
                do_settings_sections( 'beyonk_fields' );
                submit_button();
            ?>
        </form>
    </div> <?php
  }

  function settings_js() {
    ?>
      <script type="text/javascript">
        window.BEYONK = window.BEYONK || {};
        window.BEYONK.sdk = window.BEYONK.sdk || {};
        window.BEYONK.sdk.theme = <?php echo json_encode(get_option('theme_colour', '#32B0A2')); ?>;
        window.BEYONK.sdk.deliveryUrl = <?php echo json_encode(get_option('delivery_url', 'sdk.beyonk.com')); ?>;
        window.BEYONK.sdk.bookingFormWidth = <?php echo json_encode(get_option('booking_form_width', '300px')); ?>;
        window.BEYONK.sdk.bookingFormHeight = <?php echo json_encode(get_option('booking_form_height', '510px')); ?>;
      </script>
    <?php
  }

  add_action('enqueue_block_editor_assets', 'beyonk_load_sdk_blocks');
  function beyonk_load_sdk_blocks() {
    add_action('wp_print_scripts', 'settings_js');

    wp_enqueue_script(
      'beyonk-booking-form',
      plugin_dir_url(__FILE__) . 'booking-form.js',
      array('wp-blocks','wp-editor'),
      true
    );
  }

  add_filter( 'block_categories', 'beyonk_block_categories', 10, 2 );
  function beyonk_block_categories( $categories, $post ) {
    if ( $post->post_type !== 'post' ) {
        return $categories;
    }
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'beyonk',
                'title' => __( 'Beyonk', 'beyonk' ),
                'icon'  => 'wordpress',
            ),
        )
    );
  }

  add_action('plugins_loaded', 'maybe_load_woocommerce_plugin');
  function maybe_load_woocommerce_plugin () {
    if (defined('WC_VERSION')) {
      include_once( plugin_dir_path( __FILE__ ) . 'woocommerce_plugin.php');
    }
  }

  $updater = new BeyonkUpdater( __FILE__ , 'beyonk-adventures', 'wordpress-plugin');
?>
