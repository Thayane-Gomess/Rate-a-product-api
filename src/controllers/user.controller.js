// Controller de usuário (somente registro)
const UserService = require("../services/user.service.js");

module.exports = {
  // Registro
  async registerController(req, res) {
    try {
      // chama o service para criar o usuário
      const user = await UserService.register(req.body);

      return res.status(201).json({
        message: "Usuário registrado com sucesso!",
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Login
  async loginController(req, res) {
    try {
      // chama o service para autenticar o usuário
      const token = await UserService.login(req.body);

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Profile
  async profileController(req, res) {
    try {
      const user = await UserService.profile(req.user);

      return res.status(200).json({
        message: "Perfil do usuário recuperado com sucesso!",
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};