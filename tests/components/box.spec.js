import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import RowLabel from '../../src/components/RowLabel'

describe('<RowLabel/>', () => {
  it('should have an h4 tag', () => {
    const wrapper = shallow(
      <RowLabel
        labelClass={'labelClass'}
        labelTitle={'labelTitle'}
      />
    )
    expect(wrapper.find('h4')).to.have.length(1)
  })

  it('should have props for labelClass and labelTitle', () => {
    const wrapper = shallow(
      <RowLabel
        labelClass={'labelClass'}
        labelTitle={'labelTitle'}
      />
    )
    expect(wrapper.props().labelClass).to.be.defined
    expect(wrapper.props().labelTitle).to.be.defined
  })
})
