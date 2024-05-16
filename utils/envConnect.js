import dotenv from "dotenv";
const envConnect = () => {
  dotenv.config({
    path: `.env.${
      process.env.NODE_ENV === "production" ? "production" : "development"
    }`,
  });
};
export default envConnect;
