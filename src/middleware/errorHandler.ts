import {RESPONSE_STATUS} from '../constants';

export const errorHandler = (req: any, res: any) => {
  const {url, method} = req;

  res.status(RESPONSE_STATUS.NOT_FOUND);
  res.json(`${RESPONSE_STATUS.NOT_FOUND} | Cannot ${method} ${url}`);
};
