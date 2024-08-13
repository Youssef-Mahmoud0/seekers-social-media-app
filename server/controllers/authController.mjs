import AuthService  from '../services/authService.mjs'

const authController = {
    signup: async (request, response) => {
        const user = {
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            bio: request.body.bio || ""
        }

        try{
            await AuthService.signup(user);
            return response.status(201).json({ message: 'User created successfully.' });
        } catch (error) {
            console.error('Error signing up:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    login: async(request, response) => {
        try{ 
            const { usernameOrEmail, password } = request.body;
            const token = await AuthService.login(usernameOrEmail, password);
            return response.status(200).json({ message: 'User logged in successfully. This Is His Current Token: ' , token });
        } catch (error) {
            console.error('Error logging in:', error);
            return response.status(400).json({ message: error.message });
        }   
        
    },

    logout: async(request, response) => {
        try{
            const token = request.token;
            const userId = request.userId;
            console.log("this is the token", token, userId)
            await AuthService.logout(userId, token);
            return response.status(200).json({ message: 'User logged out successfully.' });
        }catch (error) {
            console.error('Error logging out:', error);
            return response.status(400).json({ message: error.message });
        }
    }
}
export default authController;
 