/**
 * Toast组件
 */
import ToastBase from './ToastBase';

export default {
  /**
   * 成功提示
   */
  success(content = '成功', duration, opt) {
    return ToastBase.notice(content, {
      type: 'success',
      duration,
      ...opt,
    });
  },
  /**
   * loading
   */
  loading(content = '请稍后', duration = 60, opt) {
    return ToastBase.notice(content, {
      type: 'loading',
      duration,
      modal: true,
      ...opt,
    });
  },
  /**
   * 失败错误等提示
   */
  fail(content = '失败', duration, opt) {
    return ToastBase.notice(content, {
      type: 'fail',
      duration,
      ...opt,
    });
  },
  /**
   * show
   */
  show(content, duration = 1.5, opt = {}) {
    return ToastBase.notice(content, {
      duration,
      ...opt,
    });
  },

  /**
   * hide
   */
  hide: ToastBase.hide,
};
