import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../actions/login";
import Login from "../components/Login";

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      onLogin: login
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Login)
