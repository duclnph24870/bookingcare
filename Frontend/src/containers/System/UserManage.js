import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import './UserManage.scss';
import { connect } from 'react-redux';
import { getUser } from '../../services/useService.js'
import { toast } from 'react-toastify';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try {
            let users = await getUser('all');
            if (users.data.user.length > 0 && users.data.status != 0) {
                this.setState({
                    users: users.data.user,
                });
            }
        } catch (error) {
            toast.error('Lỗi server');
        }

    }

    render() {
        return (
            <div className="user-container">
                <div className='title text-center mb-2'>Table all users</div>

                <table className="table table-dark table-striped user-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                        {this.state.users.length > 0 && this.state.users.map(user => {
                            return <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <button className='button'>Delete</button>
                                            <button className='button'>Edit</button>
                                        </td>
                                    </tr>
                        })}
                </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
