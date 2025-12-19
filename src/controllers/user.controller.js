import userService from "../services/user.service.js";

// Registra um novo usuário
export const registerController = async (req, res) => {
  try {
    const user = await userService.register(req.body);

    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Autentica o usuário e gera token JWT
export const loginController = async (req, res) => {
  try {
    const token = await userService.login(req.body);

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Retorna dados do usuário autenticado
export const profileController = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const user = await userService.profile(userId);

    return res.status(200).json({
      message: "Perfil do usuário recuperado com sucesso!",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
