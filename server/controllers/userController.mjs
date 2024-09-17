
const userController = {

    // Function to handle profile picture upload
    uploadProfilePicture: async (request, response) => {
        try {
            // Check if a file was uploaded
            if (!request.file) {
                return response.status(400).json({ message: 'No File Uploaded' });
            }
            console.log("This is the whole file", request.file);

            // Get the file path
            const filePath = request.file.path;
            console.log("this is the file path",filePath);

            console.log("this is the file name" , request.file.filename)

            // Return the file path
            return response.status(200).json({ filePath });
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            return response.status(500).json({ message: error.message });
        }
    }
}

export default userController;