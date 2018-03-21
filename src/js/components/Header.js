import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

	render() {
		const { client, users } = this.props;
		return (
			<div className="header">
				<div className="header-users">
					<div>Currently online:</div>
					{
						users.map((user,index)=>{
							return (
								<div className="header-users__item" key={index}>
									{ user.name }
								</div>
							)
						})
					}
				</div>
				<div>
					Logged in as { client.user.name }
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    client: state.client
  }
}

export default connect(mapStateToProps)(Header);