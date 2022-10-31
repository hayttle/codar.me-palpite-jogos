import {app} from "./setup.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});