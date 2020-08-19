<?
  class BeyonkUpdater {
    protected $file;
    protected $plugin;
    protected $basename;
    protected $active;
    private $username;
    private $repository;
    private $authorize_token;
    private $github_response;

    public function __construct( $file, $username, $repository ) {
      $this->file = $file;
      add_action( 'admin_init', array( $this, 'set_plugin_properties' ) );
      $this->username = $username;
      $this->repository = $repository;
      return $this;
    }

    public function set_plugin_properties () {
      $this->plugin   = get_plugin_data( $this->file );
      $this->basename = plugin_basename( $this->file );
      $this->active   = is_plugin_active( $this->basename );
    }

    private function get_repository_info () {
      echo "<p>gh resp " .  is_null( $this->github_response ) . "</p>";
      if ( is_null( $this->github_response ) ) {
        $request_uri = sprintf( 'https://api.github.com/repos/%s/%s/releases', $this->username, $this->repository );

        $response = json_decode( wp_remote_retrieve_body( wp_remote_get( $request_uri ) ), true );

        if( is_array( $response ) ) {
            $response = current( $response );
        }

        echo "<p>gh resp " . $response . "</p>";
        $this->github_response = $response;
      }
    }

    public function modify_transient( $transient ) {
      echo "<p>ppppp_prop exists</p>";
      if( property_exists( $transient, 'checked') ) {
        if( $checked = $transient->checked ) {
          $this->get_repository_info();
          $out_of_date = version_compare( $this->github_response['tag_name'], $checked[$this->basename], 'gt' );
          echo "<p>is out " . $out_of_date . "</p>";
          if( $out_of_date ) {
            $new_files = $this->github_response['zipball_url'];
            $slug = current( explode('/', $this->basename ) );
            $plugin = array(
              'url' => $this->plugin["PluginURI"],
              'slug' => $slug,
              'package' => $new_files,
              'new_version' => $this->github_response['tag_name']
            );
            $transient->response[ $this->basename ] = (object) $plugin;
          }
        }
      }
      return $transient;
    }

    public function plugin_popup( $result, $action, $args ) {
      if( ! empty( $args->slug ) ) {
        if( $args->slug == current( explode( '/' , $this->basename ) ) ) {
          $this->get_repository_info();
          $plugin = array(
            'name'              => $this->plugin["Name"],
            'slug'              => $this->basename,
            'version'           => $this->github_response['tag_name'],
            'author'            => $this->plugin["AuthorName"],
            'author_profile'    => $this->plugin["AuthorURI"],
            'last_updated'      => $this->github_response['published_at'],
            'homepage'          => $this->plugin["PluginURI"],
            'short_description' => $this->plugin["Description"],
            'sections'          => array( 
                'Description'   => $this->plugin["Description"],
                'Updates'       => $this->github_response['body'],
            ),
            'download_link'     => $this->github_response['zipball_url']
          );
          return (object) $plugin;
        }
      }   
      return $result;
    }

    public function after_install( $response, $hook_extra, $result ) {
      global $wp_filesystem;
    
      $install_directory = plugin_dir_path( $this->file );
      $wp_filesystem->move( $result['destination'], $install_directory );
      $result['destination'] = $install_directory;
    
      if ( $this->active ) {
        activate_plugin( $this->basename );
      }
      return $result;
    }

    public function initialize () {
      add_filter( 'pre_set_site_transient_update_plugins', array( $this, 'modify_transient' ), 10, 1 );
      echo "<p>next</p>";
      add_filter( 'plugins_api', array( $this, 'plugin_popup' ), 10, 3);
      add_filter( 'upgrader_post_install', array( $this, 'after_install' ), 10, 3 );
    }
  }
?>