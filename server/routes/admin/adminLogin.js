require('dotenv').config();

const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();

const adminKey = process.env.ADMINID;
const adminID = process.env.ADMINKEY;

router
    .route('/login')
    .post((req, res) => {
        try {
            if (req.body.adminId !== adminID || req.body.adminKey !== adminKey) {
                return res.status(400).json({ status: -1 });
            }
            const data = {
                id: adminID
            };
            const authtoken = jwt.sign(data, process.env.JWT_TOKEN);
            res.status(200).json({ status: 0, authtoken });

        } catch (error) {
            res.status(500).json({ status: -2 });
        }
    });

module.exports = router;
