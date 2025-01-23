const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../schema/admin");
const jwtService = require("../services/jwt_service");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require('bcrypt');
const config = require("config")

const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body);
        if (error) {
            return errorHandler(error, res);
        }

        const oldAdmin = await Admin.findOne({ email: value.email });
        if (oldAdmin) {
            return res.status(400).send("BU email orqali admin ro'yxatdan o'tgan akamuloo");
        }

        const hashedPassword = await bcrypt.hash(value.password, 8);

        const admin = await Admin.create({
            ...value,
            password: hashedPassword
        });

        const payload = {
            username: value.username,
            email: value.email,
            is_creator: admin.is_creator, 
                };

        const token = jwtService.generateTokens(payload);

        res.status(201).send({
            message: 'admin muvaffaqiyatli ro‘yxatdan o‘tdi',
            admin,
            access_token: token.accessToken
        });

    } catch (error) {
        errorHandler(error, res);
    }
};

const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();

        if (!admins) {
            return res.status(404).send("Adminlar topilmadi");
        }

        res.status(200).send(admins);
    } catch (error) {
        errorHandler(error, res);
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            return res.status(404).send("bunday idli Admin topilmadi");
        }
        res.status(200).send(admin);
    } catch (error) {
        errorHandler(error, res);
    }
};

const updateAdminById = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body);
        if (error) {
            return errorHandler(error, res);
        }

        const hashedPassword = await bcrypt.hash(value.password, 8);

        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            { ...value, password: hashedPassword }
        );

        if (!updatedAdmin) {
            return res.status(404).send({ message: 'Admin not found' });
        }

        res.status(200).send({
            message: "Admin ma'lumotlari yangilandi",
            updatedAdmin
        });

    } catch (error) {
        errorHandler(error, res);
    }
};

const deleteAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            return res.status(404).send({ message: 'Admin not found' });
        }

        await admin.deleteOne();

        res.status(204).send({
            message: "Admin deleted"
        });

    } catch (error) {
        errorHandler(error, res);
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email }); 

        if (!admin) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPassword = bcrypt.compareSync(password, admin.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const payload = {
            username: admin.username,
            email: admin.email,
            is_creator: admin.is_creator,
        };

        const tokens = jwtService.generateTokens(payload);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge:  7 * 24 * 60 * 60 * 1000
        });

        admin.refresh_token = tokens.refreshToken  
        await admin.save()

        res.status(200).send({
            message: "Hush kelibsiz ....",
            ...tokens
        });

    } catch (error) {
        errorHandler(error, res);
    }
};

const logoutAdmin = async (req, res) => {
    try {
        
        const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).send({ message: "Token topilmadi!" });
    }

    const admin = await Admin.findOne({ refresh_token: refreshToken });

    if (!admin) {
      return res.status(404).send({ message: "Bunday token admin topilmadi!" });
    }

    res.clearCookie("refreshToken");
    res.status(200).send({ message: "Admin tizimdan chiqdi" });

    } catch (error) {
        errorHandler(error, res);
    }
};

const refreshAdminToken = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
  
      if (!refreshToken) {
        return res.status(404).send({ message: "AdminToken not found token" })
      }
  
      try {
        const tokenFromCookie = await jwtService.verifyRefreshToken(refreshToken)
        console.log(tokenFromCookie);
  
      } catch (error) {
        return errorHandler(error, res)
      }
  
      const admin = await Admin.findOne({ refresh_token: refreshToken })
  
      if (!admin) {
        return res.status(404).send({ message: "Admin not found" })
      }
  
      const payload = {
        username: admin.username,
        email: admin.email,
        is_creator: admin.is_creator,
      };
  
      const tokens = jwtService.generateTokens(payload);
      console.log(tokens);
  
  
      res.cookie("refreshToken", tokens.refreshToken, {
        hhtpOnly: true,
        maxAge:  7 * 24 * 60 * 60 * 1000
      });
  
      res.status(200).send({
        message: "Hush kelibsz",
        refreshToken: admin.refreshToken,
        access_token: tokens.accessToken
      });
  
    } catch (error) {
      errorHandler(error, res)
    }
  };

module.exports = {
    addAdmin,
    getAdmin,
    getAdminById,
    updateAdminById,
    deleteAdminById,
    loginAdmin,
    logoutAdmin,
    refreshAdminToken
};
