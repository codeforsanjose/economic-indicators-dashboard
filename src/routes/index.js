import React from 'react'
import { Route } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import Dashboard from '../containers/Dashboard'

export default (store) => (
  <Route path='/' component={Dashboard} />
)
