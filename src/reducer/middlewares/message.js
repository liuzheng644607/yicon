import process from 'process';
import Message from '../../components/common/Message/Message';

export default () => next => action => {
  if (process.browser) {
    if (action.error) {
      Message.error('服务器错误');
    } else if (action.payload && action.payload.res === false) {
      const hasChinese = /[\u4E00-\u9FFF]+/g.test(action.payload.message);
      const message = hasChinese ? action.payload.message : '服务器错误';
      Message.error(message);
    }
    return next(action);
  }
  return next(action);
};
