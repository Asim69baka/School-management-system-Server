const Teacher = require('../../../models/Info_Teacher');
const Students = require('../../../models/Info_Student');



const deleteInfoTeachers = async (req, res) => {
    try {
        const infoId = req.params.id;
        // Find the information by ID and delete it
        const deletedInfo = await Teacher.findByIdAndDelete(infoId);
        if (!deletedInfo) {
            // If the information was not found, return a 404 status code
            return res.status(404).json({ message: 'Information not found' });
        }
        // Return a success message if the deletion was successful
        res.status(200).json({ message: 'Information deleted successfully' });
    } catch (error) {
        console.error('Error deleting information:', error);
        // If an error occurs, return a 500 status code and an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteInfoStudents = async (req, res) => {
    try {
        const infoId = req.params.id;
        // Find the information by ID and delete it
        const deletedInfo = await Students.findByIdAndDelete(infoId);
        if (!deletedInfo) {
            // If the information was not found, return a 404 status code
            return res.status(404).json({ message: 'Information not found' });
        }
        // Return a success message if the deletion was successful
        res.status(200).json({ message: 'Information deleted successfully' });
    } catch (error) {
        console.error('Error deleting information:', error);
        // If an error occurs, return a 500 status code and an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    deleteInfoTeachers,
    deleteInfoStudents
};
