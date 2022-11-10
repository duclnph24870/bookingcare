import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import './UserManage.scss';
import { connect } from 'react-redux';
import { getUser, handleAddNewUser, handleDeleteUser, handleEditUser } from '../../services/useService.js'
import { toast } from 'react-toastify';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modal: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        // load ra user lần đầu truy cập 
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
    
    handleSubmitUser = (data,formEl) => {
        const submitBtn = formEl.querySelector('button[type="submit"]');

        // trường hợp sửa
        if (submitBtn.getAttribute('name')) {
            let _id = submitBtn.getAttribute('name');
            data._id = _id;
            handleEditUser(data)
                .then(async res => {
                    let dataRes = res.data;
                    if (dataRes.status == 0) {
                        toast.error(dataRes.message);
                    }else if (dataRes.status == 1) {
                        toast.success(dataRes.message);
                        // reset form
                        formEl.reset();
                        // tắt modal
                        this.setState({
                            modal: false,
                        });

                        // render lại list user 
                        let users = await getUser('all');
                        if (users.data.user.length > 0 && users.data.status != 0) {
                            this.setState({
                                users: users.data.user,
                            });
                        }
                    }
                })
                .catch(err => {
                    toast.error('Lỗi server');
                })
        }else {
            // trường hợp thêm
            handleAddNewUser(data)
                .then(async res => {
                    let dataRes = res.data;
                    if (dataRes.status == 0) {
                        toast.error(dataRes.message);
                    }else if (dataRes.status == 1) {
                        toast.success(dataRes.message);
                        // reset form
                        formEl.reset();
                        // tắt modal
                        this.setState({
                            modal: false,
                        });
    
                        // render lại list user 
                        let users = await getUser('all');
                        if (users.data.user.length > 0 && users.data.status != 0) {
                            this.setState({
                                users: users.data.user,
                            });
                        }
                    }
                })
                .catch(err => {
                    toast.error('Lỗi server');
                })
        }
    }

    clickDeleteUser = (_id) => {
        handleDeleteUser(_id)
            .then( async ({data}) => {
                if (data.status == 1) {
                    toast.success(data.message);

                    // render lại list user 
                    let users = await getUser('all');
                    if (users.data.user.length > 0 && users.data.status != 0) {
                        this.setState({
                            users: users.data.user,
                        });
                    }
                }else if (data.status == 0) {
                    toast.warn(data.message);
                }
            })  
            .catch(e => {
                toast.error('Lỗi server');
            })
    }

    handleClickEditBtn = async (_id) => {
        try {
            let { data } = await getUser(_id);
            if (data.status == 1) {
                // Bật modal lên và truyền user vào state
                this.setState({
                    modal: true,
                    userEdit: data.user[0],
                });

            }else if (data.status == 0) {
                toast.error(data.message);
            }   
        } catch (error) {
            toast.error('Lỗi server');
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            userEdit: {},
        });
    }

    render() {
        return (
            <div className="user-container mx-3">
                <ModalUser 
                    modal={this.state.modal} 
                    handleSubmitUser={this.handleSubmitUser} 
                    toggle={this.toggle}
                    userEdit={this.state.userEdit}
                />

                <div className='title text-center mb-2'>Table all users</div>

                <div className="my-3">
                    <button 
                        className="btn btn-primary addNewUserBtn px-3"
                        onClick={e => this.toggle()}
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal" 
                        data-bs-whatever="@mdo"
                    >
                        Add new user 
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

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
                                        <button className='button' onClick={e => this.clickDeleteUser(user._id)}>Delete</button>
                                        <button className='button' onClick={e => this.handleClickEditBtn(user._id)}>Edit</button>
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
