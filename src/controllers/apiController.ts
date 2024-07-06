import axios from "axios";
import { Request, Response } from "express";
import { transformData } from "../utils/transformData";

const apiFiles = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(process.env.URL_TO_FETCH as string);
    const transformedData = transformData(response.data);

    res.locals.cache.set("fileData", transformedData);
    res.json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export { apiFiles };
