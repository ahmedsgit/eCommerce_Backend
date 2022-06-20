export function registerController(req, res) {
  const {name,email,password} = req.body
  res.json({
    success: true,
    name,email,password

  });
}
