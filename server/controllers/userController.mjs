import userService from '../services/userService.mjs';

const userController = {
    // Function to handle profile picture upload
    uploadProfilePicture: async (request, response) => {
        try {
            // Check if a file was uploaded
            if (!request.file) {
                return response.status(400).json({ message: 'No File Uploaded' });
            }           // Get the file path
            const filePath = request.file.path;
            userService.updateProfilePicture(request.userId, filePath);
            // Return the file path
            return response.status(200).json({ filePath });
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            return response.status(500).json({ message: error.message });
        }
    },
    search: async (request, response) => {
        try {
            // Get the search query
            const { query } = request.body;
            console.log("this is the query", query);
            const results = await userService.search(query);
            console.log("this is the result", results);
            return response.status(200).json({ results });
        } catch (error) {
            console.error('Error searching:', error);
            return response.status(500).json({ message: error.message });
        }
    },
    updateBio: async (request, response) => {
        try {
            // Get the bio from the request body
            const { bio } = request.body;
            console.log("this is the bio", bio);
            // Update the user's bio
            await userService.updateBio(request.userId, bio);
            return response.status(200).json({ message: 'Bio updated successfully' });
        } catch (error) {
            console.error('Error updating bio:', error);
            return response.status(500).json({ message: error.message });
        }
    },
    getUserById: async (request, response) => {
        try {
            const { userId } = request.params;
            const user = await userService.getUserById(userId);
            return response.status(200).json(user);
        } catch (error) {
            console.error('Error getting user by id:', error);
            return response.status(500).json({ message: error.message });
        }
    }

}

export default userController;