const Envs = {
  MONGODB_URI: process.env.MONGODB_URI,
  ENV: process.env.ENV,
  DB_WALLET: process.env.DB_WALLET,
} as const;

export default Envs;
