import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const __dirname = path.resolve();
const dbFile = path.join(__dirname, "server", "db.json");
const router = jsonServer.router(dbFile);
server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rota para cadastrar um novo armazém
server.post("/armazens", (req, res) => {
  const { nome, animal, situacao } = req.body;
  if (!nome || !animal) {
    res.status(400).json({ message: "Nome e animal são obrigatórios." });
  } else {
    const armazens = server.db.get("armazens");
    const id = armazens.size().value() + 1;
    const novoArmazem = { id, nome, animal, situacao: situacao || false };
    armazens.push(novoArmazem).write();
    res.status(201).json(novoArmazem);
  }
});

// Rota para buscar a lista de armazéns cadastrados
server.get("/armazens", (req, res) => {
  const armazens = server.db.get("armazens").value();
  res.json(armazens);
});

server.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (email === "" || senha === "") {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
  }
  const user = server.db.get("usuarios").find({ email, senha }).value();
  console.log(user);
  if (user) {
    server.db.get("login").push({ email, senha }).write();
    res.json([{ email: user.email, name: user.nome }]);
  } else {
    res.status(400).json({ message: "Credencias inválidas" });
  }
});

server.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  if (nome === "" || email === "" || senha === "") {
    res.status(400).json({ message: "Nome, email, e senha são obrigatórios" });
    return;
  }
  const usuarios = server.db.get("usuarios").value();
  const novoUsuario = {
    id: usuarios && usuarios.length ? usuarios.length + 1 : 1,
    nome,
    email,
    senha,
  };
  server.db.get("usuarios").push(novoUsuario).write();
  res.json([novoUsuario]);
});


server.use("/usuarios", (req, res, next) => {
  if (req.method === "GET") {
    const usuarios = server.db.get("usuarios").value();
    const usuariosSemSenha = usuarios.map((usuario) => {
      delete usuario.senha;
      return usuario;
    });
    res.json(usuariosSemSenha);
  } else {
    next();
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server está rodando");
});