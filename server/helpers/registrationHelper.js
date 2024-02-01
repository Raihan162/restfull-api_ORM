const db = require('../../models/index')

const getRegistration = async () => {

    try {
        const response = await db.registrations.findAll({
            include: [
                { model: db.students, },
                { model: db.courses }
            ]
        });

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const addRegistration = async (students_id, courses_id) => {
    try {
        const checkStudent = await db.students.findOne({
            where: {
                id: students_id
            }
        });

        if (!checkStudent) {
            throw new Error('Student doesn`t exist')
        }

        const checkCourse = await db.courses.findOne({
            where: {
                id: courses_id
            }
        });

        if (!checkCourse) {
            throw new Error('Course doesn`t exist');
        };

        const response = await db.registrations.create({
            students_id: students_id,
            courses_id: courses_id
        })

        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
};

const deleteRegistration = async (id) => {
    try {
        const checkRegistration = await db.registrations.findOne({
            where: {
                id: id
            }
        });

        if (!checkRegistration) {
            throw new Error('Registration doesn`t exist');
        }

        await db.registrations.destroy({
            where: {
                id: id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    }
};

const updateRegistration = async (id, students_id, courses_id) => {
    try {
        const checkRegistration = await db.registrations.findOne({
            where: {
                id: id
            }
        });

        if (!checkRegistration) {
            throw new Error('Registration ID doesn`t exist');
        }

        const checkStudent = await db.students.findOne({
            where: {
                id: students_id
            }
        });

        if (students_id) {
            if (!checkStudent) {
                throw new Error('Student doesn`t exist')
            };
        };

        const checkCourse = await db.courses.findOne({
            where: {
                id: courses_id
            }
        });

        if (courses_id) {
            if (!checkCourse) {
                throw new Error('Course doesn`t exist');
            };
        };

        await db.registrations.update({
            students_id: students_id ? students_id : checkStudent?.dataValues.id,
            courses_id: courses_id ? courses_id : checkCourse?.dataValues.id
        }, {
            where: {
                id: id
            }
        });

        return Promise.resolve([]);
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getRegistration,
    addRegistration,
    deleteRegistration,
    updateRegistration
};