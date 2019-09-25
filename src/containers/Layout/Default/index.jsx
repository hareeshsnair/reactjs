import React, { Component } from 'react'
import { userActions } from '../../../store/actions'
import { connect } from 'react-redux'

class index extends Component {
    render() {
        return (
            <div>
                Layout
            </div>
        )
    }
}
export default connect()(index)