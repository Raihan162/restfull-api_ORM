const db = require('../../models/index');

const getLecturerList = async () => {

    try {
        const response = await db.lecturers.findAll();

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const addLecturer = async (name, contact) => {
    try {
        const response = await db.lecturers.create({
            name: name,
            contact: contact
        });

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const updateLecturer = async (id, name, contact) => {
    try {
        const checkLecturer = await db.lecturers.findOne({
            where: {
                id: id
            }
        });

        if (!checkLecturer) {
            throw new Error('Lecturer doesn`t exist');
        };

        await db.lecturers.update({
            name: name ? name : checkLecturer?.dataValues?.name,
            contact: contact ? contact : checkLecturer?.dataValues?.contact
        }, {
            where: {
                id: id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

const deleteLecturer = async (id) => {
    try {
        const checkLecturer = await db.lecturers.findOne({
            where: {
                id: id
            }
        });

        if (!checkLecturer) {
            throw new Error('Lecturer doesn`t exist');
        };

        await db.lecturers.destroy({
            where: {
                id: id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getLecturerList,
    addLecturer,
    deleteLecturer,
    updateLecturer
};