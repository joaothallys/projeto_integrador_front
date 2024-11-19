import Mock from "./mock";

import "./db/auth";
import "./db/ecommerce";
import "./db/notification";
import "./db/user";


Mock.onAny().passThrough();
