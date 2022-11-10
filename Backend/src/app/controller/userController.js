const UserModule = require('../modules/userModule.js');
const jwt = require('../../service/jwtActions.js');

// [POST] /user
async function getUser (req,res,next) {
    let dataReturn = null;
    try {
        let id = req.body.id; // all or id
        // check id có tồn tại không
        if (!id) {
            return res.json({
                status: 0,
                message: 'Server chưa nhận được id user cần tìm',
            });
        }   

        let user = null;
        if (id == 'all') {
            user = await UserModule.find({
                
            }).select(['-password']);
        }else {
            user = await UserModule.find({
                _id: id,
            }).select(['-password']);
        }

        dataReturn = {
            status: 1,
            user: user
        }

    } catch (error) {
        dataReturn = {
            status: 0,
            message: 'Không tìm thấy user',
        }    
    }

    return res.json(dataReturn);
}

// [POST] /user/create
async function createUser (req,res,next) {
    let dataUser = req.body;
    let dataReturn = null;
    // check xem email có tồn tại không 
    let checkEmail = await UserModule.findOne({
        email: dataUser.email,
    })

    if (checkEmail) {
        return res.json({
            status: 0,
            message: 'Email đã tồn tại trong hệ thống',
        });
    }

    // lưu tài khoản
    try {
        const user = new UserModule(dataUser);
        await user.save();

        dataReturn = {
            status: 1,
            message: 'Thêm user thành công',
        }
    } catch (error) {
        dataReturn = {
            status: 0,
            message: 'Lỗi server',
        }
    }
    return res.json(dataReturn);
}

// [PUT] /user/edit 
async function editUser (req,res,next) {
    let dataUser = req.body;
    let dataReturn = null;

    if (dataUser && dataUser._id) {
        try {
            await UserModule.updateOne({_id: dataUser._id},dataUser);
            dataReturn = {
                status: 1,
                message: 'Thông tin user đã được cập nhập',
            }
        } catch (error) {
            dataReturn = {
                status: 1,
                message: 'User không tồn tại trên hệ thống',
            }
        }
    }
    return res.json(dataReturn);
}

// [POST] /user/delete
async function deleteUser (req,res,next) {
    let _id = req.body._id;
    let dataReturn = null;

    try {
        if (_id) {
            await UserModule.deleteOne({ _id });
            dataReturn = {
                status: 1,
                message: 'Xóa user thành công',
            }
        }else {
            dataReturn = {
                status: 0,
                message: 'User không tồn tại',
            }
        }
    } catch (error) {
        dataReturn = {
            status: 0,
            message: 'User không tồn tại',
        }
    }

    return res.json(dataReturn);
}

// [POST] /auth/login
function handleLogin (req,res,next) {
    // lấy ra email và password
    let email = req.body.email;
    let password = req.body.password;

    UserModule.findOne({
        email,
        password,
    })
        .then(async (user) => {
            if (user) {
                // tạo token
                const token = await jwt.createJwt({ user:user._id });
                
                return res.json({
                    status: 1,
                    token,
                });
            }else {
                return res.json({
                    status: 0,
                    message: "Sai email hoặc mật khẩu",
                });
            }
        }) 
        .catch(err => {
            return res.json({
                status: 0,
                message: "Lỗi server xin vui lòng thử lại!",
            });
        })
}

module.exports = {
    getUser,
    createUser,
    editUser,
    deleteUser,
    handleLogin,
};