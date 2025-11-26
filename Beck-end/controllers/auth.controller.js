const UsuarioModel = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});

const AuthController = {
  
  register: async (req, res) => {
    try {
      const { nome, email, senha, cnpj, cpf, tipo_usuario_id } = req.body;

      if (!nome || !email || !senha || !tipo_usuario_id) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
      }

      const existingUser = await UsuarioModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Este email já está cadastrado.' });
      }

      const newUser = await UsuarioModel.create({ nome, email, senha, cnpj, cpf, tipo_usuario_id });

      res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: newUser });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor ao tentar registrar.', error: error.message });
    }
  },
  
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const user = await UsuarioModel.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Email ou senha inválidos.' }); 
      }

      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      if (user.status_bloqueio) {
          return res.status(403).json({ 
              message: 'Usuário bloqueado.', 
              data_fim_bloqueio: user.data_fim_bloqueio 
          });
      }

      const payload = {
        id: user.id,
        nome: user.nome,
        tipo: user.tipo_usuario_id
      };
      
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '8h' } 
      );

      res.status(200).json({
        message: 'Login bem-sucedido!',
        token: token,
        usuario: payload
      });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor ao tentar logar.', error: error.message });
    }
  },

  esqueciSenha: async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UsuarioModel.findByEmail(email);
        if (!user) return res.status(404).json({ message: "Email não encontrado." });

        const secret = process.env.JWT_SECRET + user.senha;
        const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '15m' });

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const link = `${frontendUrl}/redefinir-senha/${user.id}/${token}`;

        const mailOptions = {
            from: 'agendamentonaf@gmail.com',
            to: email,
            subject: 'Redefinição de Senha - NAF',
            text: `Olá ${user.nome},\n\nClique no link para redefinir sua senha: ${link}\n\nLink válido por 15 minutos.`
        };

        try {
            if(process.env.EMAIL_USER) {
                await transporter.sendMail(mailOptions);
                console.log("Email enviado para " + email);
            } else {
                throw new Error("Sem credenciais de email");
            }
        } catch (mailError) {
            console.log("\n=== LINK DE RECUPERAÇÃO (Modo Debug) ===");
            console.log(link);
            console.log("========================================\n");
        }

        res.status(200).json({ message: "Se o e-mail existir, um link foi enviado." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao processar solicitação." });
    }
  },

  redefinirSenha: async (req, res) => {
    const { id, token, novaSenha } = req.body;
    try {
        const user = await UsuarioModel.findById(id);
        if (!user) return res.status(404).json({ message: "Usuário inválido." });

        const secret = process.env.JWT_SECRET + user.senha;
        
        try {
             jwt.verify(token, secret);
        } catch (err) {
             return res.status(400).json({ message: "Link inválido ou expirado." });
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);
        await UsuarioModel.atualizarSenha(id, senhaHash);

        res.status(200).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao redefinir senha." });
    }
  }
};

module.exports = AuthController;