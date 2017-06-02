import { connect } from 'react-redux'
import { getList } from '../modules'

import Table from '../components'

const mapDispatchToProps = {
    search :()=>getList(1),
    init:()=>getList(2)
}

const mapStateToProps = (state) => ({
    list : state.table.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
