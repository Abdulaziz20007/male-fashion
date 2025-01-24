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
=======
const { errorHandler } = require("../helpers/error_handler.js");
const Admin = require("../schemas/admin_schema");
const { adminValidation } = require("../validations/admin_validation");
const bcrypt = require("bcrypt");
const adminJwt = require("../services/jwt_service");
const { to } = require("../helpers/to_promise.js");
const config = require("config");

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const oldAdmin = await Admin.findOne({
      admin_email: value.admin_email,
    });
    if (oldAdmin) {
      return res.status(400).send({ message: "This admin already exists" });
    }

    const hashedPassword = bcrypt.hashSync(value.admin_password, 7);

    const newAdmin = await Admin.create({
      ...value,
      admin_password: hashedPassword,
    });
    res.status(201).send({ message: "New admin added", newAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin = await Admin.findOne({ admin_email });
    if (!admin) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      id: admin._id,
      email: admin.admin_email,
      admin_username: admin.admin_username,
      admin_is_creator: admin.admin_is_creator,
    };

    const tokens = adminJwt.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("admin_refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      admin_id: admin._id,
      admin_accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { admin_refreshToken } = req.cookies;
    if (!admin_refreshToken) {
      return res.status(400).send({ message: "token topilmadi" });
    }
    const admin = await Admin.findOneAndUpdate(
      { refresh_token: admin_refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({ message: "Bunday tokenli admin yo'q" });
    }
    res.clearCookie("admin_refreshToken");
    res.send({ admin_refreshToken: admin.refresh_token });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { admin_refreshToken } = req.cookies;
    if (!admin_refreshToken) {
      return res.status(400).send({ message: "token topilmadi" });
    }
    const [error, tokenFromCookie] = await to(
      adminJwt.verifyRefreshToken(admin_refreshToken)
    );
    if (error) {
      return res.status(401).send({ error: error.message });
    }
    const admin = await Admin.findOne({ refresh_token: admin_refreshToken });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    const payload = {
      id: admin._id,
      email: admin.admin_email,
      admin_username: admin.admin_username,
      admin_is_creator: admin.admin_is_creator,
    };

    const tokens = adminJwt.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("admin_refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      admin_accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    const admin = await req.body.admin;
    res.send({
      admins,
      admin,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminsByNameQuery = async (req, res) => {
  try {
    const searchQuery = req.query;
    const admins = await Admin.find({
      admin_name: new RegExp(searchQuery.name, "i"),
    }).populate("parent_admin_id", "-_id");
    res.send({ admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "ID noto'g'ri" });
    }
    const admin = await Admin.deleteOne({ _id: id });
    res.send(admin);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      admin_name,
      admin_email,
      admin_surename,
      admin_password,
      admin_username,
      admin_is_creator,
    } = req.body;
    const newAdmin = await Admin.updateOne(
      { _id: id },
      {
        $set: {
          admin_name,
          admin_email,
          admin_surename,
          admin_password,
          admin_username,
          admin_is_creator,
        },
      }
    );
    res.send({ message: "Admin updated successfully", newAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "ID noto'g'ri" });
    }
    const admin = await Admin.findOne({ _id: id });
    if (!admin) {
      return res.status(400).send({ message: "Bunday admin mavjud emas" });
    }
    res.send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const ban_user = async (req, res) => {
  try {
    const { user_id, email, reason, admin_id } = req.body;
    const newBan = await Blacklist.create({
      user_id,
      email,
      reason,
      admin_id,
    });
    res.status(201).send({ message: "User banned", newBan });
  } catch (error) {
    errorHandler(error, res);
  }
}

module.exports = {
  addAdmin,
  getAdmins,
  deleteAdminById,
  updateAdminById,
  getAdminById,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  ban_user,
};
