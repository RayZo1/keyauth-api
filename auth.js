import { login, register, validate, init } from '../lib/authController';
import { apiKeyAuth } from '../lib/middlewares';

export default async function handler(req, res) {
  // Apply API key auth to all endpoints
  await apiKeyAuth(req, res);
  
  switch (req.method) {
    case 'POST':
      const { action } = req.query;
      
      switch (action) {
        case 'login':
          return await login(req, res);
        case 'register':
          return await register(req, res);
        case 'validate':
          return await validate(req, res);
        case 'init':
          return await init(req, res);
        default:
          res.status(404).json({ success: false, message: 'Endpoint not found' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
