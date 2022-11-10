import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLogin } from '../../services/useService';
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hiddenPass: true,
        }
    }

    // xử lý submit
    handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await handleLogin(this.state.email,this.state.password);
            let data = res.data;
            if (data.status == 1) {
                toast.success('Đăng nhập thành công!');
                this.props.userLoginSuccess(data.token);
            }else if (data.status == 0) {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error('Lỗi server vui lòng thử lại');
        }
    }

    // xử lý ẩn hiện mật khẩu
    handleHiddenPass = e => {
        this.setState({
            hiddenPass: !this.state.hiddenPass,
        });
    }

    render() {

        return (
            <div className="login-back">
                <div className='login-container'>
                    <form onSubmit={e => this.handlerSubmit(e)} className='login-content row py-5 px-4'>
                        <h1 className='col-12 text-center'>Login</h1>
                        <div className='form-group my-1 col-12'>
                            <label>Email</label>
                            <input
                                type={'text'} 
                                placeholder="Enter your email" 
                                className='form-control'
                                value={this.state.email}
                                onChange={e => this.setState({
                                    email: e.target.value,
                                })}
                             />
                        </div>

                        <div className='form-group my-1 col-12'>
                            <label>Password</label>
                            <input 
                                type={this.state.hiddenPass ? 'password' : 'text'} 
                                placeholder="Enter your password" 
                                className='form-control'
                                value={this.state.password}
                                onChange={e => this.setState({
                                    password: e.target.value,
                                })}
                            />
                            <div className='hidden-pass-icon' onClick={e => this.handleHiddenPass(e)}>
                                {this.state.hiddenPass ?
                                    <i className="fas fa-eye-slash"></i>
                                    :
                                    <i className="fas fa-eye"></i>
                                 }
                            </div>
                        </div>
                        <div className='col-12 my-3'>
                            <button type='submit' className='loginSubmit py-2'>Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12  text-center'>
                            <span className=''>Or login with: </span>
                        </div>
                        <div className='col-6 socialLogin ggLogin'>
                            <button>
                                <i className="fab fa-google-plus-g"></i>
                            </button>
                        </div>
                        <div className='col-6 socialLogin faLogin'>
                            <button>
                                <i className="fab fa-facebook-f"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
