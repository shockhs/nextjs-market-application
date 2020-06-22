import { connect } from "react-redux";
import AddForm from '../../components/Products/AddForm/AddForm';


export default connect((state) => state.auth)(function ({ authToken }) {
    return (
        <AddForm authToken={authToken} />
    )
})

