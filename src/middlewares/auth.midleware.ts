import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

const VerifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return
  }

  // const idToken = req.cookies?.access_token;
  // console.log({idToken});
  const idToken = authHeader.split('Bearer ')[1];
  console.log({idToken});
  
  if (!idToken) {
    res.status(403).json({ error: 'No token provided' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ error: 'Unauthorized' });
    return
  }
};

export default VerifyToken;
