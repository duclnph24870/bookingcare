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
    handleLogin
};