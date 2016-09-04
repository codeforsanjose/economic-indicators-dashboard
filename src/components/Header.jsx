import React, { PropTypes } from 'react'

import { renderTitleRight } from '../utilities/generalConfig'

const Header = (props) => {
  return (
    <div key='header'>
      <nav className='navbar econ-header'>
        <div className='container-fluid'>
          <span className='head-title'>
            <span className='sjeconomy'>
              SJECONOMY
            </span>
            &nbsp;INDICATORS
          </span>
          <span className='nav navbar-nav navbar-right head-title-right'>
            <span id='header-title-right-content'>
              {renderTitleRight(props.generalConfig)}
            </span>
          </span>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = {
  generalConfig: PropTypes.object
}

export default Header
