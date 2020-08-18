const el = wp.element.createElement
const iconEl = el('svg', { width: '24', height: '24', viewbox: '0 0 24 24' },
  el('g', { transform: 'matrix(0.74958264,0,0,0.74958264,0,0.01335559)' },
    el('g', null,
      el('path', { style: { fill: '#06A092' }, d: 'M 32,7 V 5 H 27 V 0 H 25 V 5 H 7 V 0 H 5 V 5 H 0 V 7 H 5 V 25 H 0 v 2 h 5 v 5 h 2 v -5 h 18 v 5 h 2 v -5 h 5 V 25 H 27 V 7 Z M 25,25 H 7 V 7 h 18 z' })
    ),
    el('g', null,
      el('path', { style: { fill: '#06A092' }, d: 'm 16.9,20 c 0.4,0 0.9,0 1.2,-0.1 0.4,-0.1 0.7,-0.2 0.9,-0.4 0.3,-0.2 0.4,-0.4 0.6,-0.7 0.1,-0.3 0.2,-0.6 0.2,-1 0,-0.2 0,-0.5 -0.1,-0.7 -0.1,-0.2 -0.2,-0.4 -0.3,-0.6 -0.1,-0.2 -0.3,-0.3 -0.5,-0.4 -0.2,-0.1 -0.5,-0.2 -0.8,-0.3 0.3,-0.2 0.5,-0.4 0.7,-0.7 0.2,-0.3 0.2,-0.6 0.2,-1 0,-0.7 -0.2,-1.2 -0.6,-1.5 -0.4,-0.4 -1,-0.5 -1.8,-0.5 h -3.5 v 8 h 3.8 z M 15.2,13.6 H 16 c 0.7,0 1,0.3 1,0.8 0,0.5 -0.3,0.8 -1,0.8 h -0.8 z m 0,3.1 h 0.9 c 0.6,0 0.9,0.1 1.2,0.2 0.2,0.1 0.4,0.4 0.4,0.6 0,0.2 -0.1,0.5 -0.4,0.6 -0.2,0.1 -0.6,0.2 -1.2,0.2 h -0.9 z' })
    )
  )
)

wp.blocks.updateCategory( 'beyonk', { icon: iconEl } );

wp.blocks.registerBlockType('beyonk/booking-form', {
  title: 'Booking Form',
  icon: iconEl,
  category: 'beyonk',
  attributes: {
    theme: { type: 'string' },
    experienceId: { type: 'string' },
    url: { type: 'string' }
  },
  
  edit: function (props) {
    function updateUrl (event) {
      props.setAttributes({ url: event.target.value })
    }

    function updateExperience (event) {
      const url = new URL(props.attributes.url)
      const pathParts = url.pathname.split('/')
      const id = pathParts[2]
      props.setAttributes({ experienceId: id })
    }

    return el(
      'div',
      { class: 'components-placeholder is-large' },
      el('link', { href: 'https://fonts.googleapis.com/css2?family=Cabin&display=swap', rel: 'stylesheet' }),
      el('div', { class: 'components-placeholder__label' },
        el('span', { class: 'block-editor-block-icon has-colors' },
          iconEl
        ),
        'Beyonk Booking Form'
      ),

      el('div', { class: 'components-placeholder__instructions' }, 'Paste the url to your experience' ),

      el('div', { class: 'components-placeholder__fieldset' },
        el('form', { style: { marginBottom: '12px' } },
          el('input', { list: 'experiences', class: 'components-placeholder__input', id: 'byk_url_edit', type: 'url', value: props.attributes.url, onChange: updateUrl }),
          el('button', { type: 'button', class: 'components-button is-primary', onClick: updateExperience }, 'Lookup')
        ),
        props.attributes.experienceId
          ? el('div', { class: 'components-placeholder__learn-more' }, 'Experience: ' + props.attributes.experienceId)
          : ''
      )
    );
  },

  save: function (props) {
    return wp.element.createElement(
      'iframe',
      {
        scrolling: 'no',
        src: '//sdk.qa.beyonk.com/b/?event=' + props.attributes.experienceId + '&theme=' + 'aaeebb',
        style: { border: 0, overflow: 'hidden', width: '300px', height: '510px', backgroundColor: 'transparent' },
        title: 'Booking Form'
      }
    )
  }
})