<?php
  add_filter( 'woocommerce_payment_gateways', 'beyonk_add_gateway_class' );
  
  function beyonk_add_gateway_class( $gateways ) {
    $gateways[] = 'BeyonkWooCommercePaymentGateway';
    return $gateways;
  }

  add_filter( 'woocommerce_product_tabs', 'beyonk_add_booking_tab' );
  function beyonk_add_booking_tab( $tabs ) {
    global $product;

    $experienceId = $product->get_attribute('beyonk_id');
    $enabled = get_option( 'beyonk_woocommerce_enabled' );

    if ($enabled and $experienceId) {
      $tabs['desc_tab'] = array(
        'title'     => __( 'Book Now', 'woocommerce' ),
        'priority'  => 1,
        'callback'  => 'beyonk_output_booking_form'
      );
    }

    return $tabs;
  }

  add_action( 'woocommerce_before_single_product', 'beyonk_control_add_to_cart' );
  function beyonk_control_add_to_cart () {
    global $product;

    $experienceId = $product->get_attribute('beyonk_id');
    $enabled = get_option( 'beyonk_woocommerce_enabled' );

    if ($enabled and $experienceId) {
      add_filter( 'woocommerce_is_purchasable', '__return_false');
    }
  }

  function beyonk_output_booking_form () {
    global $product;

    $enabled = get_option( 'beyonk_woocommerce_enabled' );
    $experienceId = $product->get_attribute('beyonk_id');

    if ($enabled) {
      $deliveryUrl = get_option('delivery_url');
      $width = get_option('booking_form_width');
      $height = get_option('booking_form_height');
      $theme = get_option('theme_colour');

      echo '<div style="display: flex; flex: 1 0 auto; width: 100%; justify-content: center; align-items: center;"><iframe scrolling="no" src="//' . $deliveryUrl . '/b/?event=' . $experienceId . '&theme=' . substr($theme, 1) . '" style="width: ' . $width . '; height: ' . $height . '; border: 0;" title="Beyonk Booking Form"></iframe></div>';
      return;
    }
  }
    
  add_action( 'plugins_loaded', 'beyonk_init_gateway_class' );
  function beyonk_init_gateway_class() {
    class BeyonkWooCommercePaymentGateway extends WC_Payment_Gateway {
      public function __construct() {
        $this->id = 'beyonk_wc_payment_gateway';
        $this->icon = '';
        $this->method_title = 'Beyonk Booking Form';
        $this->method_description = 'Adds a Beyonk Booking Form for payments';
      
        $this->supports = array(
          'products'
        );
      
        $this->init_form_fields();
      
        $this->init_settings();
        $this->title = $this->get_option( 'title' );
        $this->description = $this->get_option( 'description' );
        $this->enabled = $this->get_option( 'enabled' );

        add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
      }

      public function process_admin_options () {
        parent::process_admin_options();

        echo "<p>" . $this->get_option( 'enabled' ) . "<p>";
        update_option( 'beyonk_woocommerce_enabled', $this->get_option( 'enabled' ) === 'yes' );
      }
  
      public function init_form_fields() {
        $this->form_fields = array(
          'enabled' => array(
            'title'       => 'Enable/Disable',
            'label'       => 'Enable Booking form and Disable WooCommerce cart',
            'type'        => 'checkbox',
            'description' => '',
            'default'     => 'no'
          )
        );
      }
    }
  }

  ?>