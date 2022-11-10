import { createRef } from "react";
import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalUser extends Component {
    constructor (props) {
        super(props);
        this.formEl = createRef();
        this.idTimeOut = null;
    }

    handRenderEdit = (formEl) => {
        // gán các giá trị vào input tương ứng của nó
        if (formEl) {
            let userEdit = this.props.userEdit;
            let btnSubmit = formEl.querySelector('button[type="submit"]');
            let keysEdit = Object.keys(userEdit);
            keysEdit.forEach(item => {
                let el = formEl.querySelector('.modal-addUser-body').querySelector(`[name=${item}]`);
                if (el) {
                    el.value = userEdit[item];
                }
            })
        }
    }

    handleSubmitModal = e => {
        e.preventDefault();
        let dataFrom = new FormData(e.target);
        let data = Object.fromEntries(dataFrom);
        this.props.handleSubmitUser(data,e.target);
    }

    render () {
        let isUserEdit = Object.keys(this.props.userEdit).length > 0;
        if (isUserEdit) {
            this.idTimeOut = setTimeout(() => {
                this.handRenderEdit(this.formEl.current);
            },1000);
        }

        return (
            <Modal 
                isOpen={this.props.modal} 
                toggle={this.props.toggle}
                size="lg"
                innerRef={this.formEl}
                onClosed={() => {
                    clearTimeout(this.idTimeOut);
                }}
            >
                <form onSubmit={e => this.handleSubmitModal(e)}>
                    <ModalHeader toggle={this.props.toggle}>Add new user</ModalHeader>
                    <ModalBody className="modal-addUser-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Username: </label>
                                    <input required type="text" name="userName" placeholder="Enter username"/>
                                </div>

                                <div className="col-6 form-group">
                                    <label>Email: </label>
                                    <input required type="email" name="email" placeholder="Enter email"/>
                                </div>

                                <div className="col-6 form-group">
                                    <label>Password: </label>
                                    <input required type="password" name="password" placeholder="Enter password"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Role: </label>
                                    <input required type="number" name="role" placeholder="Enter role"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Age: </label>
                                    <input required type="number" name="age" placeholder="Enter age"/>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" name={isUserEdit ? this.props.userEdit._id : ''} className="px-3" color="primary">{isUserEdit ? 'Complete' : 'Add User'}</Button>{' '}
                        <Button className="px-3" color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}

export default ModalUser;