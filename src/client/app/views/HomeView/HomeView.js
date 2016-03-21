/* @flow */
import React from 'react'
import {jobs_data} from '../../data/jobs'
import {talent_data} from '../../data/talent'
import {real_estate_data} from '../../data/real-estate'
import {Box} from '../../components/Box'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

var talentData = talent_data
var jobsData = jobs_data
var realEstateData = real_estate_data

export default class HomeView extends React.Component {

  render () {
    var talentBoxes = talentData.data.map((item) => {
      return (
        <Box boxType={'talent'}
          headline={item.title}
          content={item.value}
          footer={item.trend_label}
        />
      )
    })

    var jobsBoxes = jobsData.data.map((item) => {
      return (
        <Box boxType={'jobs'}
          headline={item.title}
          content={item.value}
          footer={item.trend_label}
        />
      )
    })

    var realEstateBoxes = realEstateData.data.map((item) => {
      return (
        <Box boxType={'real_estate'}
          headline={item.title}
          content={item.value}
          footer={item.trend_label}
        />
      )
    })
    return (
      <div>
        <div className={"row-fluid"}>
          <div className={'talent dashboard-label'}>
            / TALENT
          </div>
          <div>
            {talentBoxes}
          </div>
        </div>
        <div className={"source"}>
          {talentData.source}
        </div>
        <div className={"row-fluid"}>
          <div className={'jobs dashboard-label'}>
            / JOBS
          </div>
          <div>
            {jobsBoxes}
          </div>
        </div>
        <div className={"source"}>
          {jobsData.source}
        </div>
        <div className={"row-fluid"}>
          <div className={'real_estate dashboard-label'}>
            / REAL ESTATE
          </div>
          <div>
            {realEstateBoxes}
          </div>
        </div>
        <div className={"source"}>
          {realEstateData.source}
        </div>
      </div>
    )
  }
}

// // We avoid using the `@connect` decorator on the class definition so
// // that we can export the undecorated component for testing.
// // See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
// export class HomeView extends React.Component<void, Props, void> {
//   static propTypes = {
//     counter: PropTypes.number.isRequired,
//     doubleAsync: PropTypes.func.isRequired,
//     increment: PropTypes.func.isRequired
//   };
//
//   render () {
//     console.log('Duck Image = ' + DuckImage)
//     return (
//       <div className='container text-center'>
//         <div className='row'>
//           <div className='col-xs-2 col-xs-offset-5'>
//             <img className={classes.duck}
//               src={DuckImage}
//               alt='This is a duck, because Redux.' />
//           </div>
//         </div>
//         <h1>Welcome to the Economic Dashboard</h1>
//         <h2>
//           Sample Counter:
//           {' '}
//           <span className={classes['counter--green']}>{this.props.counter}</span>
//         </h2>
//         <button className='btn btn-default' onClick={this.props.increment}>
//           Increment
//         </button>
//         {' '}
//         <button className='btn btn-default' onClick={this.props.doubleAsync}>
//           Double (Async)
//         </button>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => ({
//   counter: state.counter
// })
// export default connect((mapStateToProps), {
//   increment: () => increment(1),
//   doubleAsync
// })(HomeView)
