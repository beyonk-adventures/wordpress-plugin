=== Plugin Name ===
Contributors: antonybeyonk
Donate link: http://github.com/beyonk-adventures
Tags: booking, scheduling, payments, woocommerce, ecommerce, gutenberg
Requires at least: 5.5
Tested up to: 5.5
Requires PHP: 7.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
 
A plugin for integrating the Beyonk Booking Platform into Wordpress Posts, Pages, and WooCommerce checkout.
 
== Description ==
 
A plugin for integrating the Beyonk Booking Platform into Wordpress Posts, Pages, and WooCommerce checkout.
 
== Installation ==
 
This section describes how to install the plugin and get it working.
 
1. Upload `plugin-name.php` via the `plugins` page in WordPress
1. Activate the plugin through the 'Plugins' menu in WordPress

== Configuration ==

The main plugin configuration is accessible via the 'Beyonk SDK' menu which will appear to the left-hand side of your Wordpress Admin Dashboard

=== Adding Booking Form to a Post / Page ===

To add the Booking form to a post or page, edit the page, and click the "Add Block" icon in the top left of the editor.

When the block list comes up, either search for "Booking Form", or scroll to the "Beyonk" section at the bottom of the list, and click the Booking Form icon when it appears.

Enter the full URL to your Experience page on the beyonk site.

=== Adding Booking Form as a Payment method for WooCommerce ===

Products in WooCommerce can use the Beyonk Booking Form rather than the traditional WooCommerce Shopping Cart process, on an individual basis.

To add the Booking Form as a checkout option for a product in WooCommerce:

1. Click the Products menu item on the left hand side of your WordPress dashboard.
1. Pick a product to edit, or add a new one.
1. Ensure the "Product Data" editor is expanded by clicking the small triangle at the right-hand side of the heading.
1. Choose the "Attributes" tab from the left-hand side of the editor.
1. Choose "Custom product attribute" from the list of attribute types, and click "Add"
1. Enter "beyonk_id" in lowercase, without quotes, as the attribute "Name" and enter your Experience's ID.
1. Click "Save Attributes"

You should now see the Booking Form instead of "Add To Cart" button on that product in your WooCommerce Shop Front.
 
== Changelog ==
 
= 0.0.18 =
* Initial Release
