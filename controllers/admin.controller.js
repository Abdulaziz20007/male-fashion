const { errorHandler } = require("../helpers/error_handler");
const admin = require("../schema/admin");
const jwtService = require("../services/jwt_service");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body);
        if (error) {
            return errorHandler(error, res);
        }

        const oldAdmin = await admin.findOne({ email: value.email });
        if (oldAdmin) {
            return res.status(400).send("BU email orqali admin ro'yxatdan o'tgan akamuloo");
        }

        const hashedPassword = await bcrypt.hash(value.password, 8);

        const Admin = await admin.create({
            ...value,
            password: hashedPassword
        });

        const payload = {
            username: value.username,
            email: value.email,
            is_creator: Admin.is_creator, // admin.is_creator to'g'rilandi.
        };

        const token = jwtService.generateTokens(payload);

        res.status(201).send({
            message: 'admin muvaffaqiyatli ro‘yxatdan o‘tdi',
            Admin,
            access_token: token.accessToken
        });

    } catch (error) {
        errorHandler(error, res);
    }
};

const getAdmin = async (req, res) => {
    try {
        const admins = await admin.find();

        if (!admins || admins.length === 0) { // length tekshiruvi qo'shildi.
            return res.status(404).send("Adminlar topilmadi");
        }

        res.status(200).send(admins);
    } catch (error) {
        errorHandler(error, res);
    }
};

const getAdminById = async (req, res) => {
    try {
        const idadmin = req.params.id;
        const Admin = await admin.findById(idadmin);

        if (!Admin) {
            return res.status(404).send("bunday idli Admin topilmadi");
        }
        res.status(200).send(Admin);
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

        const updatedAdmin = await admin.findByIdAndUpdate(
            req.params.id,
            { ...value, password: hashedPassword },
            { new: true } // Yangilangan hujjatni qaytarish uchun.
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
        const Admin = await admin.findById(req.params.id);

        if (!Admin) {
            return res.status(404).send({ message: 'Admin not found' });
        }

        await Admin.deleteOne();

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

        const Admin = await admin.findOne({ email }); // To'g'rilangan qidiruv parametri.

        if (!Admin) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPassword = bcrypt.compareSync(password, Admin.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const payload = {
            id: Admin._id,
            email: Admin.email,
            is_creator: Admin.is_creator,
            role: "admin"
        };

        const tokens = jwtService.generateTokens(payload);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie muddati aniq belgilandi.
        });

        await admin.findByIdAndUpdate(Admin._id, { refresh_token: tokens.refreshToken }); // refresh_token yangilandi.

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
            return res.status(404).send({ message: "Token topilmadi" });
        }

        const Admin = await admin.findOne({ refresh_token: refreshToken });

        if (!Admin) {
            return res.status(404).send({ message: "Admin topilmadi" });
        }

        res.clearCookie("refreshToken");

        await admin.findByIdAndUpdate(Admin._id, { refresh_token: null }); // refresh_token tozalandi.

        res.status(200).send({ message: "Logout muvaffaqiyatli bajarildi" });

    } catch (error) {
        errorHandler(error, res);
    }
};

const refreshAdminToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(404).send({ message: "Token topilmadi" });
        }

        let tokenPayload;
        try {
            tokenPayload = jwtService.verifyRefreshToken(refreshToken); // refreshToken tekshiriladi.
        } catch (error) {
            return res.status(403).send({ message: "Token yaroqsiz" });
        }

        const Admin = await admin.findOne({ refresh_token: refreshToken });

        if (!Admin) {
            return res.status(404).send({ message: "Admin topilmadi" });
        }

        const payload = {
            id: Admin._id,
            email: Admin.email,
            is_creator: Admin.is_creator
        };

        const tokens = jwtService.generateTokens(payload);

        await admin.findByIdAndUpdate(Admin._id, { refresh_token: tokens.refreshToken });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).send({
            message: "Yangi token yaratildi",
            access_token: tokens.accessToken
        });

    } catch (error) {
        errorHandler(error, res);
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
