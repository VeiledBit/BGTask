import { DataItem, TransformedData } from "../interfaces/interfaces";
const { parse } = require("url");

const transformData = (data: { items: DataItem[] }) => {
  const result: TransformedData = {};

  data.items.forEach((url) => {
    let parsedUrl;
    if (process.env.USE_PARSE === "true") {
      parsedUrl = parse(url.fileUrl);
    } else {
      parsedUrl = new URL(url.fileUrl);
    }
    const ip = parsedUrl.hostname;
    const isDirectory = parsedUrl.pathname.endsWith("/");
    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

    if (!result[ip]) {
      result[ip] = [];
    }

    let currentLevel: any = result[ip];

    pathParts.forEach((part: string, index: number) => {
      if (index === pathParts.length - 1) {
        if (isDirectory) {
          const existingDir = { [part]: [] };
          currentLevel.push(existingDir);
        } else {
          if (
            typeof currentLevel === "object" &&
            !Array.isArray(currentLevel)
          ) {
            if (!currentLevel[pathParts[index - 1]]) {
              currentLevel[pathParts[index - 1]] = [];
            }
            currentLevel[pathParts[index - 1]].push(part);
          } else {
            currentLevel.push(part);
          }
        }
      } else {
        let existingDir = currentLevel.find(
          (item: any) => typeof item === "object" && item.hasOwnProperty(part)
        );
        if (!existingDir) {
          existingDir = { [part]: [] };
          currentLevel.push(existingDir);
        }
        currentLevel = existingDir[part];
      }
    });
  });

  return result;
};

export { transformData };
