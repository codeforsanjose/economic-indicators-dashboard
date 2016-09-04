import React, { PropTypes } from 'react'

import { renderFooterRight } from '../utilities/generalConfig'

class Footer extends React.Component {
  render () {
    var generalConfig = this.props.generalConfig

    return (
      <div key='footer'>
        <footer className='econ-footer'>
          <div className='container'>
            <span className='footer-subtext' id='footer-right-content'>{renderFooterRight(generalConfig)}</span>
          </div>
        </footer>
      </div>
    )
  }
}

Footer.propTypes = {
  generalConfig: PropTypes.object.isRequired
}

export default Footer
