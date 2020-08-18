wp.blocks.registerBlockType('beyonk/booking-form', {
  title: 'Booking Form',
  icon: 'smiley',
  category: 'common',
  attributes: {
    theme: { type: 'string' },
    experienceId: { type: 'string' }
  },
  
  edit: function (props) {
    function updateExperience (event) {
      props.setAttributes({ experienceId: event.target.value })
    }

    function updateColor (event) {
      props.setAttributes({ theme: event.target.value })
    }

    function findExperiences (event) {
      const title = event.target.value
      if (title && title.length > 3) {
        fetch('https://api.qa.beyonk.com/api/v1/adventures?title=' + title)
        .then(function (res) {
          return res.json()
        })
        .then(function (results) {
          const dl = document.getElementById('experiences')
          dl.innerHTML = ''
          results.adventures.map(function (doc) {
            var option = document.createElement('option')
            option.value = doc.id
            option.innerHTML = doc.title
            dl.appendChild(option)
          })
        })
      }
    }

    return React.createElement(
      'div',
      { class: 'components-placeholder is-large' },
      React.createElement('link', { href: 'https://fonts.googleapis.com/css2?family=Cabin&display=swap', rel: 'stylesheet' }),
      React.createElement('div', { class: 'components-placeholder__label' },
        React.createElement('span', { class: 'block-editor-block-icon has-colors' },
          React.createElement('img', { style: { height: '24px', width: '24px' }, alt: 'Beyonk', src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMDZBMDkyO30KPC9zdHlsZT4KPGc+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzIsN1Y1aC01VjBoLTJ2NUg3VjBINXY1SDB2Mmg1djE4SDB2Mmg1djVoMnYtNWgxOHY1aDJ2LTVoNXYtMmgtNVY3SDMyeiBNMjUsMjVIN1Y3aDE4VjI1eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjksMjBjMC40LDAsMC45LDAsMS4yLTAuMWMwLjQtMC4xLDAuNy0wLjIsMC45LTAuNGMwLjMtMC4yLDAuNC0wLjQsMC42LTAuN2MwLjEtMC4zLDAuMi0wLjYsMC4yLTEKCQkJYzAtMC4yLDAtMC41LTAuMS0wLjdjLTAuMS0wLjItMC4yLTAuNC0wLjMtMC42Yy0wLjEtMC4yLTAuMy0wLjMtMC41LTAuNGMtMC4yLTAuMS0wLjUtMC4yLTAuOC0wLjNjMC4zLTAuMiwwLjUtMC40LDAuNy0wLjcKCQkJYzAuMi0wLjMsMC4yLTAuNiwwLjItMWMwLTAuNy0wLjItMS4yLTAuNi0xLjVjLTAuNC0wLjQtMS0wLjUtMS44LTAuNWgtMy41djhIMTYuOXogTTE1LjIsMTMuNkgxNmMwLjcsMCwxLDAuMywxLDAuOAoJCQlzLTAuMywwLjgtMSwwLjhoLTAuOFYxMy42eiBNMTUuMiwxNi43aDAuOWMwLjYsMCwwLjksMC4xLDEuMiwwLjJjMC4yLDAuMSwwLjQsMC40LDAuNCwwLjZzLTAuMSwwLjUtMC40LDAuNgoJCQljLTAuMiwwLjEtMC42LDAuMi0xLjIsMC4yaC0wLjlWMTYuN3oiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K' })
        ),
        'Beyonk Booking Form'
      ),

      React.createElement('div', { class: 'components-placeholder__instructions' }, 'Start typing the title of your experience' ),

      React.createElement('div', { class: 'components-placeholder__fieldset' },
        React.createElement('form', { style: { marginBottom: '12px' } },
          React.createElement('datalist', { id: 'experiences' }),
          React.createElement('input', { list: 'experiences', class: 'components-placeholder__input', id: 'byk_content_edit', type: 'text', value: props.attributes.experienceId, onChange: findExperiences, onBlur: updateExperience })
        )
      ),

      React.createElement('div', { class: 'components-placeholder__instructions' }, 'Choose the theme colour for your Booking Form' ),

      React.createElement('div', { class: 'components-placeholder__fieldset' },
        React.createElement('form', { style: { marginBottom: '12px' } },
          React.createElement('input', { class: 'components-placeholder__input', id: 'byk_content_theme', type: 'color', value: props.attributes.theme, onChange: updateColor })
        )
      )
    );
  },

  save: function (props) {
    return wp.element.createElement(
      'iframe',
      {
        scrolling: 'no',
        src: '//sdk.qa.beyonk.com/b/?event=' + props.attributes.experienceId + '&theme=' + props.attributes.theme.substr(1),
        style: { border: 0, overflow: 'hidden', width: '300px', height: '510px', backgroundColor: 'transparent' },
        title: 'Booking Form'
      }
    )
  }
})